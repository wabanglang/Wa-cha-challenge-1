package main

import "sort"

type Evidence struct {
	Status           string   `json:"status"`
	SupportedOptions []string `json:"supported_options"`
}

type Option struct {
	ID         string `json:"id"`
	Acceptable *bool  `json:"acceptable,omitempty"`
	Supported  bool   `json:"supported,omitempty"`
	Reversible *bool  `json:"reversible,omitempty"`
	Prohibited bool   `json:"prohibited,omitempty"`
}

type Input struct {
	ID                        string   `json:"id"`
	Authority                 string   `json:"authority"`
	AuthorityConfirmed        *bool    `json:"authority_confirmed,omitempty"`
	Irreversible              bool     `json:"irreversible,omitempty"`
	HighStakes                bool     `json:"high_stakes,omitempty"`
	Evidence                  Evidence `json:"evidence"`
	Options                   []Option `json:"options"`
	TradeoffMaterial          bool     `json:"tradeoff_material,omitempty"`
	RankingSensitive          bool     `json:"ranking_sensitive,omitempty"`
	HypothesisMayChangeAction bool     `json:"hypothesis_may_change_action,omitempty"`
	ProbeFeasible             bool     `json:"probe_feasible,omitempty"`
	MechanismValueExpected    bool     `json:"mechanism_value_expected,omitempty"`
	PersistenceValueExpected  bool     `json:"persistence_value_expected,omitempty"`
	SequentialDecision        bool     `json:"sequential_decision,omitempty"`
	SelectiveLabels           bool     `json:"selective_labels,omitempty"`
	PolicyRulePresent         bool     `json:"policy_rule_present,omitempty"`
	PolicySelection           *string  `json:"policy_selection,omitempty"`
	SafetyLegalReviewPassed   bool     `json:"safety_legal_review_passed,omitempty"`
	AuthorizedSelection       *string  `json:"authorized_selection,omitempty"`
	SubgroupHarmMaterial      bool     `json:"subgroup_harm_material,omitempty"`
}

type Trace struct {
	Rule   string `json:"rule"`
	Detail string `json:"detail"`
}

type Invariants struct {
	UnknownPreserved                 bool `json:"unknown_preserved"`
	AuthorityNotInvented             bool `json:"authority_not_invented"`
	MechanismNotInferredFromResponse bool `json:"mechanism_not_inferred_from_response"`
	AutomaticRetrain                 bool `json:"automatic_retrain"`
}

type Output struct {
	CompilerVersion string     `json:"compiler_version"`
	InputID         string     `json:"input_id"`
	Disposition     string     `json:"disposition"`
	Selection       any        `json:"selection"`
	Modules         []string   `json:"modules"`
	Unknown         []string   `json:"unknown"`
	Flags           []string   `json:"flags"`
	Reason          string     `json:"reason"`
	Trace           []Trace    `json:"trace"`
	Invariants      Invariants `json:"invariants"`
}

func boolOr(v *bool, d bool) bool { if v == nil { return d }; return *v }
func has(xs []string, s string) bool { for _, x := range xs { if x == s { return true } }; return false }
func uniq(xs []string) []string { m := map[string]bool{}; for _, x := range xs { m[x] = true }; out := make([]string, 0, len(m)); for x := range m { out = append(out, x) }; sort.Strings(out); return out }
func acceptable(o Option) bool { return boolOr(o.Acceptable, true) && !o.Prohibited }
func reversible(o Option) bool { return boolOr(o.Reversible, true) }
