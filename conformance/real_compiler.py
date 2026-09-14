"""Separate Python implementation of the REAL.v1.0 reference contract.
Not a line-by-line port; intended for cross-language semantic comparison.
"""
from copy import deepcopy

VERSION = "REAL.v1.0-py-ref.1"
CORE = ["O", "B", "C", "T"]
AUTHORITIES = {"SELF", "SHARED", "PUBLIC_ALLOCATION", "SAFETY_LEGAL", "UNKNOWN_AUTHORITY"}
EVIDENCE_STATES = {"STRONG_APPLICABLE", "MODERATE", "UNCERTAIN", "MISSING"}


def _unique_sorted(xs):
    return sorted(set(xs))


def normalize(raw):
    if not isinstance(raw, dict):
        raise ValueError("input must be object")
    if not raw.get("id"):
        raise ValueError("input.id required")
    if raw.get("authority") not in AUTHORITIES:
        raise ValueError("invalid authority")
    ev = raw.get("evidence") or {}
    if ev.get("status") not in EVIDENCE_STATES:
        raise ValueError("valid evidence.status required")
    x = {
        "irreversible": False, "high_stakes": False, "tradeoff_material": False,
        "ranking_sensitive": False, "hypothesis_may_change_action": False,
        "probe_feasible": False, "mechanism_value_expected": False,
        "persistence_value_expected": False, "sequential_decision": False,
        "selective_labels": False, "policy_rule_present": False,
        "policy_selection": None, "safety_legal_review_passed": False,
        "authorized_selection": None, "subgroup_harm_material": False,
    }
    x.update(deepcopy(raw))
    if "authority_confirmed" not in raw:
        x["authority_confirmed"] = x["authority"] != "UNKNOWN_AUTHORITY"
    options=[]
    for o in raw.get("options", []):
        q={"acceptable":True,"supported":False,"reversible":True,"prohibited":False,"participant_rank":None}
        q.update(deepcopy(o))
        if not q.get("id"): raise ValueError("every option requires id")
        options.append(q)
    x["options"]=sorted(options,key=lambda z:str(z["id"]))
    x["evidence"]=deepcopy(ev)
    x["evidence"]["supported_options"]=_unique_sorted(ev.get("supported_options",[]))
    return x


def _finish(x,modules,disposition,selection,traces,flags,unknown,reason):
    optional=sorted(set(modules)-set(CORE))
    return {"compiler_version":VERSION,"input_id":x["id"],"disposition":disposition,
      "selection":selection,"modules":CORE+optional,"unknown":_unique_sorted(unknown),
      "flags":_unique_sorted(flags),"reason":reason,"trace":traces,
      "invariants":{"unknown_preserved":True,"authority_not_invented":True,
      "mechanism_not_inferred_from_response":True,"automatic_retrain":False}}


def compile_real(raw):
    x=normalize(raw); modules=list(CORE); traces=[]; flags=[]; unknown=[]; authority=x["authority"]
    if authority not in {"SELF","SHARED"}: modules.append("G+")
    if authority=="UNKNOWN_AUTHORITY":
        unknown.append("authority"); traces.append({"rule":"UNKNOWN-AUTHORITY","detail":"authority is unresolved"})
        if x["irreversible"] or x["high_stakes"]:
            flags.append("SAFE_BLOCK"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Irreversible/high-stakes action blocked until legitimate authority is resolved.")
    if authority in {"PUBLIC_ALLOCATION","SAFETY_LEGAL"} and not x["authority_confirmed"]:
        flags.append("SAFE_BLOCK"); unknown.append("authority_confirmation"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Required authority is not confirmed.")
    if authority=="PUBLIC_ALLOCATION":
        if not x["policy_rule_present"]:
            flags.append("GOVERNANCE_REQUIRED"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Public allocation requires a legitimate predeclared rule and appeal/revision process.")
        if not x["policy_selection"]:
            flags.append("POLICY_SELECTION_REQUIRED"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Public allocation rule exists but no explicit policy-selected option was supplied.")
    if authority=="SAFETY_LEGAL" and (not x["safety_legal_review_passed"] or not x["authorized_selection"]):
        flags.append("SAFETY_LEGAL_REVIEW_REQUIRED"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Safety/legal action requires documented review and explicit authorized selection.")
    acceptable=[o for o in x["options"] if o["acceptable"] and not o["prohibited"]]
    if not acceptable:
        flags.append("NO_ACCEPTABLE_OPTION"); return _finish(x,modules,"NO_ACTION",None,traces,flags,unknown,"No option survives rights/safety/acceptability boundaries.")
    if x["tradeoff_material"] or x["ranking_sensitive"] or x["subgroup_harm_material"]: modules.append("V+")
    if x["ranking_sensitive"]:
        flags.append("VALUE_SENSITIVE"); traces.append({"rule":"SENSITIVITY-REQUIRED","detail":"defensible value rules can reverse the ranking"})
    if x["subgroup_harm_material"]:
        flags.append("SUBGROUP_HARM"); traces.append({"rule":"SUBGROUP-HARM-WATCH","detail":"aggregate benefit cannot erase material subgroup harm"})
    uncertain=x["evidence"]["status"] in {"UNCERTAIN","MISSING"}
    if uncertain and x["hypothesis_may_change_action"]: modules.append("H?")
    if uncertain: unknown.append("best_option")
    if uncertain and x["probe_feasible"]:
        probeable=[o for o in acceptable if o["reversible"]]
        if probeable:
            modules.append("P?"); probe=probeable[0]
            traces.append({"rule":"PROBE-MINIMUM","detail":f"probe {probe['id']}; response estimates utility, not mechanism"})
            if x["selective_labels"]: flags.append("SELECTIVE_LABEL_WARNING")
            return _finish(x,modules,"PROBE",probe["id"],traces,flags,unknown,"Use smallest reversible probe under genuine uncertainty; preserve mechanism as UNKNOWN.")
    if authority=="UNKNOWN_AUTHORITY":
        flags.append("AUTHORITY_UNRESOLVED"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Unresolved authority permits no substantive ACT selection; only an explicitly valid probe may precede resolution.")
    if x["mechanism_value_expected"]: modules.append("K?")
    if x["persistence_value_expected"]: modules.append("A?")
    if x["sequential_decision"]: modules.append("ADAPT?")
    if x["selective_labels"]:
        flags.append("SELECTIVE_LABEL_WARNING"); traces.append({"rule":"SELECTIVE-LABEL-WATCH","detail":"unchosen-action outcome is missing counterfactual, not negative evidence"})
    if x["evidence"]["status"]=="MISSING":
        return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Evidence is missing and no valid probe resolves it; preserve UNKNOWN.")
    supported_ids=set(x["evidence"].get("supported_options",[]))
    candidates=[o for o in acceptable if o["supported"] or o["id"] in supported_ids]
    if not candidates and x["evidence"]["status"]=="STRONG_APPLICABLE":
        flags.append("EVIDENCE_OPTION_MISMATCH"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Strong evidence asserted but no acceptable option is marked supported.")
    if not candidates: candidates=acceptable
    if authority=="PUBLIC_ALLOCATION":
        selected=next((o for o in candidates if o["id"]==x["policy_selection"]),None)
        if not selected:
            flags.append("POLICY_SELECTION_UNSUPPORTED"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Policy-selected option is not among acceptable evidence-supported candidates.")
        return _finish(x,modules,"ACT",selected["id"],traces,flags,unknown,"Execute explicit policy-selected option under confirmed public-allocation authority.")
    if authority=="SAFETY_LEGAL":
        selected=next((o for o in candidates if o["id"]==x["authorized_selection"]),None)
        if not selected:
            flags.append("AUTHORIZED_SELECTION_UNSUPPORTED"); return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Authorized safety/legal selection is not among acceptable evidence-supported candidates.")
        return _finish(x,modules,"ACT",selected["id"],traces,flags,unknown,"Execute explicitly authorized selection after safety/legal review.")
    if x["subgroup_harm_material"]:
        return _finish(x,modules,"DEFER",None,traces,flags,unknown,"Material subgroup harm requires explicit review/repair before selection.")
    if x["ranking_sensitive"]:
        ids=sorted(o["id"] for o in candidates); return _finish(x,modules,"OFFER" if authority in {"SELF","SHARED"} else "DEFER",ids,traces,flags,unknown,"No objective scalar ranking exists under defensible value variation.")
    if authority in {"SELF","SHARED"}:
        if len(candidates)>1:
            return _finish(x,modules,"OFFER",sorted(o["id"] for o in candidates),traces,flags,unknown,"Offer all acceptable evidence-supported options; do not invent a participant preference.")
        return _finish(x,modules,"ACT",candidates[0]["id"],traces,flags,unknown,"Single acceptable evidence-supported option.")
    return _finish(x,modules,"DEFER",None,traces,flags,unknown,"No explicit authority-valid selection rule resolved the remaining options.")