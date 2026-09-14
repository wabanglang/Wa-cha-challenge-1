# REAL v1.0 Reference Conformance Harness

**Owner / originating author:** DOUGLAS W. T., JACKS0N

Deterministic, zero-dependency Node.js reference compiler for the public REAL/RWAL challenge.

## Run

```bash
node test.mjs
node fuzz.mjs
```

## Current result

```text
15/15 regression fixtures PASS
640/640 combinatorial property cases PASS
0 current invariant violations
```

## Fuzz repair history

`REAL.v1.0-ref.1` initially passed its 10 hand-authored fixtures but failed combinatorial testing:

```text
51 total violations / 640 cases
16 MULTI_OPTION_ARBITRARY_ACT
5  PUBLIC_ALLOCATION_ACT_WITHOUT_EXPLICIT_POLICY_SELECTION
10 SAFETY_LEGAL_ACT_WITHOUT_PROPORTIONALITY_REVIEW
20 UNKNOWN_AUTHORITY_ACT
```

`REAL.v1.0-ref.2` repairs those classes by requiring:

- SELF/SHARED multi-option cases → `OFFER`, never arbitrary first-option ACT;
- public allocation → explicit legitimate policy rule **and explicit policy-selected option**;
- safety/legal action → confirmed authority + documented review + explicit authorized selection;
- unresolved authority → no substantive ACT; only a valid reversible probe may precede resolution.

Five regression fixtures (#11–#15) permanently encode those failures.

## Files

- `real-compiler.mjs` — reference compiler (`REAL.v1.0-ref.2`).
- `fixtures.json` — 15 deterministic regression fixtures.
- `test.mjs` — regression runner.
- `fuzz.mjs` — 640-case combinatorial invariant fuzzer.

## Scope

This is a **reference conformance artifact**, not a clinical, legal, housing, benefits, or public-resource allocation system. Passing this suite does not establish real-world validity, fairness, lawful authority, or causal correctness of supplied evidence.