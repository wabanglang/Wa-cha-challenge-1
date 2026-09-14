# [METRICS] REAL v0.4 — observation reliability, hypothesis uncertainty, probe effect, adaptive value

**Owner / originating author:** DOUGLAS W. T., JACKS0N

## Objective

Measure whether REAL.v0.4's observation→hypothesis→probe→adapt logic is reproducible and valid.

```text
O-QUALITY := completeness | missingness | observer agreement | self-report consistency
H-QUALITY := hypothesis agreement | confidence calibration | UNKNOWN rate | alternatives covered
P-QUALITY := fidelity | reversibility | exposure/dose | contamination | burden
Δ-QUALITY := target change | counterfactual quality | timing | persistence | harm | cost
M-QUALITY := decision-rule adherence | post-hoc deviation rate
L-QUALITY := future prediction improvement, not retrospective fit
```

## Separate fact from inference

```text
FACT-AGREEMENT := agreement on observed/reported inputs
HYPOTHESIS-AGREEMENT := agreement on candidate mechanisms
```

High fact agreement + low hypothesis agreement means the causal-classification layer is unstable.

## Uncertainty metrics

```text
UNKNOWN-RATE
FORCED-CLASSIFICATION-RATE
CONFIDENCE-CALIBRATION
TOP-1 vs TOP-k hypothesis performance
FALSE-POSITIVE module activation
FALSE-NEGATIVE missed constraint
HYPOTHESIS-REVISION rate after probe
```

## Probe metrics

```text
Δprobe_raw := Outcome_after − Outcome_before
Δprobe_causal := Outcome_with_probe − credible counterfactual
Δprobe_net := Δprobe_causal − Cost − Burden − Harm − InequityPenalty
```

A positive pre/post change is not automatically causal.

## Anti-rationalization laws

```text
POSTHOC-WATCH: new causal story only after outcome known → FLAG
FORCED-CERTAINTY-WATCH: UNKNOWN evidence but one confident bottleneck → FAIL
PROBE-CAUSALITY-WATCH: response to X treated as proof X was mechanism → FLAG
ASSESSOR-WATCH: different assessor→different allocation → reliability failure
FAIRNESS-WATCH: unexplained protected-group allocation disparity → investigate before deployment
```

KEEP/SWITCH/AUGMENT/STOP thresholds must be preregistered.

Evidence trail: Issue #3, Independent Evidence Pass #4.