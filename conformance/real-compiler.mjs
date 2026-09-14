export const VERSION = 'REAL.v1.0-ref.2';

const CORE = ['O','B','C','T'];
const AUTH = new Set(['SELF','SHARED','PUBLIC_ALLOCATION','SAFETY_LEGAL','UNKNOWN_AUTHORITY']);
const EVIDENCE = new Set(['STRONG_APPLICABLE','MODERATE','UNCERTAIN','MISSING']);

function assert(cond, msg) { if (!cond) throw new Error(msg); }
function uniqSorted(xs) { return [...new Set(xs)].sort(); }
function byId(a,b){ return String(a.id).localeCompare(String(b.id)); }

export function normalize(input) {
  assert(input && typeof input === 'object', 'input must be object');
  assert(input.id, 'input.id required');
  assert(AUTH.has(input.authority), `invalid authority: ${input.authority}`);
  assert(input.evidence && EVIDENCE.has(input.evidence.status), 'valid evidence.status required');
  const options = [...(input.options || [])].map(o => ({
    acceptable: true,
    supported: false,
    reversible: true,
    prohibited: false,
    participant_rank: null,
    ...o
  })).sort(byId);
  assert(options.every(o => o.id), 'every option requires id');
  return {
    irreversible: false,
    high_stakes: false,
    authority_confirmed: input.authority !== 'UNKNOWN_AUTHORITY',
    tradeoff_material: false,
    ranking_sensitive: false,
    hypothesis_may_change_action: false,
    probe_feasible: false,
    mechanism_value_expected: false,
    persistence_value_expected: false,
    sequential_decision: false,
    selective_labels: false,
    policy_rule_present: false,
    policy_selection: null,
    safety_legal_review_passed: false,
    authorized_selection: null,
    subgroup_harm_material: false,
    ...input,
    options,
    evidence: {...input.evidence, supported_options: uniqSorted(input.evidence.supported_options || [])}
  };
}

function trace(rule, detail){ return {rule, detail}; }

export function compile(rawInput) {
  const x = normalize(rawInput);
  const modules = [...CORE];
  const traces = [];
  const flags = [];
  const unknown = [];

  if (x.authority !== 'SELF' && x.authority !== 'SHARED') modules.push('G+');
  if (x.authority === 'UNKNOWN_AUTHORITY') {
    unknown.push('authority');
    traces.push(trace('UNKNOWN-AUTHORITY', 'authority is unresolved'));
    if (x.irreversible || x.high_stakes) {
      flags.push('SAFE_BLOCK');
      return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
        'Irreversible/high-stakes action blocked until legitimate authority is resolved.');
    }
  }
  if ((x.authority === 'PUBLIC_ALLOCATION' || x.authority === 'SAFETY_LEGAL') && !x.authority_confirmed) {
    flags.push('SAFE_BLOCK');
    unknown.push('authority_confirmation');
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Required authority is not confirmed.');
  }
  if (x.authority === 'PUBLIC_ALLOCATION' && !x.policy_rule_present) {
    flags.push('GOVERNANCE_REQUIRED');
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Public allocation requires a legitimate predeclared rule and appeal/revision process.');
  }
  if (x.authority === 'PUBLIC_ALLOCATION' && !x.policy_selection) {
    flags.push('POLICY_SELECTION_REQUIRED');
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Public allocation rule exists but no explicit policy-selected option was supplied.');
  }
  if (x.authority === 'SAFETY_LEGAL' && (!x.safety_legal_review_passed || !x.authorized_selection)) {
    flags.push('SAFETY_LEGAL_REVIEW_REQUIRED');
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Safety/legal action requires documented review and explicit authorized selection.');
  }

  const acceptable = x.options.filter(o => o.acceptable && !o.prohibited);
  if (!acceptable.length) {
    flags.push('NO_ACCEPTABLE_OPTION');
    return finalize(x, modules, 'NO_ACTION', null, traces, flags, unknown,
      'No option survives rights/safety/acceptability boundaries.');
  }

  if (x.tradeoff_material || x.ranking_sensitive || x.subgroup_harm_material) modules.push('V+');
  if (x.ranking_sensitive) {
    flags.push('VALUE_SENSITIVE');
    traces.push(trace('SENSITIVITY-REQUIRED', 'defensible value rules can reverse the ranking'));
  }
  if (x.subgroup_harm_material) {
    flags.push('SUBGROUP_HARM');
    traces.push(trace('SUBGROUP-HARM-WATCH', 'aggregate benefit cannot erase material subgroup harm'));
  }

  const uncertain = x.evidence.status === 'UNCERTAIN' || x.evidence.status === 'MISSING';
  if (uncertain && x.hypothesis_may_change_action) modules.push('H?');
  if (uncertain) unknown.push('best_option');
  if (uncertain && x.probe_feasible) {
    const probeable = acceptable.filter(o => o.reversible);
    if (probeable.length) {
      modules.push('P?');
      const probe = probeable[0];
      traces.push(trace('PROBE-MINIMUM', `probe ${probe.id}; response estimates utility, not mechanism`));
      if (x.selective_labels) flags.push('SELECTIVE_LABEL_WARNING');
      return finalize(x, modules, 'PROBE', probe.id, traces, flags, unknown,
        'Use smallest reversible probe under genuine uncertainty; preserve mechanism as UNKNOWN.');
    }
  }

  if (x.authority === 'UNKNOWN_AUTHORITY') {
    flags.push('AUTHORITY_UNRESOLVED');
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Unresolved authority permits no substantive ACT selection; only an explicitly valid probe may precede resolution.');
  }

  if (x.mechanism_value_expected) modules.push('K?');
  if (x.persistence_value_expected) modules.push('A?');
  if (x.sequential_decision) modules.push('ADAPT?');

  if (x.selective_labels) {
    flags.push('SELECTIVE_LABEL_WARNING');
    traces.push(trace('SELECTIVE-LABEL-WATCH', 'unchosen-action outcome is missing counterfactual, not negative evidence'));
  }

  if (x.evidence.status === 'MISSING') {
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Evidence is missing and no valid probe resolves it; preserve UNKNOWN.');
  }

  const supportedIds = new Set(x.evidence.supported_options || []);
  let candidates = acceptable.filter(o => o.supported || supportedIds.has(o.id));
  if (!candidates.length && x.evidence.status === 'STRONG_APPLICABLE') {
    flags.push('EVIDENCE_OPTION_MISMATCH');
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Strong evidence asserted but no acceptable option is marked supported.');
  }
  if (!candidates.length) candidates = acceptable;

  if (x.authority === 'PUBLIC_ALLOCATION') {
    const selected = candidates.find(o => o.id === x.policy_selection);
    if (!selected) {
      flags.push('POLICY_SELECTION_UNSUPPORTED');
      return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
        'Policy-selected option is not among acceptable evidence-supported candidates.');
    }
    return finalize(x, modules, 'ACT', selected.id, traces, flags, unknown,
      'Execute explicit policy-selected option under confirmed public-allocation authority.');
  }

  if (x.authority === 'SAFETY_LEGAL') {
    const selected = candidates.find(o => o.id === x.authorized_selection);
    if (!selected) {
      flags.push('AUTHORIZED_SELECTION_UNSUPPORTED');
      return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
        'Authorized safety/legal selection is not among acceptable evidence-supported candidates.');
    }
    return finalize(x, modules, 'ACT', selected.id, traces, flags, unknown,
      'Execute explicitly authorized selection after safety/legal review.');
  }

  if (x.subgroup_harm_material) {
    return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
      'Material subgroup harm requires explicit review/repair before selection.');
  }

  if (x.ranking_sensitive) {
    const ids = candidates.map(o => o.id).sort();
    return finalize(x, modules, x.authority === 'SELF' || x.authority === 'SHARED' ? 'OFFER' : 'DEFER', ids,
      traces, flags, unknown,
      'No objective scalar ranking exists under defensible value variation.');
  }

  if (x.authority === 'SELF' || x.authority === 'SHARED') {
    if (candidates.length > 1) {
      return finalize(x, modules, 'OFFER', candidates.map(o=>o.id).sort(), traces, flags, unknown,
        'Offer all acceptable evidence-supported options; do not invent a participant preference.');
    }
    return finalize(x, modules, 'ACT', candidates[0].id, traces, flags, unknown,
      'Single acceptable evidence-supported option.');
  }

  return finalize(x, modules, 'DEFER', null, traces, flags, unknown,
    'No explicit authority-valid selection rule resolved the remaining options.');
}

function finalize(x, modules, disposition, selection, traces, flags, unknown, reason) {
  const path = uniqSorted(modules);
  const ordered = [...CORE, ...path.filter(m => !CORE.includes(m)).sort()];
  return {
    compiler_version: VERSION,
    input_id: x.id,
    disposition,
    selection,
    modules: ordered,
    unknown: uniqSorted(unknown),
    flags: uniqSorted(flags),
    reason,
    trace: traces,
    invariants: {
      unknown_preserved: true,
      authority_not_invented: true,
      mechanism_not_inferred_from_response: true,
      automatic_retrain: false
    }
  };
}