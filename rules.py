def rule_based_decision(score, skills, internship):

    if score >= 75 and skills >= 7 and internship == 1:
        return "High"

    elif score >= 60 and skills >= 5:
        return "Medium"

    else:
        return "Low"