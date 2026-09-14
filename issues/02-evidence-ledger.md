# [EVIDENCE] Create an evidence ledger for every major claim

**Owner / originating author:** DOUGLAS W. T., JACKS0N

## Objective

Build a transparent ledger where evidence and counterevidence are equally welcome and every major claim has an explicit epistemic status.

Use one status per claim:

```text
SUPPORTED | MIXED | PLAUSIBLE/UNTESTED | REFUTED | UNKNOWN
```

## Minimum ledger fields

| Field | Required |
|---|---|
| Claim ID | yes |
| Exact claim | yes |
| Population/context | yes |
| Evidence type | yes |
| Source | yes |
| Supports / contradicts / qualifies | yes |
| Main limitation | yes |
| Replication status | when known |
| Current status | yes |
| What evidence would change the status? | yes |

## Evidence hierarchy

Prefer systematic reviews/meta-analyses, high-quality causal/quasi-experimental designs, longitudinal evidence, preregistered trials where appropriate, transparent administrative datasets, and well-designed qualitative evidence for mechanisms and lived effects.

Do **not** discard lived experience or qualitative evidence; instead, do not silently convert it into population-level causal proof.

## Anti-confirmation-bias rule

Every evidence contribution that strengthens a major claim should trigger a search request for the strongest available counterexample, null result, alternative explanation, or subgroup exception.

The goal is not to accumulate citations. The goal is to reduce uncertainty enough to decide what is worth testing.