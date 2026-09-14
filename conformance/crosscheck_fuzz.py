import json, subprocess, os, itertools, sys
from real_compiler import compile_real
BASE=os.path.dirname(__file__)
authorities=['SELF','SHARED','PUBLIC_ALLOCATION','SAFETY_LEGAL','UNKNOWN_AUTHORITY']
evidences=['STRONG_APPLICABLE','MODERATE','UNCERTAIN','MISSING']
bools=[False,True]
inputs=[]; n=0
for authority,ev,policy,confirmed,ranking,harm,probe in itertools.product(authorities,evidences,bools,bools,bools,bools,bools):
    inputs.append({
      'id':f'xlang-{n}', 'authority':authority,'authority_confirmed':confirmed,'policy_rule_present':policy,
      'evidence':{'status':ev,'supported_options':['A','B']},
      'ranking_sensitive':ranking,'tradeoff_material':ranking,'subgroup_harm_material':harm,
      'probe_feasible':probe,'hypothesis_may_change_action':ev in {'UNCERTAIN','MISSING'},
      'options':[{'id':'A','supported':True,'reversible':True},{'id':'B','supported':True,'reversible':True}]
    }); n+=1
node_script=r'''import fs from 'node:fs'; import {compile} from './real-compiler.mjs'; const x=JSON.parse(fs.readFileSync(0,'utf8')); process.stdout.write(JSON.stringify(x.map(compile)));'''
proc=subprocess.run(['node','--input-type=module','-e',node_script],input=json.dumps(inputs),text=True,capture_output=True,cwd=BASE,check=True)
js=json.loads(proc.stdout); py=[compile_real(x) for x in inputs]
fields=['input_id','disposition','selection','modules','unknown','flags','trace','invariants']
errs=[]
for inp,a,b in zip(inputs,js,py):
    d={k:(a.get(k),b.get(k)) for k in fields if a.get(k)!=b.get(k)}
    if d: errs.append((inp['id'],d))
print(f'cross_language_property_cases={len(inputs)} semantic_mismatches={len(errs)}')
for e in errs[:10]: print('MISMATCH',e[0],json.dumps(e[1],indent=2))
if errs: sys.exit(1)