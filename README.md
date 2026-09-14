# Wa-cha!^*+ Challenge #1 — REAL / RWAL

**Owner / originating author:** DOUGLAS W. T., JACKS0N

> Build the shortest evidence-, rights-, authority-, and uncertainty-valid path to a human decision—then expose enough trace to falsify it.

This repository converts the initiating narrative into a **public adversarial research challenge**. The model has been repeatedly attacked, broken, repaired, simplified, fuzzed, mutation-tested, cross-implemented, and specification-repaired rather than defended unchanged.

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
underspecified authority/gate precedence          = BROKEN + REPAIRED
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
TERMINAL-GATE-SHORT-CIRCUIT
DOWNSTREAM-OMISSION≠RESOLUTION
```

## Normative specification

Implementation-neutral semantics are now explicit in [`conformance/SPECIFICATION.md`](conformance/SPECIFICATION.md) and Issue #9.

```text
P0 INPUT-VALIDITY
P1 OBSERVE / CONTEXT
P2 HARD-AUTHORITY-GATES
P3 OPTION-BOUNDARIES / EVIDENCE-SUPPORT
P4 MATERIAL-VALUE/HARM ANALYSIS
P5 UNCERTAINTY / HYPOTHESIS / PROBE
P6 AUTHORITY-VALID SELECTION
P7 TRACE / MEASURE / SYSTEM-AUDIT
```

`trace.rule` identifiers are normative semantic output. Human-readable `trace.detail` prose is non-normative unless explicitly canonicalized.

## Reference conformance harness

The [`conformance/`](conformance/) directory contains JavaScript and Python references plus regression, property, mutation, and cross-language semantic tests.

```bash
node conformance/test.mjs
node conformance/fuzz.mjs
node conformance/mutation.mjs
python3 conformance/crosscheck.py
python3 conformance/crosscheck_fuzz.py
```

Current reference status:

```text
JavaScript: REAL.v1.0-ref.2
Python:     REAL.v1.0-py-ref.1

19/19 regression fixtures PASS
640/640 combinatorial property cases PASS
9/9 intentionally dangerous mutants KILLED
0 mutation survivors

JS ↔ Python:
19/19 regression cases agree
640/640 combinatorial states agree
0 semantic mismatches
```

## Specification-only Go implementation attack — Pass #14

A Go implementation was written/frozen from Issue #4 before loading the shared corpus and without re-inspecting/copying the reference compiler during that phase. Because the same project/agent had prior reference exposure, this is **clean-room-style specification replication, not independent external validation**.

Published under [`independent/`](independent/).

Initial comparison:

```text
19 regression cases:
18 exact semantic matches
1 trace-detail wording difference

640 combinatorial states:
528 exact matches
112 disagreements
```

All 112 full-space disagreements occurred only in `PUBLIC_ALLOCATION` or `SAFETY_LEGAL` branches. They exposed a missing normative rule: hard-governance gate precedence.

The specification was repaired first with explicit P0→P7 precedence and `TERMINAL-GATE-SHORT-CIRCUIT`; the Go implementation was then aligned to that repaired specification.

Post-repair canonical semantic comparison:

```text
19/19 regression cases → 0 mismatches
640/640 combinatorial states → 0 mismatches
```

This is the intended behavior:

```text
IMPLEMENTATION-DISAGREEMENT
→ SPEC-TEST
→ repair SPEC first when ambiguity is real
→ re-run implementations
```

Run:

```bash
python3 independent/compare.py
```

## Public challenge threads

1. [DISCUSSION](https://github.com/wabanglang/Wa-cha-challenge-1/issues/1)
2. [MODEL](https://github.com/wabanglang/Wa-cha-challenge-1/issues/2)
3. [EVIDENCE — adversarial Passes #1–#14](https://github.com/wabanglang/Wa-cha-challenge-1/issues/3)
4. [SOLUTION — REAL v1.0 + normative precedence](https://github.com/wabanglang/Wa-cha-challenge-1/issues/4)
5. [PILOT / CONFORMANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/5)
6. [METRICS](https://github.com/wabanglang/Wa-cha-challenge-1/issues/6)
7. [GOVERNANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/7)
8. [INDEPENDENT IMPLEMENTATION CHALLENGE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/8)
9. [NORMATIVE SPEC / SEMANTIC CONFORMANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/9)
10. [SPEC-ONLY GO RESULT](https://github.com/wabanglang/Wa-cha-challenge-1/issues/10)

## Current frontier

A **genuinely independent author/team** with no prior exposure to either reference implementation should implement from Issues #4/#9 or `conformance/SPECIFICATION.md` only, then run the shared semantic corpus. Any disagreement should again be treated first as possible specification ambiguity.

After independent replication, the frontier becomes external validity: whether real decision contexts can be represented without losing material information, creating unacceptable burden, or systematically distorting choices.

---

**Authorship / provenance:** DOUGLAS W. T., JACKS0N — originating owner; developed through human–AI collaboration using Wa!, RWAL, REAL, adversarial evidence repair, executable conformance, fuzzing, mutation testing, cross-language replication, and specification-only implementation attacks.