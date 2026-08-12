# Rollout Risk Evaluation

## Purpose

Evaluate how a product decision should be introduced to users based on solution confidence, risk, reversibility, exposure, and learning opportunity.

The goal is not to decide whether a solution should exist. The goal is to determine the safest and most valuable way to expose the solution while managing uncertainty.

---

## 1. Confirm Rollout Decision

Before evaluating rollout strategy, understand:

- What solution is being launched?
- Who will be affected?
- What behaviour change is expected?
- What outcome should improve?
- What assumptions are being tested?

A rollout is not only a delivery decision. It is also an opportunity to learn and validate assumptions.

---

## 2. Evaluate Solution Confidence

Assess how confident the team is that the solution will achieve the expected outcome.

Consider:

- Strength of problem evidence
- Quality of solution validation
- Results from experiments or prototypes
- User feedback
- Behavioural data
- Remaining assumptions

Use:

- High confidence
- Medium confidence
- Low confidence

Do not assume positive feedback alone proves solution effectiveness.

Evaluate both:

### Positive evidence

Examples:

- Users successfully completed the intended task
- Metrics improved during testing
- Users understood the value proposition

### Negative evidence

Examples:

- Confusion
- Errors
- Complaints
- Unexpected behaviour
- Users abandoning the workflow

A rollout decision should consider the complete evidence picture.

---

## 3. Evaluate Rollout Risk

Assess the consequences of introducing the solution.

Consider:

### User impact

- Number of users affected
- Importance of the affected workflow
- Severity if the experience fails
- Ability of users to recover

Example:

Changing a cosmetic interface element:

Low user impact.

Changing payment or authentication flows:

High user impact.

---

### Business impact

Consider:

- Revenue impact
- Customer trust
- Operational consequences

---

### Technical and operational risk

Consider:

- System reliability
- Monitoring capability
- Deployment complexity
- Rollback capability

---

## 4. Evaluate Reversibility

Determine how easily the decision can be undone.

Ask:

> If this rollout fails, how quickly and safely can we recover?

### High reversibility

Examples:

- Feature flags
- Limited experiments
- Beta releases
- Controlled rollouts
- One-switch reverts

### Low reversibility

Examples:

- Major system migrations
- Removing existing workflows
- Large architectural changes

Lower reversibility requires stronger confidence before increasing exposure.

---

## 5. Evaluate Exposure vs Learning Value

The rollout strategy should balance:

```text
User exposure and business risk

against

Learning gained from the rollout
```

A rollout can serve two purposes:

- Deliver value to users.
- Reduce uncertainty about whether the solution works.

Consider:

- How much exposure is necessary to learn?
- Can we learn with fewer affected users?
- Does wider exposure create meaningful additional information?

> Prefer the smallest exposure that provides sufficient learning and confidence.

## 6. Select Rollout Strategy

Choose the rollout approach based on:

- Solution confidence
- Risk
- Reversibility
- Exposure
- Learning needs

### Experiment

Use when:

- The expected outcome can be measured
- There is significant uncertainty
- Multiple approaches need comparison
- Causal understanding is important
  Goal:
  Generate evidence before broader commitment.

### Beta or Limited Release

Use when:

- Confidence is moderate
- User impact is meaningful
- More real-world learning is needed
- Rollback is possible

Goal:
Validate the solution with controlled exposure.

### Gradual Rollout

Use when:

- The solution has reasonable confidence
- The impact is significant
- Monitoring is available
- Risk can be managed through staged exposure

Goal:
Increase exposure while monitoring outcomes.

### Full Launch

Use when:

- Confidence is high
- Risk is acceptable
- The solution is well validated
- Rollback is available or consequences are limited

Goal:
Deliver the solution broadly.

### Delay Rollout

Use when:

- Critical assumptions remain unresolved
- Risk exceeds confidence
- Monitoring is insufficient
- Failure consequences are too high

Goal:
Reduce uncertainty before increasing exposure.

## 7. Define Success and Warning Signals

Before rollout, identify how success will be measured.

Examples:

- Improvement in target behaviour
- Increase in activation or retention
- Reduction in errors
- Reduction in support requests
- Improvement in customer outcomes

Success criteria should connect directly to the original problem and expected outcome.

Also, identify signals that indicate the rollout may be causing unintended consequences.

Examples:

- Increased error rates
- Negative user feedback
- Drop in key metrics
- Increased support requests
- Users creating workarounds

Do not only monitor positive outcomes.

## 8. Define Rollback Conditions

Before rollout, define:
What evidence would indicate that we should pause or reverse this decision?

Examples:
Rollback if:

- Critical workflow failures increase
- User complaints exceed acceptable levels
- Key success metrics decline
- System reliability decreases

A rollout without rollback criteria increases decision risk.

## 10. Rollout Recommendation Format

The assessment should include:

```text
Solution:
[What is being launched]

Recommended rollout:
[Experiment / Beta / Gradual rollout / Full launch / Delay]

Reason:
[Why this rollout approach is appropriate]

Confidence:
[Low / Medium / High]

Risk:
[Low / Medium / High]

Safeguards:
[Monitoring, limitations, validation steps]

Success signals:
[How we know it is working]

Warning signals:
[How we know it is failing]

Rollback conditions:
[When to reverse the decision]
```

## 11. Human Review

Rollout evaluation is advisory. The final launch decision remains with the responsible human stakeholders.
Always communicate:

- Why the rollout strategy was recommended
- What risks remain
- What assumptions are being tested
- What should be monitored
- Who should approve the rollout

Do not present rollout recommendations as automatic approval.

## Core Principle

The larger the exposure and cost of failure, the stronger the confidence and safeguards required before rollout.

A reversible experiment and a company-wide launch should not require the same level of evidence, confidence, or risk tolerance.
