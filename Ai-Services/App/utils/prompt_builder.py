def build_prompt(query: str, mode: str):

    if mode == "quick":
        return f"""
You are an E-Commerce Intelligence Agent.
Answer briefly and clearly.

User Question:
{query}

Return:
- Key Insight
- 3 Bullet Findings
- Risk Summary
"""

    else:
        return f"""
You are a senior E-Commerce Business Analyst.

Perform deep research analysis.

User Question:
{query}

Return:
1. Executive Summary
2. Market Analysis
3. Competitive Gap
4. Customer Insight
5. Recommendations
6. Risk & Confidence Level
"""
