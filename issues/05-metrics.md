# [METRICS] REAL v0.3 — target outcome, marginal module value, burden, and persistence

**Owner / originating author:** DOUGLAS W. T., JACKS0N

## Objective

Measure whether each optional REAL module improves human outcomes **incrementally**, not whether a larger service package generates more activity.

## Metric families

```text
TARGET := outcome directly linked to diagnosed bottleneck
STABILITY := relevant continuity in housing/food/healthcare/docs/income
AGENCY := participant control + ability to navigate without unnecessary dependency
CONNECTION := trusted ties / reciprocal support / belonging when R is active
ECONOMIC := income / job or education persistence when relevant
SAFETY := adverse events / victimization / crisis use / participant-reported safety
FRICTION := time-to-help / duplicate forms / failed referrals / travel / wait
DIGNITY := respect / autonomy / stigma / procedural fairness
BURDEN := appointments + time + cognitive load + disclosure + travel + fatigue
COST := program + participant-borne cost
PERSISTENCE := outcome retained after active support window
```

## Core additive-value metric

```text
ΔX_raw := Outcome(BASE+X) − Outcome(BASE)

ΔX_net := ΔX_raw
          − normalized Cost(X)
          − ParticipantBurden(X)
          − HarmRisk(X)
          − InequityPenalty(X)
```

Normalization/weights must be preregistered before results are known.

## Required comparison

```text
BASE vs BASE+X
TARGET outcome
cross-domain outcomes
burden
cost
harms
subgroups
persistence
```

Without `BASE vs BASE+X`, marginal component value is unidentified.

## Diagnostic-quality metrics

```text
INTER-RATER agreement
TEST-RETEST stability
PREDICTIVE validity
FALSE-POSITIVE module activation
FALSE-NEGATIVE missed bottleneck
CLASSIFICATION burden/time
OUTCOME by diagnosis-module match
```

## Anti-gaming laws

```text
ACTIVITY-WATCH:
referrals↑ | visits↑ | case-notes↑
without target-outcome↑
→ NO SUCCESS CREDIT

GOODHART-WATCH:
metric↑ AND lived-outcome↔/↓
→ FLAG

STACK-WATCH:
components↑ AND Δnet↔/↓
→ REMOVE component(s)

PERSISTENCE-WATCH:
short-term gain↑ but follow-up returns to baseline
→ transient effect, NOT durable success
```

## Decision rule

```text
KEEP X IFF:
  ΔX_net > predeclared meaningful threshold
  & effect persists
  & no unacceptable subgroup harm
  & simpler/cheaper option is not equivalent.

REMOVE X OTHERWISE.
```

Evidence trail: Issue #3, Independent Evidence Pass #3.