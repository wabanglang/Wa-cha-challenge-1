# REAL v1.0 — External Specification-Only Implementation Challenge

**Owner / originating author:** DOUGLAS W. T., JACKS0N

This directory defines the protocol for a genuinely independent implementation of REAL.v1.0.

## Goal

```text
SPEC ONLY
→ independent implementation
→ implementation freeze
→ corpus reveal
→ semantic comparison
→ classify disagreement
→ repair SPEC first when ambiguity is real
```

## Contamination rule

The implementer should receive only the exported challenge kit, not this full repository.

Before freeze, the implementer MUST NOT inspect:

```text
conformance/real-compiler.mjs
conformance/real_compiler.py
independent/
conformance/fixtures.json
conformance/test.mjs
conformance/fuzz.mjs
conformance/mutation.mjs
conformance/crosscheck*.py
Issue #3 evidence-pass implementation details
Issue #10 implementation-result details
```

The implementation phase uses only:

- `SPECIFICATION.md` — normative semantics snapshot;
- `IMPLEMENTER-ATTESTATION.md` — disclosure/attestation form;
- `FREEZE-AND-REVEAL.md` — implementation-freeze and corpus-reveal protocol;
- `RESULT-SCHEMA.json` — canonical result format.

## Specification identity

Authoritative source at kit creation:

```text
repository: wabanglang/Wa-cha-challenge-1
source path: conformance/SPECIFICATION.md
Git blob SHA: f82440285d205f0958248f523c91269b58674102
creation commit: 9417ac8fec26ac70bc83117dd68f81ea72ab97a0
```

The exported `SPECIFICATION.md` must match that snapshot byte-for-byte unless a later challenge version explicitly supersedes it.

## Acceptance

An implementation counts as an independent replication attempt only if:

1. the implementer attests no inspection of prohibited reference materials before freeze;
2. implementation code is committed/frozen before the adversarial corpus is revealed;
3. the frozen implementation is run unchanged against the revealed corpus;
4. canonical semantic fields are compared exactly;
5. every disagreement is independently classified as `SPEC_AMBIGUITY`, `IMPLEMENTATION_DEFECT`, or `TEST_DEFECT`;
6. if the specification is ambiguous, the specification is repaired before implementations are tuned to match;
7. original frozen outputs remain preserved in the audit record.

## Canonical semantic fields

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

Human-readable `reason` and `trace.detail` prose are not canonical unless the specification explicitly says otherwise.

## Success levels

```text
L0 IMPLEMENTED
L1 FROZEN-BEFORE-REVEAL
L2 CORPUS-EXECUTED
L3 DISAGREEMENTS-CLASSIFIED
L4 SPEC-REPAIRED-IF-NEEDED
L5 ZERO-UNEXPLAINED-SEMANTIC-DIVERGENCE
L6 INDEPENDENTLY-REPEATED-BY-SECOND-IMPLEMENTER
```

No single successful implementation establishes external validity of REAL's use in actual social, clinical, legal, or allocation decisions.
