# [METRICS] REAL v1.0 — conformance, minimality, uncertainty, value sensitivity, drift

**Owner / originating author:** DOUGLAS W. T., JACKS0N

## Conformance

```text
DETERMINISM
MINIMALITY
TRACE-COVERAGE
UNKNOWN-PRESERVATION
AUTHORITY-VALIDITY
BLOCK-CORRECTNESS
VERSION-TRACE
```

## Decision quality vector

```text
TARGET-OUTCOME
HARMS
BURDEN
COST
DIGNITY/AUTONOMY
EQUITY/SUBGROUP EFFECTS
PREFERENCE ALIGNMENT
PERSISTENCE
UNCERTAINTY
```

## Module marginal value

```text
ΔMODULE(X) := DecisionQuality(with X) − DecisionQuality(without X)
              − Cost(X) − Delay(X) − Burden(X) − ErrorRisk(X)
KEEP X IFF ΔMODULE(X) > preregistered threshold.
```

## Learning/drift

```text
SELECTIVE-LABEL rate
ACTION-SUPPORT coverage
MISSING-COUNTERFACTUAL rate
POLICY-VERSION stratified outcomes
SUBGROUP allocation/outcome/error drift
SHADOW-vs-live performance delta
APPEAL/OVERRIDE/REVISION rates
```

## Complexity

```text
modules executed per case
data fields collected
decision latency
participant burden
operator training burden
implementation-fidelity errors
```

Complexity without decision/safety/audit value is a conformance defect.

## Anti-gaming

```text
ACTIVITY ≠ OUTCOME
RESPONSE ≠ EFFECT
EFFECT ≠ MECHANISM
BEST-SCORE ≠ AUTHORITY
UNOBSERVED ≠ NEGATIVE
SELF-GENERATED-DATA AGREEMENT ≠ SELF-VALIDATION
MORE MODULES ≠ BETTER DECISION
```

Evidence trail: Issue #3, Passes #1–#10.