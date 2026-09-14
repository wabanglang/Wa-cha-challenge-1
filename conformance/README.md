# REAL v1.0 Reference Conformance Harness

**Owner / originating author:** DOUGLAS W. T., JACKS0N

Executable reference and cross-language semantic conformance suite for the public REAL/RWAL challenge.

## Run

```bash
node test.mjs
node fuzz.mjs
node mutation.mjs
python3 crosscheck.py
python3 crosscheck_fuzz.py
```

## Current result

```text
JavaScript reference: REAL.v1.0-ref.2
Python reference:     REAL.v1.0-py-ref.1

19/19 regression fixtures PASS
640/640 combinatorial property cases PASS
9/9 intentionally dangerous mutants KILLED
0 current invariant violations
0 mutation survivors

JS ↔ Python regression semantic comparison:
19/19 cases
0 semantic mismatches

JS ↔ Python combinatorial semantic comparison:
640/640 states
0 semantic mismatches
```

## Fuzz repair history

`REAL.v1.0-ref.1` initially passed 10/10 hand-authored fixtures but failed combinatorial testing:

```text
51 total violations / 640 cases
16 MULTI_OPTION_ARBITRARY_ACT
5  PUBLIC_ALLOCATION_ACT_WITHOUT_EXPLICIT_POLICY_SELECTION
10 SAFETY_LEGAL_ACT_WITHOUT_PROPORTIONALITY_REVIEW
20 UNKNOWN_AUTHORITY_ACT
```

`REAL.v1.0-ref.2` repaired those classes. Regression fixtures #11–#15 permanently encode the discovered failures.

## Mutation-test repair history

The first mutation pass killed only **5/9** injected bad behaviors. Four survived, exposing three genuine coverage gaps plus one redundantly protected public-selection invariant. Fixtures #16–#19 were added to test:

- strong evidence pointing only to an option that is prohibited/unavailable;
- a public policy selecting an option unsupported by evidence/acceptability constraints;
- a safety/legal authorized selection unsupported by evidence/acceptability constraints;
- a public rule existing without an explicit rule-produced selection.

The redundant public-selection mutant was replaced with a deliberate double-fault mutation that removes both independent guards.

Re-execution:

```text
KILLED M1 arbitrary multi-option selection
KILLED M2 public-selection double fault
KILLED M3 safety/legal review bypass
KILLED M4 unknown-authority guard removal
KILLED M5 missing-evidence bypass
KILLED M6 subgroup-harm block removal
KILLED M7 strong-evidence mismatch guard removal
KILLED M8 public-selection support guard removal
KILLED M9 safety-selection support guard removal

mutation_score = 9/9
```

## Cross-language replication

`real_compiler.py` is a separately implemented Python version of the normative REAL.v1.0 contract. It is cross-checked against the JavaScript reference using semantic outputs rather than compiler-version strings or explanatory prose.

Compared fields:

```text
input_id
disposition
selection
modules
unknown
flags
trace
invariants
```

Current cross-language result:

```text
19 normative regression inputs → 0 semantic mismatches
640 combinatorial states       → 0 semantic mismatches
```

This is **cross-language replication within the same project**, not independent external validation.

## Files

- `real-compiler.mjs` — JavaScript reference compiler (`REAL.v1.0-ref.2`).
- `real_compiler.py` — separately implemented Python reference (`REAL.v1.0-py-ref.1`).
- `fixtures.json` — 19 deterministic regression fixtures.
- `test.mjs` — regression runner.
- `fuzz.mjs` — 640-case combinatorial invariant fuzzer.
- `mutation.mjs` — mutation-test harness.
- `crosscheck.py` — JS↔Python semantic comparison across regression fixtures.
- `crosscheck_fuzz.py` — JS↔Python semantic comparison across 640 combinatorial states.

## Scope

This is a **reference conformance artifact**, not a clinical, legal, housing, benefits, or public-resource allocation system. Passing this suite does not establish real-world validity, fairness, lawful authority, external validity, production security, or causal correctness of supplied evidence.