import fs from 'node:fs';
import {compile} from './real-compiler.mjs';

const fixtures = JSON.parse(fs.readFileSync(new URL('./fixtures.json', import.meta.url),'utf8'));
let passed=0;
for (const fixture of fixtures) {
  const a=compile(fixture.input);
  const b=compile(JSON.parse(JSON.stringify(fixture.input)));
  const checks=[['deterministic',JSON.stringify(a)===JSON.stringify(b)]];
  const exp=fixture.expect||{};
  if(exp.disposition) checks.push(['disposition',a.disposition===exp.disposition]);
  if('selection' in exp) checks.push(['selection',JSON.stringify(a.selection)===JSON.stringify(exp.selection)]);
  for(const m of exp.modules_include||[]) checks.push([`module+${m}`,a.modules.includes(m)]);
  for(const m of exp.modules_exclude||[]) checks.push([`module-${m}`,!a.modules.includes(m)]);
  for(const f of exp.flags_include||[]) checks.push([`flag+${f}`,a.flags.includes(f)]);
  for(const u of exp.unknown_include||[]) checks.push([`unknown+${u}`,a.unknown.includes(u)]);
  const ok=checks.every(([,v])=>v);
  console.log(`${ok?'PASS':'FAIL'} ${fixture.input.id}`);
  if(!ok){
    for(const [name,v] of checks) if(!v) console.log(`  - ${name}`);
    console.log(JSON.stringify(a,null,2));
    process.exitCode=1;
  } else passed++;
}
console.log(`\n${passed}/${fixtures.length} fixtures passed`);