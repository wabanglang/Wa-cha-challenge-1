# Wa-cha!^*+ Challenge #1 — REAL / RWAL

**Owner / originating author:** DOUGLAS W. T., JACKS0N

> Build the shortest evidence-, rights-, authority-, and uncertainty-valid path to a human decision—then expose enough trace to falsify it.

This repository converts the initiating narrative into a **public adversarial research challenge**. The model has been repeatedly attacked, broken, repaired, and simplified rather than defended unchanged.

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

A deterministic, zero-dependency Node.js reference implementation is published in [`conformance/`](conformance/).

```bash
node conformance/test.mjs
node conformance/fuzz.mjs
node conformance/mutation.mjs
```

Current reference status:

```text
REAL.v1.0-ref.2
19/19 regression fixtures PASS
640/640 combinatorial property cases PASS
9/9 intentionally dangerous mutants KILLED
0 current invariant violations
0 mutation survivors
```

The initial executable version is preserved in the public evidence trail: `ref.1` passed its 10 hand-authored fixtures but failed 51 property checks; the failures were repaired and converted into regression tests. Passing this reference suite establishes **internal conformance only**—not clinical/legal validity, real-world effectiveness, fairness across actual populations, or production security.

## Public challenge threads

1. [DISCUSSION](https://github.com/wabanglang/Wa-cha-challenge-1/issues/1)
2. [MODEL](https://github.com/wabanglang/Wa-cha-challenge-1/issues/2)
3. [EVIDENCE — adversarial Passes #1–#12](https://github.com/wabanglang/Wa-cha-challenge-1/issues/3)
4. [SOLUTION — REAL v1.0](https://github.com/wabanglang/Wa-cha-challenge-1/issues/4)
5. [PILOT / CONFORMANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/5)
6. [METRICS](https://github.com/wabanglang/Wa-cha-challenge-1/issues/6)
7. [GOVERNANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/7)

## Current frontier

Independent replication and semantic/stateful adversarial testing. Internal tests can demonstrate that this implementation catches the failure modes encoded in its suite; they cannot demonstrate that the suite contains every important failure mode.

---

**Authorship / provenance:** DOUGLAS W. T., JACKS0N — originating owner; developed through human–AI collaboration using Wa!, RWAL, REAL, and adversarial evidence repair.