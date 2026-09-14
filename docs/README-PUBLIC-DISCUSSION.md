# REAL / RWAL — Public Discussion Specification

**Owner / originating author:** DOUGLAS W. T., JACKS0N

## Core model — `REAL.v0.4`

```text
REAL.v0.4 := O → H? → P → Δ → M → L

O := OBSERVE measurable/reported constraints, assets, preferences, risks
H? := HYPOTHESIZE candidate bottleneck(s) + confidence + alternatives + UNKNOWN
P := PROBE with smallest safe/reversible mechanism-matched intervention
Δ := MEASURE preregistered response + burden + harm + cost + persistence signal
M := KEEP | STOP | SWITCH | AUGMENT | DE-ESCALATE
L := LEARN/update hypothesis + decision rule
```

Optional modules remain `R?{RECONNECT}`, `E?{ENABLE}`, `A?{ANCHOR}`.

## Evidence repairs

```text
C6(original) E+R→agency/stability = BROKEN / OVERBROAD
C7(original) durable local institution→persistent gains = BROKEN / OVERCLAIMED
D0(original) intake assessment→active causal bottleneck = BROKEN / OVERCLAIMED

D1 structured need detection = FEASIBLE / TOOL-DEPENDENT
D2 causal dominance from intake = NOT ESTABLISHED
D3 inferential inter-rater agreement = VARIABLE
D4 structured rules improve consistency = CONTEXT-DEPENDENT
D5 response-based adaptive testing = SUPPORTED METHODOLOGY
```

## Bottleneck hypothesis schema

```text
{
 observable evidence,
 candidate mechanism,
 competing explanations,
 confidence,
 UNKNOWN,
 minimal probe,
 target outcome,
 response threshold,
 stop/harm rule,
 revision rule
}
```

## Invariants

```text
OBSERVE-BEFORE-INFER
UNKNOWN-IS-VALID
NO-SCORE-TO-CAUSALITY
NO-SCORE-TO-ALLOCATION
HYPOTHESIS-NOT-DIAGNOSIS
PROBE-MINIMUM
PREDECLARE-DECISION-RULE
NO-POSTHOC-RESCUE
NO-CHAIN-INFERENCE
NO-STACK-PREMIUM
MINIMUM-SUFFICIENT-FIRST
MARGINAL-COMPONENT-TEST
REMOVE-NONVALUE
ANCHOR-NOT-IDOL
NO-OUTCOME-SUBSTITUTION
```

## Current falsification frontier

`P := PROBE`: determine whether intervention response supports mechanism inference, or whether regression to the mean, spontaneous change, placebo/context effects, delayed effects, fidelity problems, and interactions make response a poor causal diagnostic.

The issue set remains the executable research surface: Discussion → Model → Evidence → Solution → Pilot → Metrics → Governance.