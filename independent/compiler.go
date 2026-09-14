package main

import (
	"fmt"
	"sort"
)

func finish(in Input, modules []string, disposition string, selection any, trace []Trace, flags, unknown []string, reason string) Output {
	core := []string{"O", "B", "C", "T"}
	mods := append([]string{}, core...)
	for _, m := range uniq(modules) { if !has(core, m) { mods = append(mods, m) } }
	return Output{
		CompilerVersion: "REAL.v1.0-cleanroom-go.1",
		InputID: in.ID, Disposition: disposition, Selection: selection,
		Modules: mods, Unknown: uniq(unknown), Flags: uniq(flags), Reason: reason, Trace: trace,
		Invariants: Invariants{UnknownPreserved:true, AuthorityNotInvented:true, MechanismNotInferredFromResponse:true, AutomaticRetrain:false},
	}
}

func Compile(in Input) Output {
	sort.Slice(in.Options, func(i,j int) bool { return in.Options[i].ID < in.Options[j].ID })
	modules := []string{"O","B","C","T"}; flags := []string{}; unknown := []string{}; trace := []Trace{}
	addModule := func(m string){ modules = append(modules,m) }
	addFlag := func(f string){ flags = append(flags,f) }
	addUnknown := func(u string){ unknown = append(unknown,u) }

	if in.Authority != "SELF" && in.Authority != "SHARED" { addModule("G+") }
	authorityConfirmed := boolOr(in.AuthorityConfirmed, in.Authority != "UNKNOWN_AUTHORITY")

	// P2 HARD-AUTHORITY-GATES from the repaired normative spec.
	if in.Authority == "UNKNOWN_AUTHORITY" {
		addUnknown("authority"); trace = append(trace, Trace{"UNKNOWN-AUTHORITY","authority is unresolved"})
		if in.Irreversible || in.HighStakes { addFlag("SAFE_BLOCK"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Unknown authority blocks irreversible/high-stakes action.") }
	}
	if (in.Authority == "PUBLIC_ALLOCATION" || in.Authority == "SAFETY_LEGAL") && !authorityConfirmed {
		addFlag("SAFE_BLOCK"); addUnknown("authority_confirmation"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Required authority is not confirmed.")
	}
	if in.Authority == "PUBLIC_ALLOCATION" {
		if !in.PolicyRulePresent { addFlag("GOVERNANCE_REQUIRED"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Public allocation requires a governing rule.") }
		if in.PolicySelection == nil { addFlag("POLICY_SELECTION_REQUIRED"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Public allocation requires an explicit rule-produced selection.") }
	}
	if in.Authority == "SAFETY_LEGAL" && (!in.SafetyLegalReviewPassed || in.AuthorizedSelection == nil) {
		addFlag("SAFETY_LEGAL_REVIEW_REQUIRED"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Safety/legal action requires explicit reviewed selection.")
	}

	// P3 option boundaries.
	acc := []Option{}
	for _, o := range in.Options { if acceptable(o) { acc = append(acc,o) } }
	if len(acc) == 0 { addFlag("NO_ACCEPTABLE_OPTION"); return finish(in,modules,"NO_ACTION",nil,trace,flags,unknown,"No acceptable option survives boundaries.") }

	// P4 material value/harm analysis.
	if in.TradeoffMaterial || in.RankingSensitive || in.SubgroupHarmMaterial { addModule("V+") }
	if in.RankingSensitive { addFlag("VALUE_SENSITIVE"); trace = append(trace,Trace{"SENSITIVITY-REQUIRED","defensible value rules can reverse the ranking"}) }
	if in.SubgroupHarmMaterial { addFlag("SUBGROUP_HARM"); trace = append(trace,Trace{"SUBGROUP-HARM-WATCH","aggregate benefit cannot erase material subgroup harm"}) }

	// P5 uncertainty/hypothesis/probe.
	uncertain := in.Evidence.Status == "UNCERTAIN" || in.Evidence.Status == "MISSING"
	if uncertain { addUnknown("best_option") }
	if uncertain && in.HypothesisMayChangeAction { addModule("H?") }
	if uncertain && in.ProbeFeasible {
		for _, o := range acc { if reversible(o) {
			addModule("P?"); trace = append(trace,Trace{"PROBE-MINIMUM",fmt.Sprintf("probe %s; response estimates utility, not mechanism",o.ID)})
			if in.SelectiveLabels { addFlag("SELECTIVE_LABEL_WARNING") }
			return finish(in,modules,"PROBE",o.ID,trace,flags,unknown,"Use a minimal reversible probe under genuine uncertainty.")
		} }
	}
	if in.Authority == "UNKNOWN_AUTHORITY" { addFlag("AUTHORITY_UNRESOLVED"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"No substantive act without resolved legitimate authority.") }

	if in.MechanismValueExpected { addModule("K?") }
	if in.PersistenceValueExpected { addModule("A?") }
	if in.SequentialDecision { addModule("ADAPT?") }
	if in.SelectiveLabels { addFlag("SELECTIVE_LABEL_WARNING"); trace = append(trace,Trace{"SELECTIVE-LABEL-WATCH","unchosen outcome remains a missing counterfactual"}) }
	if in.Evidence.Status == "MISSING" { return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Missing evidence remains UNKNOWN; no forced action.") }

	supported := map[string]bool{}; for _, id := range in.Evidence.SupportedOptions { supported[id] = true }
	cand := []Option{}; for _, o := range acc { if o.Supported || supported[o.ID] { cand = append(cand,o) } }
	if len(cand) == 0 && in.Evidence.Status == "STRONG_APPLICABLE" { addFlag("EVIDENCE_OPTION_MISMATCH"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Strong evidence does not map to an acceptable available option.") }
	if len(cand) == 0 { cand = acc }

	// P6 authority-valid selection.
	if in.Authority == "PUBLIC_ALLOCATION" {
		for _, o := range cand { if o.ID == *in.PolicySelection { return finish(in,modules,"ACT",o.ID,trace,flags,unknown,"Act on explicit policy selection.") } }
		addFlag("POLICY_SELECTION_UNSUPPORTED"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Policy selection is unsupported or outside acceptable options.")
	}
	if in.Authority == "SAFETY_LEGAL" {
		for _, o := range cand { if o.ID == *in.AuthorizedSelection { return finish(in,modules,"ACT",o.ID,trace,flags,unknown,"Act on reviewed authorized selection.") } }
		addFlag("AUTHORIZED_SELECTION_UNSUPPORTED"); return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Authorized selection is unsupported or outside acceptable options.")
	}
	if in.SubgroupHarmMaterial { return finish(in,modules,"DEFER",nil,trace,flags,unknown,"Material subgroup harm requires review before action.") }
	if in.RankingSensitive {
		ids := []string{}; for _,o := range cand { ids = append(ids,o.ID) }; sort.Strings(ids)
		if in.Authority == "SELF" || in.Authority == "SHARED" { return finish(in,modules,"OFFER",ids,trace,flags,unknown,"Offer options because ranking is value-sensitive.") }
		return finish(in,modules,"DEFER",nil,trace,flags,unknown,"No objective ranking under unresolved value sensitivity.")
	}
	if in.Authority == "SELF" || in.Authority == "SHARED" {
		if len(cand) > 1 { ids := []string{}; for _,o := range cand { ids = append(ids,o.ID) }; sort.Strings(ids); return finish(in,modules,"OFFER",ids,trace,flags,unknown,"Offer all acceptable evidence-supported options; do not invent preference.") }
		return finish(in,modules,"ACT",cand[0].ID,trace,flags,unknown,"Single acceptable evidence-supported option.")
	}
	return finish(in,modules,"DEFER",nil,trace,flags,unknown,"No authority-valid selection path resolved.")
}
