# REAL v1.0 — specification-only Go implementation

**Owner / originating author:** DOUGLAS W. T., JACKS0N

This directory contains a clean-room-style implementation attempt written from the normative REAL.v1.0 specification rather than by copying the JavaScript/Python reference compilers.

> Limitation: this implementation was produced inside the same project/workstream by an agent that had previously participated in the reference work. It is therefore **not independent external validation**. The code-development phase for this attempt deliberately avoided re-inspecting/copying the reference compiler and loaded the shared corpus only after the Go implementation was frozen.

## Process

```text
1. Fix normative source: Issue #4.
2. Write/freeze Go implementation before loading fixtures.
3. Load shared adversarial inputs.
4. Execute reference compiler without inspecting/copying its source during this phase.
5. Compare semantic outputs.
6. Treat disagreements as SPEC-AMBIGUITY unless the written spec clearly selects one behavior.
7. Repair specification first.
8. Re-run the same implementation/corpus.
```

## Initial result

```text
19 regression fixtures:
18 exact semantic matches
1 trace-detail wording difference only

640 combinatorial states:
528 exact matches
112 disagreements
```

All 112 full-space disagreements occurred only in `PUBLIC_ALLOCATION` or `SAFETY_LEGAL` states. They shared one ambiguity: Issue #4 said `AUTHORITY-BEFORE-OPTIMIZATION` but did not define whether failed public/safety governance prerequisites terminate before value, subgroup-harm, uncertainty, hypothesis, and probe modules.

## Specification repair

Issues #4 and #9 now define explicit precedence:

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

and:

```text
TERMINAL-GATE-SHORT-CIRCUIT:
P2 failure returns before H?/P?/V+/K?/A?/ADAPT?.

DOWNSTREAM-OMISSION ≠ RESOLUTION:
omitted downstream state means NOT-EVALUATED.
```

## Trace semantic repair

The regression corpus retained one literal wording difference under the same `SELECTIVE-LABEL-WATCH` trace rule. The specification now declares:

```text
TRACE.RULE-ID = normative semantic output.
TRACE.DETAIL = explanatory/non-normative unless explicitly canonicalized.
```

## Post-repair result

```text
19/19 regression cases → 0 canonical semantic mismatches
640/640 combinatorial states → 0 semantic mismatches
```

## Run

From the repository root:

```bash
python3 independent/compare.py
```

Expected:

```text
regression: cases=19 semantic_mismatches=0
combinatorial: cases=640 semantic_mismatches=0
```

## Files

- `types.go` — input/output contract.
- `compiler.go` — specification-only compiler logic.
- `main.go` — stdin/stdout JSON entrypoint.
- `compare.py` — semantic comparison against the reference corpus/runtime.

## Next genuine test

Issue #8 invites a **separately authored implementation from specification only** with no prior exposure to either reference compiler. Disagreements should again repair the specification first whenever two reasonable readings exist.
