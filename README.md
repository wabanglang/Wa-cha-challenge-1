# Wa-cha!^*+ Challenge #1 — REAL / RWAL

**Owner / originating author:** DOUGLAS W. T., JACKS0N

> Build the shortest evidence-, rights-, authority-, and uncertainty-valid path to a human decision—then expose enough trace to falsify it.

This repository converts the initiating narrative into a **public adversarial research challenge**. The model has been repeatedly attacked, broken, repaired, simplified, fuzzed, mutation-tested, and cross-implemented rather than defended unchanged.

## `DEF:REAL.v1.0` — Minimum-Valid Decision Compiler

```text
REAL.v1.0 := COMPILE(Context)
             → MIN-VALID-PATH
             → ACT | OFFER | DEFER | NO-ACTION
             → MEASURE
             → TRACE/AUDIT
```

### Core

```text
CORE := {
  O := OBSERVE decision-relevant state,
  B := BOUNDARIES{rights,safety,authority,evidence-support},
  C := CHOOSE/OFFER/DEFER transparently,
  T := TRACE{reasons,uncertainty,version,outcome}
}
```

### Optional — only when marginally required

```text
OPTIONAL := {
  H? hypotheses + UNKNOWN,
  P? probe/experiment,
  V+ expanded value vector,
  G+ nontrivial governance routing,
  K? mechanism model,
  A? persistence substrate,
  ADAPT? sequential treatment logic
}
```

### System layer

```text
SYSTEM := {
  L* policy-aware learning,
  fairness/drift audit,
  external/prospective validation,
  governed version promotion
}
```

## What the attacks broke

```text
E+R universally additive                         = BROKEN
local durable institution→persistent gains       = BROKEN
intake assessment→causal bottleneck              = BROKEN
probe response→mechanism proof                   = BROKEN
mechanism certainty mandatory                    = BROKEN
one universal objective utility scalar           = BROKEN
model/top score→legitimate authority              = BROKEN
naive deploy→observe→retrain                      = BROKEN
mandatory maximal REAL pipeline                  = OVER-SPECIFIED
```

## What survives

```text
OBSERVE enough to decide
RESPECT rights/safety/authority boundaries
USE best applicable comparative evidence
EXPOSE uncertainty / preserve UNKNOWN
CHOOSE/OFFER/DEFER transparently
MEASURE outcomes when material
TRACE provenance + version
AUDIT policy-level learning for selection/fairness/drift
ADD complexity only when it changes decision quality/safety/auditability
```

## Mandatory laws

```text
OBSERVE-BEFORE-INFER
UNKNOWN-IS-VALID
NO-SCORE-TO-CAUSALITY
NO-SCORE-TO-ALLOCATION
HYPOTHESIS-NOT-DIAGNOSIS
RESPONSE-NOT-EFFECT
EFFECT-NOT-MECHANISM
HELPED-BY-NOT-CAUSED-BY-ABSENCE
COUNTERFACTUAL-REQUIRED
OUTCOME-FIRST
MECHANISM-NOT-MANDATORY
VECTOR-BEFORE-SCALAR
NO-HIDDEN-WEIGHTS
AUTHORITY-BEFORE-OPTIMIZATION
NO-AI-SOVEREIGNTY
SELECTIVE-LABEL-WATCH
NO-SELF-VALIDATION
NO-AUTO-RETRAIN-HIGH-STAKES
NO-STACK-PREMIUM
MINIMUM-SUFFICIENT-FIRST
REMOVE-NONVALUE
COMPLEXITY-MUST-EARN-KEEP
COMPILE-AWAY-NONVALUE
MINIMUM-VALID-PATH
```

## Executable conformance harness

The [`conformance/`](conformance/) directory now contains two separately implemented references plus regression, property, mutation, and semantic cross-language tests.

```bash
node conformance/test.mjs
node conformance/fuzz.mjs
node conformance/mutation.mjs
python3 conformance/crosscheck.py
python3 conformance/crosscheck_fuzz.py
```

Current status:

```text
JavaScript: REAL.v1.0-ref.2
Python:     REAL.v1.0-py-ref.1

19/19 regression fixtures PASS
640/640 combinatorial property cases PASS
9/9 intentionally dangerous mutants KILLED
0 current invariant violations
0 mutation survivors

JS ↔ Python regression comparison:
19/19 cases, 0 semantic mismatches

JS ↔ Python combinatorial comparison:
640/640 states, 0 semantic mismatches
```

The initial executable version remains preserved in the public evidence trail: `ref.1` passed 10 hand-authored fixtures but failed 51 combinatorial invariant checks. Those failures were repaired and converted into regression tests. Mutation testing then exposed additional test-suite gaps before reaching 9/9 killed mutants.

The Python reference was implemented separately from the JavaScript runtime and agrees on the defined semantic outputs across the current regression and 640-state combinatorial corpus. This is **cross-language replication within the same project**, not independent external validation.

Passing these suites establishes **internal/reference conformance only**—not clinical/legal validity, real-world effectiveness, fairness across actual populations, external validity, or production security.

## Public challenge threads

1. [DISCUSSION](https://github.com/wabanglang/Wa-cha-challenge-1/issues/1)
2. [MODEL](https://github.com/wabanglang/Wa-cha-challenge-1/issues/2)
3. [EVIDENCE — adversarial Passes #1–#13](https://github.com/wabanglang/Wa-cha-challenge-1/issues/3)
4. [SOLUTION — REAL v1.0](https://github.com/wabanglang/Wa-cha-challenge-1/issues/4)
5. [PILOT / CONFORMANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/5)
6. [METRICS](https://github.com/wabanglang/Wa-cha-challenge-1/issues/6)
7. [GOVERNANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/7)

## Current frontier

**Independent implementation from specification only.** A separate author/team should implement REAL.v1.0 without inspecting either reference compiler, run the shared semantic corpus, and treat disagreements as specification ambiguity or missing invariants—not merely implementation bugs.

After that, the frontier becomes external validity: whether real decision contexts can be represented without losing critical information or imposing unacceptable data/assessment burden.

---

**Authorship / provenance:** DOUGLAS W. T., JACKS0N — originating owner; developed through human–AI collaboration using Wa!, RWAL, REAL, adversarial evidence repair, executable conformance, fuzzing, mutation testing, and cross-language replication.