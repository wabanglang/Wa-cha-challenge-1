#!/usr/bin/env python3
import itertools, json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = json.loads((ROOT / "conformance" / "fixtures.json").read_text())

NODE = r"""import fs from 'node:fs'; import {compile} from './conformance/real-compiler.mjs'; const x=JSON.parse(fs.readFileSync(0,'utf8')); process.stdout.write(JSON.stringify(x.map(compile)));"""
GO_FILES = [str(ROOT / "independent" / n) for n in ("types.go", "compiler.go", "main.go")]


def run_go(inputs):
    p = subprocess.run(["go", "run", *GO_FILES], input=json.dumps(inputs), text=True, capture_output=True, cwd=ROOT, check=True)
    return json.loads(p.stdout)


def run_js(inputs):
    p = subprocess.run(["node", "--input-type=module", "-e", NODE], input=json.dumps(inputs), text=True, capture_output=True, cwd=ROOT, check=True)
    return json.loads(p.stdout)


def semantic(o):
    # Normative per SPEC Issue #9: trace.rule IDs are semantic; trace.detail prose is not.
    return {
        "input_id": o.get("input_id"),
        "disposition": o.get("disposition"),
        "selection": o.get("selection"),
        "modules": o.get("modules"),
        "unknown": o.get("unknown"),
        "flags": o.get("flags"),
        "trace_rules": [t.get("rule") for t in o.get("trace", [])],
        "invariants": o.get("invariants"),
    }


def compare(inputs, label):
    a, b = run_go(inputs), run_js(inputs)
    mismatches = []
    for inp, x, y in zip(inputs, a, b):
        sx, sy = semantic(x), semantic(y)
        if sx != sy:
            mismatches.append({"id": inp["id"], "go": sx, "reference": sy})
    print(f"{label}: cases={len(inputs)} semantic_mismatches={len(mismatches)}")
    for m in mismatches[:10]:
        print(json.dumps(m, indent=2))
    return len(mismatches)


regression_inputs = [f["input"] for f in FIXTURES]
fail = compare(regression_inputs, "regression")

authorities = ["SELF", "SHARED", "PUBLIC_ALLOCATION", "SAFETY_LEGAL", "UNKNOWN_AUTHORITY"]
evidences = ["STRONG_APPLICABLE", "MODERATE", "UNCERTAIN", "MISSING"]
bools = [False, True]
product_inputs = []
for n, (authority, ev, policy, confirmed, ranking, harm, probe) in enumerate(itertools.product(authorities, evidences, bools, bools, bools, bools, bools)):
    product_inputs.append({
        "id": f"independent-{n}",
        "authority": authority,
        "authority_confirmed": confirmed,
        "policy_rule_present": policy,
        "evidence": {"status": ev, "supported_options": ["A", "B"]},
        "ranking_sensitive": ranking,
        "tradeoff_material": ranking,
        "subgroup_harm_material": harm,
        "probe_feasible": probe,
        "hypothesis_may_change_action": ev in {"UNCERTAIN", "MISSING"},
        "options": [
            {"id": "A", "supported": True, "reversible": True},
            {"id": "B", "supported": True, "reversible": True},
        ],
    })
fail += compare(product_inputs, "combinatorial")

sys.exit(1 if fail else 0)
