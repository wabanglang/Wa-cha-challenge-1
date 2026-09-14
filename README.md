# Wa-cha!^*+ Challenge #1 — REAL / RWAL

**Owner / originating author:** DOUGLAS W. T., JACKS0N

> Build the shortest evidence-, rights-, authority-, and uncertainty-valid path to a human decision—then expose enough trace to falsify it.

This repository converts the initiating narrative into a **public adversarial research challenge**. Ten independent evidence/red-team passes have progressively removed unsupported assumptions rather than defending the original formulation.

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
  H?     hypotheses + UNKNOWN,
  P?     probe/experiment,
  V+     expanded value vector,
  G+     nontrivial governance routing,
  K?     mechanism model,
  A?     persistence substrate,
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
```

Current reference result:

```text
10/10 adversarial fixtures PASS
```

The suite covers simple-option bypass, uncertainty/probing, preference, public allocation, unknown authority, selective labels, value-sensitive ranking, null add-ons, subgroup harm, and missing evidence. Passing these fixtures verifies conformance to this **reference contract only**; it does not establish clinical/legal validity or real-world effectiveness.

## Public challenge threads

1. [DISCUSSION](https://github.com/wabanglang/Wa-cha-challenge-1/issues/1)
2. [MODEL](https://github.com/wabanglang/Wa-cha-challenge-1/issues/2)
3. [EVIDENCE — adversarial Passes #1–#10](https://github.com/wabanglang/Wa-cha-challenge-1/issues/3)
4. [SOLUTION — REAL v1.0](https://github.com/wabanglang/Wa-cha-challenge-1/issues/4)
5. [PILOT / CONFORMANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/5)
6. [METRICS](https://github.com/wabanglang/Wa-cha-challenge-1/issues/6)
7. [GOVERNANCE](https://github.com/wabanglang/Wa-cha-challenge-1/issues/7)

## Next frontier

Property/fuzz testing: search mechanically for contradictory outputs, unreachable states, branch-order dependence, unsupported action leaks, and optional modules that fail the `COMPLEXITY-MUST-EARN-KEEP` invariant.

---

**Authorship / provenance:** DOUGLAS W. T., JACKS0N — originating owner; developed through human–AI collaboration using Wa!, RWAL, REAL, and adversarial evidence repair.