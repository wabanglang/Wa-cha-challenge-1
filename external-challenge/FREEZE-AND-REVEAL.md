# Freeze-and-Reveal Protocol — REAL v1.0

## Phase A — implementation

Implementer receives only the spec-only challenge kit.

Before seeing the corpus:

```text
1. implement compiler
2. create local/unit tests from specification only
3. commit/freeze source
4. record commit hash
5. archive source
6. compute archive SHA-256
7. complete pre-freeze attestation
```

## Phase B — freeze verification

The evaluator records:

```text
implementer identity/handle
time of freeze
commit/hash
archive SHA-256
language/runtime
specification snapshot identity
```

No source changes are allowed after this point until first corpus outputs are preserved.

## Phase C — corpus reveal

After freeze, evaluator supplies the shared adversarial inputs.

The implementer runs the frozen implementation unchanged and returns one result object per input using `RESULT-SCHEMA.json`.

Reference outputs are NOT supplied before the implementer's first outputs are committed/preserved.

## Phase D — semantic comparison

Compare only canonical semantic fields:

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

Do not fail an implementation for differences only in:

```text
compiler_version
reason prose
trace.detail prose
serialization whitespace/key order
```

unless a later specification explicitly makes one of those normative.

## Phase E — disagreement classification

Every mismatch receives an independent record:

```text
case_id
field(s)
implementation_output
reference_output
relevant spec clause(s)
classification
rationale
```

Allowed classifications:

```text
SPEC_AMBIGUITY
IMPLEMENTATION_DEFECT
TEST_DEFECT
UNRESOLVED
```

### Classification law

```text
IF written spec uniquely determines one outcome
→ divergent implementation = IMPLEMENTATION_DEFECT

IF ≥2 reasonable outcomes satisfy written spec
→ SPEC_AMBIGUITY

IF corpus/reference expectation violates spec
→ TEST_DEFECT

IF evidence insufficient
→ UNRESOLVED
```

## Phase F — repair

For `SPEC_AMBIGUITY`:

```text
1. preserve original spec + outputs
2. revise normative specification
3. version the revision
4. rerun frozen implementations where possible
5. only then permit implementation changes required by clarified semantics
```

For `IMPLEMENTATION_DEFECT`, fix implementation and add regression test.

For `TEST_DEFECT`, fix corpus/oracle and preserve the faulty version in history.

## Phase G — final report

Report at minimum:

```text
number of corpus cases
exact canonical matches
SPEC_AMBIGUITY count
IMPLEMENTATION_DEFECT count
TEST_DEFECT count
UNRESOLVED count
post-repair mismatches
implementation changes made after freeze
specification changes made after freeze
```

A result with zero mismatches but no credible freeze/attestation process is **not** counted as independent replication.