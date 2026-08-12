# Decision Readiness

## 1. Purpose

Evaluate whether given the identified problem and enough evidence supporting the problem, do we know enough to confidently make this decision?

The goal is to not say Yes/No whether to take a decision, but give a confidence score to a decision. This score evaluates whether confidence in the decision is greater than the cost of it being wrong.

## 2. Identify the Decision Being Made

Before asking "are we ready?", clarify:

> Ready for what?

Different decisions require different confidence.

Examples:
Decision A:

> Should we prototype this idea?

Requires lower confidence.

Decision B:

> Should we rebuild our entire onboarding system?

Requires much higher confidence.

So the skill first identifies:

```text
Decision:
What commitment is being considered?

Impact:
What happens if we are wrong?
```

## 3. Assess Current Knowledge

The skill should create a knowledge map:

```text
What we know

What we believe

What we don't know
```

Example:

```text
Known:
Users abandon configuration.

Believed:
Configuration complexity causes abandonment.

Unknown:
Would simplifying configuration improve activation?
```

This connects with our Claim → Evidence → Inference model defined in `./solution-evaluation.md`

## 4. Identify Remaining Uncertainty

Not all unknowns matter.
The skill should identify

### Critical uncertainty

An unknown that could change the decision.
Example:

> "Will users adopt this feature?"
> Important.

### Non-critical uncertainty

An unknown that does not affect the decision.
Example:

> "Which colour should the button use?"
> Not relevant at this stage.

The skill should prioritise uncertainty by:

```text
Impact if wrong
×
Likelihood of being wrong
```

## 5. Evaluate Decision Risk

Decision risk comes from:

```text
Risk = Impact of failure + Difficulty reversing decision + Number of affected users + Business consequences
```

Example:
Low risk:

> Test a new onboarding tooltip with 5% of users.

High risk:

> Replace the entire onboarding architecture.

The second requires much stronger confidence.

## 6. Determine Required Confidence Level

Different decisions need different evidence thresholds.

| Decision                   | Required confidence |
| -------------------------- | ------------------- |
| Create prototype           | Low                 |
| Run experiment             | Medium              |
| Build production feature   | Medium-high         |
| Major strategic investment | High                |
| Irreversible change        | Very high           |

The skill should avoid:
"You need more research."

Instead:
"You need more evidence because this decision has high impact and low reversibility."

## 7. Decision Chain Validation

Before deciding readiness, evaluate the full reasoning chain:

```text
Problem
    ↓
Root cause
    ↓
Proposed intervention
    ↓
Expected outcome
    ↓
Business impact
```

A decision is not ready if any critical link is unsupported.
Example:

```text
Known:
Users are frustrated with dashboard.

Unknown:
Whether dashboard structure is the main cause.

Unknown:
Whether redesign will improve engagement.

Decision risk:
High because redesign requires 3 months of engineering effort.
Recommendation:
Investigate the root causes of dashboard frustration before committing to a redesign.
```

## 8. Decide Readiness

The output should answer:

```text
Decision:
[What decision is being evaluated]

Readiness:
[Ready / Partially ready / Not ready]

Reason:
[Why]

Current confidence:
[Low / Medium / High]

Decision risk:
[Low / Medium / High]

Critical uncertainty:
[What remains unknown]

Recommended next action:
[Action]

Recommendation rationale:
[Why this action improves decision quality]
```

The key principle

> The amount of evidence required should increase with the cost of being wrong.

A startup testing a landing page and a company replacing a core workflow should not use the same decision standard.

## 8. Human Review

Decision readiness assessment is advisory.

The final decision remains with the responsible human stakeholders.
Always communicate:

- What is supported by evidence
- What is inferred
- What remains uncertain
- What assumptions influence the recommendation
- Which stakeholders should validate the decision
- Do not present readiness assessment as approval or rejection of a decision.
