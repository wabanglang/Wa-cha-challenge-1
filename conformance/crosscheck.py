import json, subprocess, tempfile, os, sys
from real_compiler import compile_real

BASE=os.path.dirname(__file__)
fixtures=json.load(open(os.path.join(BASE,'fixtures.json')))
inputs=[f['input'] for f in fixtures]

node_script=r'''
import fs from 'node:fs';
import {compile} from './real-compiler.mjs';
const inputs=JSON.parse(fs.readFileSync(0,'utf8'));
process.stdout.write(JSON.stringify(inputs.map(compile)));
'''
proc=subprocess.run(['node','--input-type=module','-e',node_script], input=json.dumps(inputs), text=True, capture_output=True, cwd=BASE, check=True)
js=json.loads(proc.stdout)
py=[compile_real(x) for x in inputs]

# Versions/reason prose may differ only if the normative behavior differs. Compare semantic outputs + exact trace rules/details.
fields=['input_id','disposition','selection','modules','unknown','flags','trace','invariants']
errors=[]
for i,(a,b) in enumerate(zip(js,py)):
    diffs={k:(a.get(k),b.get(k)) for k in fields if a.get(k)!=b.get(k)}
    if diffs: errors.append((inputs[i]['id'],diffs))

print(f'cross_language_cases={len(inputs)} semantic_mismatches={len(errors)}')
for ident,d in errors:
    print('MISMATCH',ident,json.dumps(d,indent=2))
if errors: sys.exit(1)