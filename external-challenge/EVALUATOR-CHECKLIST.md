# Evaluator Checklist — REAL v1.0 Independent Replication

## Before implementation

- [ ] Give implementer only the exported spec-only kit.
- [ ] Do not provide repository URL, reference code, fixtures, reference outputs, or prior result discussions.
- [ ] Record implementer name/handle and start date.
- [ ] Record specification snapshot identity.

## At freeze

- [ ] Obtain frozen implementation commit/hash.
- [ ] Obtain source archive.
- [ ] Compute/record source archive SHA-256.
- [ ] Obtain completed implementer attestation.
- [ ] Verify corpus has not yet been supplied.

## Corpus reveal

- [ ] Reveal adversarial inputs only.
- [ ] Withhold reference outputs.
- [ ] Run frozen implementation unchanged.
- [ ] Preserve raw first-run outputs.
- [ ] Record runtime/language/environment.

## Comparison

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

- [ ] Ignore noncanonical prose/formatting differences.
- [ ] Create one mismatch record per divergent case.

## Classification

For each mismatch:

- [ ] cite relevant specification clauses;
- [ ] classify `SPEC_AMBIGUITY`, `IMPLEMENTATION_DEFECT`, `TEST_DEFECT`, or `UNRESOLVED`;
- [ ] write a short rationale before any implementation changes.

## Repair discipline

- [ ] `SPEC_AMBIGUITY` → repair/version specification first.
- [ ] `IMPLEMENTATION_DEFECT` → repair implementation + add regression.
- [ ] `TEST_DEFECT` → repair oracle/corpus + preserve faulty test in history.
- [ ] Preserve all pre-repair outputs.

## Final report

- [ ] total cases;
- [ ] exact canonical matches;
- [ ] mismatch counts by class;
- [ ] pre/post-repair results;
- [ ] source changes after freeze;
- [ ] specification changes after freeze;
- [ ] remaining unresolved divergences;
- [ ] explicit statement that implementation conformance ≠ external validity of real-world decisions.
