# [PILOT] Test REAL v0.3 — diagnose bottleneck → minimum-sufficient module → additive-value challenge

**Owner / originating author:** DOUGLAS W. T., JACKS0N

## Objective

Design the smallest ethical field test capable of falsifying REAL.v0.3, including whether modules selected from a diagnosed bottleneck add durable value beyond the strongest simpler intervention.

```text
D := diagnose active bottleneck
B := minimum-sufficient base intervention
X := candidate added module

COMPARE B vs B+X

ΔX := Outcome(B+X) − Outcome(B)
      − Cost(X) − Burden(X) − Harm(X)
```

Do not test the entire REAL stack against no service; that cannot identify marginal component value.

## Candidate design

```text
UNIT := bounded service catchment / eligible cohort
DURATION := 90-day active phase + persistence follow-up
COHORT := voluntary participants with explicit rules
DIAGNOSIS := preregistered bottleneck classification
BASE := strongest minimum intervention matched to bottleneck
ADD-ON := one R, E, or A module
OUTCOMES := target + cross-domain + burden + harm + cost + persistence
```

## Stage gates

```text
G0 problem/population validation
G1 diagnosis protocol frozen
G2 evidence + ethics review
G3 comparator + baseline defined
G4 limited launch
G5 early harm/burden/fidelity audit
G6 target-outcome analysis
G7 persistence follow-up
G8 KEEP-X | REMOVE-X | REPAIR-DIAGNOSIS | STOP | REPLICATE
```

## Decision rule

```text
KEEP X IFF:
  ΔX > predeclared meaningful threshold
  & benefit persists
  & no material subgroup harm/inequity
  & added burden/cost acceptable.

REMOVE X IFF:
  B+X ≈ B
  OR burden/cost erases benefit
  OR cross-domain harm appears.
```

## Diagnostic requirement

Independent evaluators applying the same bottleneck rules to the same case should reach materially similar classifications before intervention begins. If diagnosis is unstable, REAL.v0.3 fails upstream.

```text
ACTIVITY ≠ OUTCOME
MORE-SERVICES ≠ BETTER-SERVICE
INTEGRATED ≠ ADDITIVE
```

Evidence trail: Issue #3, Independent Evidence Pass #3.