import {compile} from './real-compiler.mjs';

const authorities=['SELF','SHARED','PUBLIC_ALLOCATION','SAFETY_LEGAL','UNKNOWN_AUTHORITY'];
const evidences=['STRONG_APPLICABLE','MODERATE','UNCERTAIN','MISSING'];
const bools=[false,true];
let n=0, failures=[]; const counts=new Map();

function addFailure(name,input,out){ counts.set(name,(counts.get(name)||0)+1); if(failures.length<40) failures.push({name,input,out}); }

for(const authority of authorities)
for(const ev of evidences)
for(const policy_rule_present of bools)
for(const authority_confirmed of bools)
for(const ranking_sensitive of bools)
for(const subgroup_harm_material of bools)
for(const probe_feasible of bools){
  const input={
    id:`fuzz-${n}`,
    authority, authority_confirmed, policy_rule_present,
    evidence:{status:ev,supported_options:['A','B']},
    ranking_sensitive, tradeoff_material:ranking_sensitive,
    subgroup_harm_material, probe_feasible,
    hypothesis_may_change_action: ev==='UNCERTAIN'||ev==='MISSING',
    options:[{id:'A',supported:true,reversible:true},{id:'B',supported:true,reversible:true}]
  };
  const out=compile(input); n++;
  const out2=compile(JSON.parse(JSON.stringify(input)));
  if(JSON.stringify(out)!==JSON.stringify(out2)) addFailure('NONDETERMINISM',input,out);
  if(authority==='PUBLIC_ALLOCATION' && out.disposition==='ACT')
    addFailure('PUBLIC_ALLOCATION_ACT_WITHOUT_EXPLICIT_POLICY_SELECTION',input,out);
  if(authority==='SAFETY_LEGAL' && out.disposition==='ACT')
    addFailure('SAFETY_LEGAL_ACT_WITHOUT_PROPORTIONALITY_REVIEW',input,out);
  if(authority==='UNKNOWN_AUTHORITY' && out.disposition==='ACT')
    addFailure('UNKNOWN_AUTHORITY_ACT',input,out);
  if((authority==='SELF'||authority==='SHARED') && ev==='STRONG_APPLICABLE' && !ranking_sensitive && !subgroup_harm_material && out.disposition==='ACT' && input.evidence.supported_options.length>1)
    addFailure('MULTI_OPTION_ARBITRARY_ACT',input,out);
  if(ev==='MISSING' && !probe_feasible && out.disposition!=='DEFER')
    addFailure('MISSING_EVIDENCE_NOT_DEFERRED',input,out);
  if(subgroup_harm_material && out.disposition==='ACT')
    addFailure('SUBGROUP_HARM_ACT',input,out);
  if(ranking_sensitive && out.disposition==='ACT')
    addFailure('VALUE_SENSITIVE_ACT',input,out);
}

const total=[...counts.values()].reduce((a,b)=>a+b,0);
console.log(`cases=${n} failures_total=${total}`);
console.log(Object.fromEntries([...counts.entries()].sort()));
for(const f of failures.slice(0,12)){
  console.log(`\nFAIL ${f.name}`);
  console.log(JSON.stringify({input:f.input,out:f.out},null,2));
}
if(total) process.exitCode=1;