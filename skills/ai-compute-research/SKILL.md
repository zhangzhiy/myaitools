---
name: ai-compute-research
description: Generate and save AI compute investment research notes for sector studies, company studies, company comparisons, and financial-report validation. Use when the user asks to research AI算力/AI compute subsectors such as 光模块, CPO, AI服务器, 液冷, HVDC, AIDC, PCB, 存储芯片, 光芯片, or asks to analyze companies, earnings reports, business validation, industry mapping, or tracking indicators within the AI compute investment chain.
---

# AI Compute Research

Use this skill to produce investment-research notes for the AI compute chain and save the result into the project knowledge base.

## Core Rule

Always save generated research under the concrete subsector directory:

- Sector research: `009AI算力/{细分领域}/`
- Company research: `009AI算力/{所属领域}/`
- Example: 光模块 sector and company notes go under `009AI算力/光模块/`

Create the directory if it does not exist. Use file names in this pattern:

- `YYYY-MM-DD_{细分领域}_细分领域研究.md`
- `YYYY-MM-DD_{细分领域}_深度研究.md`
- `YYYY-MM-DD_{细分领域}_快速入门.md`
- `YYYY-MM-DD_{所属领域}_公司对比.md`
- `YYYY-MM-DD_{公司名称}_公司研究.md`
- `YYYY-MM-DD_{公司名称}_深度公司研究.md`
- `YYYY-MM-DD_{公司名称}_财报验证.md`

Use the current date from the environment unless the user specifies another date.

## Workflow

1. Identify the task type:
   - `sector-standard`: general subsector research.
   - `sector-deep`: deep subsector report.
   - `sector-quick`: beginner-friendly explanation.
   - `sector-compare`: compare multiple AI compute subsectors.
   - `company-standard`: single-company research.
   - `company-deep`: true AI compute beneficiary analysis.
   - `company-compare`: compare multiple companies.
   - `earnings-validation`: validate whether a company's AI compute thesis is showing up in financials.

2. Identify the archive directory:
   - Use the user-provided `{细分领域}` or `{所属领域}`.
   - If the company spans multiple fields, choose the field that matches the user's research question.
   - If the field is missing and cannot be inferred safely, ask one concise clarification question before writing.

3. Load the relevant reference template only when needed:
   - For sector tasks, read `references/sector-prompts.md`.
   - For company tasks or financial-report validation, read `references/company-prompts.md`.

4. Use current, sourced data when the task depends on latest financials, valuation, orders, policies, prices, or management comments.
   - Prefer official company announcements, exchange filings, annual/interim/quarterly reports, and investor-relations records.
   - Mark reporting period and data source.
   - Separate fact, inference, and assumption.

5. Write the research note in Chinese unless the user requests otherwise.
   - Use investment research judgment, not only source restatement.
   - Do not provide direct buy/sell advice.
   - Explicitly list what validates the market thesis and what does not.

6. Save the final note to the target path.
   - Use `apply_patch` for manual file creation or edits.
   - If adding generated content from a command output, still keep file changes scoped to the target note.

7. Reply with:
   - The saved file path.
   - The research period or data date used.
   - Any missing data or follow-up indicators to track.

## Quality Bar

For earnings validation, cover at least:

- Revenue growth and drivers.
- Gross margin and product mix.
- Net profit and recurring profit.
- Operating cash flow versus profit.
- Inventory and possible stocking or slow-moving risk.
- Accounts receivable and collection pressure.
- Capital expenditure and capacity or capability expansion.
- R&D spending and technical upgrade support.
- Management comments about AI compute-related business.
- Data that validates and fails to validate the market logic.

For sector and company research, include:

- Industry-chain position.
- Demand drivers.
- Technology route and replacement risk.
- Business model.
- Competitive landscape.
- Financial characteristics.
- Valuation logic.
- Key tracking indicators.
- Main risks.
