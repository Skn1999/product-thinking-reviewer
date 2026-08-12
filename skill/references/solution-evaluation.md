# Solution Evaluation

## Purpose

Evaluate whether a proposed solution is sufficiently justified by the problem, evidence, business goals, constraints, uncertainty, and risk.

The goal is not to identify the objectively "best" solution. The goal is to determine which solution is most justified under the current conditions and what should happen next.

---

## 1. Confirm Problem Readiness

Before evaluating solutions, determine whether the underlying problem is sufficiently understood.

Check:

- Is the problem clearly defined?
- Is the problem supported by relevant evidence?
- Are important assumptions identified?
- Is there critical uncertainty that could change the problem definition?

If the problem is poorly understood, do not compensate by performing deeper solution analysis.

Recommend returning to problem and evidence evaluation when necessary.

> A well-designed solution to a poorly understood problem is still a poor product decision.

---

## 2. Identify Candidate Solutions

Do not assume the proposed solution is the only viable option.

Consider:

- The proposed solution
- Plausible alternatives
- Smaller or simpler interventions
- Existing capabilities that could address the problem
- Further investigation, where appropriate
- Doing nothing or delaying the decision

The goal is not to identify every possible solution.

The goal is to determine whether the team has explored a sufficiently diverse set of plausible approaches before committing resources.

Avoid premature convergence on the first proposed solution.

---

## 3. Decompose the Solution Hypothesis

Treat every solution as a hypothesis rather than a proven answer.

For each candidate solution, identify:

### Problem addressed

What part of the identified problem does the solution attempt to address?

### Expected behaviour change

What user, customer, employee, or system behaviour is expected to change?

### Expected outcome

What business or product outcome should result from that behaviour change?

### Supporting assumptions

What must be true for the solution to produce the expected outcome?

Represent the reasoning as:

```text
Problem
    ↓
Solution
    ↓
Expected behaviour change
    ↓
Expected outcome
```

## 4. Evaluate Problem-Solution Fit

For each candidate solution, evaluate:

1. Does it directly address the identified problem?
2. Which part of the problem does it address?
3. Is there evidence supporting the relationship between the solution and the expected outcome?
4. Are important assumptions unsupported?
5. Could the same problem be addressed through a simpler intervention?

> Do not assume that solving a visible symptom will solve the underlying problem.

## 5. Evaluate Business Alignment

Evaluate each solution against the stated business and product goals.
Consider:

- Business objectives
- Product strategy
- Customer value
- Expected outcome
- Strategic priorities
- Opportunity cost

> A technically attractive or user-friendly solution should not automatically advance if it does not meaningfully contribute to the intended goal.
> If business goals are unclear, identify this as a decision gap.

## 6. Evaluate Constraints

Determine whether each candidate solution is realistically viable within the current constraints.
Consider:

- Timeline
- Budget
- Engineering capacity
- Technical limitations
- Organisational constraints
- Existing commitments

Do not recommend a solution that ignores explicit constraints. If a constraint is uncertain, identify it rather than assuming it.

## 7. Evaluate Impact and Effort

Use impact and effort as a decision heuristic, not as the sole decision rule.

### Expected impact

Assess:

- Potential improvement to the intended outcome
- Number of users or customers affected
- Magnitude of expected change
- Strategic importance

### Effort

Assess:

- Implementation complexity
- Time
- People and resources required
- Dependencies
- Operational cost

High impact and low effort may make a solution attractive, but this alone is insufficient for recommendation.

Always consider:

- Problem fit
- Evidence confidence
- Risk
- Business alignment
- Constraints
- Reversibility

## 8. Evaluate Risk, Confidence and Reversibility

For each candidate solution, assess:

### Confidence

How strong is the evidence supporting the expected impact?

Use:

- High
- Medium
- Low

Do not invent numerical probabilities without a defensible basis.

### Risk

Consider:

- Risk of failure
- Cost of failure
- Potential user impact
- Business impact
- Reversibility

Ask:

> If this solution is wrong, how easily can we undo it?

A highly reversible decision can tolerate more uncertainty than an irreversible decision.

A solution with high expected impact but low confidence and high cost of failure may require validation before implementation.

## 9. Compare Trade-offs

Do not reduce the evaluation to a single score unless the user explicitly provides a justified scoring model.

For each candidate solution, identify:

```text
Strengths:
Risks:
Unknowns:
Constraints:
Trade-offs:
Confidence:
```

Compare solutions in context rather than in isolation.
The recommendation should explain why one option is more justified than another under the current conditions.

## 10. Consider Doing Nothing

Always consider whether action is preferable to inaction.
Doing nothing may be appropriate when:

- Evidence is insufficient
- Expected impact is low for all the solution identified
- Implementation cost is disproportionate
- The problem is not strategically important
- Existing solutions are adequate
- Further information could materially change the decision

> "Do nothing" does not necessarily mean abandoning the problem.

It may mean:

- Delay implementation
- Gather more evidence
- Continue monitoring
- Revisit the decision later

## 11. Select a Solution Hypothesis

When one solution is currently preferable, represent it as a solution hypothesis, not a proven answer.
Structure:

```text
If we [implement solution],

then [expected behaviour change],

which should lead to [expected outcome],

because [supporting assumption].
```

Example:

> If we simplify campaign configuration, more new users should successfully complete setup, which should improve activation because configuration complexity is contributing to onboarding failure.

## 12. Determine the Next Action

The selected solution and the next best action are not necessarily the same.
Possible next actions include:

- Gather additional evidence
- Conduct targeted research
- Prototype
- Run an experiment
- Validate a critical assumption
- Conduct a beta
- Build
- Reconsider the problem
- Delay the decision
- Do nothing

Choose the next action based on:

- Decision confidence
- Critical uncertainty
- Risk
- Reversibility
- Constraints
- Expected value of additional information

Prefer the action that improves decision quality while considering to the risk and cost of the decision.

## 13. Human Review

The solution evaluation is advisory. The final decision remains with the human decision-maker.

Always communicate:

- Why the solution was preferred
- What evidence supports the recommendation
- What assumptions remain
- What uncertainties remain
- What could change the recommendation
- Which stakeholders or domain experts should validate the decision

Do not present the selected solution as objectively correct.

## Core Principle

Do not select the solution that appears best in isolation. Select the solution that is most justified by the problem, evidence, goals, constraints, uncertainty, risk, and reversibility.
