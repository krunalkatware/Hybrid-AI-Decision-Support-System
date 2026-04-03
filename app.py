from flask import Flask, render_template, request
from rules import rule_based_decision
from ml_model import ml_prediction
import os

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    result = None
    advice = []

    if request.method == "POST":
        try:
            score = int(request.form["score"])
            skills = int(request.form["skills"])
            internship = int(request.form["internship"])

            # Get predictions
            rule_result = rule_based_decision(score, skills, internship)
            ml_result = ml_prediction(score, skills, internship)

            # 🔥 Hybrid Decision Logic
            if rule_result == ml_result:
                final_result = ml_result
            else:
                # Priority to ML but mention rule conflict
                final_result = f"{ml_result} (Adjusted using Rules)"

            result = f"Placement Chance: {final_result}"

            # 🎯 Recommendations
            if score < 75:
                advice.append("Improve academic score above 75.")

            if skills < 7:
                advice.append("Improve technical skills (target ≥ 7).")

            if internship == 0:
                advice.append("Complete at least one internship.")

        except Exception as e:
            result = "Invalid input! Please enter correct values."

    return render_template("index.html", result=result, advice=advice)


# 🚀 Required for Render Deployment
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)