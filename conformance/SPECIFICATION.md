# REAL v1.0 — Normative Conformance Specification

**Owner / originating author:** DOUGLAS W. T., JACKS0N

This file defines implementation-neutral semantics for conformance work. It exists because a specification-only Go implementation exposed ambiguity that the reference implementations had previously hidden.

## Core contract

```text
REAL.v1.0 := COMPILE(Context)
             → MIN-VALID-PATH
             → ACT | OFFER | DEFER | NO-ACTION
             → MEASURE
             → TRACE/AUDIT
```

Core modules:

```text
O := OBSERVE decision-relevant state
B := BOUNDARIES{rights,safety,authority,evidence-support}
C := CHOOSE/OFFER/DEFER transparently
T := TRACE{reasons,uncertainty,version,outcome}
```

Optional modules:

```text
H? hypothesis set + UNKNOWN
P? probe/experiment
V+ expanded value vector
G+ nontrivial governance routing
K? mechanism model
A? persistence substrate
ADAPT? sequential treatment logic
```

## Normative precedence

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

### P2 hard-authority gates

```text
UNKNOWN_AUTHORITY + irreversible/high-stakes
→ DEFER{SAFE_BLOCK}

PUBLIC_ALLOCATION + authority-unconfirmed
→ DEFER{SAFE_BLOCK}

PUBLIC_ALLOCATION + no legitimate policy rule
→ DEFER{GOVERNANCE_REQUIRED}

PUBLIC_ALLOCATION + no explicit rule-produced selection
→ DEFER{POLICY_SELECTION_REQUIRED}

SAFETY_LEGAL + authority-unconfirmed
→ DEFER{SAFE_BLOCK}

SAFETY_LEGAL + no documented review or no explicit authorized selection
→ DEFER{SAFETY_LEGAL_REVIEW_REQUIRED}
```

### Terminal gate semantics

```text
TERMINAL-GATE-SHORT-CIRCUIT:
If P2 fails, return the corresponding blocker before activating
H?/P?/V+/K?/A?/ADAPT?.

DOWNSTREAM-OMISSION ≠ RESOLUTION:
A downstream state omitted because a terminal gate fired is NOT-EVALUATED,
not known-false and not known-resolved.
```

### P3 option/evidence boundaries

```text
remove prohibited/unacceptable options
NO acceptable option → NO-ACTION
STRONG_APPLICABLE + no acceptable supported option
→ DEFER{EVIDENCE_OPTION_MISMATCH}
```

### P4 value/harm

```text
activate V+ only when material tradeoff, ranking sensitivity,
or subgroup harm exists
```

### P5 uncertainty/probe

```text
uncertainty that can change action → H?
valid reversible uncertainty-reducing test → P?

UNKNOWN_AUTHORITY special case:
a separately permissible reversible/low-stakes probe may proceed only when
that probe itself does not require the unresolved authority;
otherwise → DEFER{AUTHORITY_UNRESOLVED}
```

### P6 authority-valid selection

```text
PUBLIC_ALLOCATION:
select only the explicit policy-produced option, and only if it survives P3

SAFETY_LEGAL:
select only the explicit reviewed/authorized option, and only if it survives P3

SELF/SHARED + multiple acceptable supported options:
OFFER; never invent participant preference

SELF/SHARED + one acceptable supported option:
ACT
```

## Canonical semantic output

Conformance comparisons treat these fields as normative:

```text
input_id
disposition
selection
modules
unknown
flags
trace.rule identifiers
invariants
```

### Trace semantics

```text
TRACE.RULE-ID = normative
TRACE.DETAIL  = explanatory / non-normative
                unless a future spec explicitly canonicalizes the text
```

Therefore two implementations with identical `trace.rule` IDs but different human-readable `trace.detail` wording remain semantically conformant.

## Disagreement law

```text
IMPLEMENTATION-DISAGREEMENT := SPEC-TEST

IF two reasonable implementations differ
AND the written specification does not uniquely decide the case
→ classify SPEC-AMBIGUITY
→ repair specification first
→ re-run implementations

IF specification uniquely determines behavior
AND one implementation diverges
→ classify IMPLEMENTATION-DEFECT
```

## Provenance of this clarification

The first same-project clean-room-style Go implementation was written from Issue #4 before loading the shared corpus.

Initial comparison:

```text
19 regression cases:
18 exact semantic matches
1 trace-detail wording difference

640 combinatorial states:
528 exact matches
112 disagreements
```

All 112 full-space disagreements occurred only in `PUBLIC_ALLOCATION` or `SAFETY_LEGAL` branches. Explicit P2 precedence reduced the 640-state disagreement count to **0**. Declaring trace rule IDs normative and trace detail prose non-normative reduced the canonical 19-case disagreement count to **0**.

This result demonstrates specification repair, not external validation.
