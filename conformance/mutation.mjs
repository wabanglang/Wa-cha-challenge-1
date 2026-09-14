import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const basePath=new URL('./real-compiler.mjs', import.meta.url);
const source=fs.readFileSync(basePath,'utf8');
const fixtures=JSON.parse(fs.readFileSync(new URL('./fixtures.json',import.meta.url),'utf8'));

const mutations=[
  ['M1_ARBITRARY_MULTI_OPTION', s=>s.replace("return finalize(x, modules, 'OFFER', candidates.map(o=>o.id).sort(), traces, flags, unknown,\n        'Offer all acceptable evidence-supported options; do not invent a participant preference.');","return finalize(x, modules, 'ACT', candidates[0].id, traces, flags, unknown, 'MUTANT arbitrary first option');")],
  ['M2_PUBLIC_SELECTION_DOUBLE_FAULT', s=>s.replace(/\n  if \(x\.authority === 'PUBLIC_ALLOCATION' && !x\.policy_selection\) \{[\s\S]*?\n  \}\n/,"\n  // MUTANT policy-selection presence guard removed\n").replace("const selected = candidates.find(o => o.id === x.policy_selection);","const selected = candidates.find(o => o.id === x.policy_selection) || candidates[0];")],
  ['M3_SAFETY_REVIEW_BYPASS', s=>s.replace("if (x.authority === 'SAFETY_LEGAL' && (!x.safety_legal_review_passed || !x.authorized_selection)) {","if (false) {").replace("const selected = candidates.find(o => o.id === x.authorized_selection);","const selected = candidates.find(o => o.id === x.authorized_selection) || candidates[0];")],
  ['M4_UNKNOWN_AUTHORITY_GUARD_REMOVED', s=>s.replace(/\n  if \(x\.authority === 'UNKNOWN_AUTHORITY'\) \{\n    flags\.push\('AUTHORITY_UNRESOLVED'\);[\s\S]*?\n  \}\n\n  \/\/ Mechanism\/persistence/,"\n  // MUTANT authority guard removed\n\n  // Mechanism/persistence")],
  ['M5_MISSING_EVIDENCE_BYPASS', s=>s.replace("if (x.evidence.status === 'MISSING') {","if (x.evidence.status === 'NEVER') {")],
  ['M6_SUBGROUP_HARM_BLOCK_REMOVED', s=>s.replace(/\n  \/\/ Material subgroup harm prevents silent aggregate optimization\.\n  if \(x\.subgroup_harm_material\) \{[\s\S]*?\n  \}\n/,"\n  // MUTANT subgroup harm block removed\n")],
  ['M7_EVIDENCE_MISMATCH_GUARD_REMOVED', s=>s.replace("if (!candidates.length && x.evidence.status === 'STRONG_APPLICABLE') {","if (false) {")],
  ['M8_PUBLIC_SELECTION_SUPPORT_GUARD_REMOVED', s=>s.replace("const selected = candidates.find(o => o.id === x.policy_selection);","const selected = candidates.find(o => o.id === x.policy_selection) || {id:x.policy_selection};")],
  ['M9_SAFETY_SELECTION_SUPPORT_GUARD_REMOVED', s=>s.replace("const selected = candidates.find(o => o.id === x.authorized_selection);","const selected = candidates.find(o => o.id === x.authorized_selection) || {id:x.authorized_selection};")]
];

function fixtureFailures(compile){
  let fails=0;
  for(const fixture of fixtures){
    const a=compile(fixture.input), exp=fixture.expect||{};
    const checks=[];
    if(exp.disposition) checks.push(a.disposition===exp.disposition);
    if('selection' in exp) checks.push(JSON.stringify(a.selection)===JSON.stringify(exp.selection));
    for(const m of exp.modules_include||[]) checks.push(a.modules.includes(m));
    for(const m of exp.modules_exclude||[]) checks.push(!a.modules.includes(m));
    for(const f of exp.flags_include||[]) checks.push(a.flags.includes(f));
    for(const u of exp.unknown_include||[]) checks.push(a.unknown.includes(u));
    if(checks.some(v=>!v)) fails++;
  }
  return fails;
}

function propertyFailures(compile){
  const authorities=['SELF','SHARED','PUBLIC_ALLOCATION','SAFETY_LEGAL','UNKNOWN_AUTHORITY'];
  const evidences=['STRONG_APPLICABLE','MODERATE','UNCERTAIN','MISSING'];
  const bools=[false,true]; let fails=0,n=0;
  for(const authority of authorities)
  for(const ev of evidences)
  for(const policy_rule_present of bools)
  for(const authority_confirmed of bools)
  for(const ranking_sensitive of bools)
  for(const subgroup_harm_material of bools)
  for(const probe_feasible of bools){
    const input={id:`mutfuzz-${n++}`,authority,authority_confirmed,policy_rule_present,
      evidence:{status:ev,supported_options:['A','B']},ranking_sensitive,tradeoff_material:ranking_sensitive,
      subgroup_harm_material,probe_feasible,hypothesis_may_change_action:ev==='UNCERTAIN'||ev==='MISSING',
      options:[{id:'A',supported:true,reversible:true},{id:'B',supported:true,reversible:true}]};
    const out=compile(input), out2=compile(JSON.parse(JSON.stringify(input)));
    if(JSON.stringify(out)!==JSON.stringify(out2)) fails++;
    if(authority==='PUBLIC_ALLOCATION' && out.disposition==='ACT') fails++;
    if(authority==='SAFETY_LEGAL' && out.disposition==='ACT') fails++;
    if(authority==='UNKNOWN_AUTHORITY' && out.disposition==='ACT') fails++;
    if((authority==='SELF'||authority==='SHARED') && ev==='STRONG_APPLICABLE' && !ranking_sensitive && !subgroup_harm_material && out.disposition==='ACT' && input.evidence.supported_options.length>1) fails++;
    if(ev==='MISSING'&&!probe_feasible&&out.disposition!=='DEFER') fails++;
    if(subgroup_harm_material&&out.disposition==='ACT') fails++;
    if(ranking_sensitive&&out.disposition==='ACT') fails++;
  }
  return fails;
}

let killed=0,survivors=[];
for(let i=0;i<mutations.length;i++){
  const [name,mutate]=mutations[i];
  const text=mutate(source);
  if(text===source){ console.log(`INVALID ${name} mutation did not alter source`); survivors.push(name); continue; }
  const p=path.join(path.dirname(new URL(basePath).pathname),`.mutant-${i}.mjs`);
  fs.writeFileSync(p,text);
  try{
    const {compile}=await import(pathToFileURL(p).href+`?v=${Date.now()}-${i}`);
    const f=fixtureFailures(compile), q=propertyFailures(compile);
    const isKilled=f+q>0;
    console.log(`${isKilled?'KILLED':'SURVIVED'} ${name} fixture_fail=${f} property_fail=${q}`);
    if(isKilled) killed++; else survivors.push(name);
  } finally { try{fs.unlinkSync(p)}catch{} }
}
console.log(`\nmutation_score=${killed}/${mutations.length} survivors=${JSON.stringify(survivors)}`);
if(survivors.length) process.exitCode=1;