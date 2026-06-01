# quaid-scanner Report: /Users/karstenwade/Projects/AINative-Studio/src/zerodb-nextjs-template

**Score:** 🔴 0.8/10 — CRITICAL risk
**Maturity:** sandbox | **Depth:** standard | **Duration:** 0.1s
**Scanned:** 2026-06-01T21:16:52.008Z

## Pillar Scores

| Pillar | Score | Weight | Findings |
|--------|-------|--------|----------|
| Security | 0.0 | 25% | 0C 22W 1I |
| Governance | 0.0 | 20% | 2C 3W 11I |
| Community | 0.0 | 15% | 0C 4W 8I |
| AI Readiness | 3.5 | 15% | 0C 4W 1I |
| Inclusive Language | 0.0 | 15% | 0C 5W 6I |
| Technical Rigor | 3.0 | 10% | 1C 2W 2I |

## Critical Findings

### license-detection-scanner:missing
**Pillar:** Governance | **Category:** license

No license detected. Without a license, the project is under exclusive copyright by default.

_(source: local file check)_

**Suggestion:** Add a LICENSE file to the repository root. Visit https://choosealicense.com/ for guidance.

**Reference:** https://choosealicense.com/

### vendor-neutrality-critical-concentration
**Pillar:** Governance | **Category:** vendor-neutrality

Project is dominated by ainative.studio (100% of commits)

_(source: computed heuristic)_

**Suggestion:** Diversify contributors across multiple organizations to reduce single-vendor risk

**Reference:** https://chaoss.community/metric-project-sponsorship/

### test-coverage-1
**Pillar:** Technical Rigor | **Category:** test-coverage

No test files detected in the repository

_(source: local file check)_

**Suggestion:** Add a test suite to improve code reliability and enable coverage tracking

**Reference:** https://chaoss.community/metric-test-coverage/

## Warnings

- **[TIMEOUT-binary-artifacts]** Scanner "binary-artifacts" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-dep-pinning-docker]** Scanner "dep-pinning-docker" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[dep-pinning-packages-1]** Loosely pinned dependency "react": "^18.3.1" uses ^ prefix in dependencies *(Consider pinning "react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-2]** Loosely pinned dependency "react-dom": "^18.3.1" uses ^ prefix in dependencies *(Consider pinning "react-dom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-3]** Loosely pinned dependency "next-auth": "^5.0.0-beta.25" uses ^ prefix in dependencies *(Consider pinning "next-auth" to an exact version for reproducible builds)*
- **[dep-pinning-packages-4]** Loosely pinned dependency "ai": "^3.4.33" uses ^ prefix in dependencies *(Consider pinning "ai" to an exact version for reproducible builds)*
- **[dep-pinning-packages-5]** Loosely pinned dependency "@anthropic-ai/sdk": "^0.32.1" uses ^ prefix in dependencies *(Consider pinning "@anthropic-ai/sdk" to an exact version for reproducible builds)*
- **[dep-pinning-packages-6]** Loosely pinned dependency "openai": "^4.67.3" uses ^ prefix in dependencies *(Consider pinning "openai" to an exact version for reproducible builds)*
- **[dep-pinning-packages-7]** Loosely pinned dependency "axios": "^1.7.7" uses ^ prefix in dependencies *(Consider pinning "axios" to an exact version for reproducible builds)*
- **[dep-pinning-packages-8]** Loosely pinned dependency "lucide-react": "^0.460.0" uses ^ prefix in dependencies *(Consider pinning "lucide-react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-9]** Loosely pinned dependency "clsx": "^2.1.1" uses ^ prefix in dependencies *(Consider pinning "clsx" to an exact version for reproducible builds)*
- **[dep-pinning-packages-10]** Loosely pinned dependency "tailwind-merge": "^2.5.4" uses ^ prefix in dependencies *(Consider pinning "tailwind-merge" to an exact version for reproducible builds)*
- **[dep-pinning-packages-11]** Loosely pinned dependency "@types/node": "^20" uses ^ prefix in devDependencies *(Consider pinning "@types/node" to an exact version for reproducible builds)*
- **[dep-pinning-packages-12]** Loosely pinned dependency "@types/react": "^18" uses ^ prefix in devDependencies *(Consider pinning "@types/react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-13]** Loosely pinned dependency "@types/react-dom": "^18" uses ^ prefix in devDependencies *(Consider pinning "@types/react-dom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-14]** Loosely pinned dependency "autoprefixer": "^10.4.20" uses ^ prefix in devDependencies *(Consider pinning "autoprefixer" to an exact version for reproducible builds)*
- **[dep-pinning-packages-15]** Loosely pinned dependency "postcss": "^8.4.47" uses ^ prefix in devDependencies *(Consider pinning "postcss" to an exact version for reproducible builds)*
- **[dep-pinning-packages-16]** Loosely pinned dependency "tailwindcss": "^3.4.14" uses ^ prefix in devDependencies *(Consider pinning "tailwindcss" to an exact version for reproducible builds)*
- **[dep-pinning-packages-17]** Loosely pinned dependency "typescript": "^5" uses ^ prefix in devDependencies *(Consider pinning "typescript" to an exact version for reproducible builds)*
- **[dep-pinning-packages-18]** No package-lock.json found. Lock files ensure reproducible installs *(Run "npm install" to generate a package-lock.json)*
- **[TIMEOUT-openssf-local-checks]** Scanner "openssf-local-checks" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-openssf-scorecard]** Scanner "openssf-scorecard" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-clearly-defined]** Scanner "clearly-defined" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[license-content-validation-1]** No LICENSE file found in repository root *(Add a LICENSE file with a recognized open source license)*
- **[TIMEOUT-license-header-scanner]** Scanner "license-header-scanner" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[contributor-data-1]** 1 unique contributor with 1 commits in the last 12 months *(Single contributor detected — consider recruiting additional maintainers)*
- **[contributor-funnel-2]** Conversion rates: casual→regular 0%, regular→core 0% *(Low casual-to-regular conversion suggests contributor onboarding friction)*
- **[psych-safety-1]** No Code of Conduct found *(Add a CODE_OF_CONDUCT.md — see https://www.contributor-covenant.org/)*
- **[support-channels-1]** No SUPPORT.md or .github/SUPPORT.md found *(Add a SUPPORT.md documenting how users can get help)*
- **[TIMEOUT-ai-repo-detection]** Scanner "ai-repo-detection" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-dataset-provenance]** Scanner "dataset-provenance" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-model-card-detection]** Scanner "model-card-detection" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-model-card-scoring]** Scanner "model-card-scoring" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[AK-PREREQ-MISSING-README.md]** README.md contains tool commands but no Prerequisites or Requirements section *(Consider adding a Prerequisites section listing required tools and versions)*
- **[TIMEOUT-diminishing-language-scanner]** Scanner "diminishing-language-scanner" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-inclusive-code-scanner]** Scanner "inclusive-code-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[TIMEOUT-inclusive-doc-scanner]** Scanner "inclusive-doc-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[TIMEOUT-inclusive-naming-scanner]** Scanner "inclusive-naming-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[interaction-templates-1]** No issue templates configured *(Add .github/ISSUE_TEMPLATE/ with bug report and feature request templates)*
- **[linter-config-1]** No linter configuration found *(Add a linter (ESLint, Prettier, Ruff, golangci-lint, etc.) and configure it to run in CI)*

## Info

- **[branch-protection-1]** GitHub token not provided. Cannot check branch protection settings.
- **[asset-protection-1]** No trademark policy found (optional)
- **[asset-protection-2]** No export control documentation found (optional)
- **[asset-protection-3]** No CLA or DCO requirement detected
- **[asset-protection-4]** Contributor friction level: Low
- **[bus-factor-1]** Bus factor: 1, Elephant factor: 100% (1 contributors, 1 commits in last 12 months)
- **[dep-license-scanning-1]** package.json found but node_modules not installed — cannot scan dependency licenses
- **[governance-classification-1]** No governance model detected — governance files exist but no recognizable model pattern found
- **[governance-detection-1]** No governance documentation found
- **[license-compatibility-1]** Cannot check license compatibility — no LICENSE file found
- **[vendor-neutrality-domain-count]** Found 1 unique email domain(s) across 1 commits
- **[vendor-neutrality-no-succession]** No succession planning documentation found
- **[burnout-detection-1]** Burnout detection requires a GitHub token
- **[contributor-data-2]** Contributor emails span 1 domain
- **[contributor-funnel-1]** Contributor funnel: 0 core, 0 regular, 1 casual (1 total)
- **[funding-1]** No funding infrastructure detected
- **[issue-closure-1]** Issue closure analysis requires a GitHub token
- **[response-classification-1]** Response classification requires a GitHub token
- **[response-time-1]** Response time analysis requires a GitHub token
- **[stale-bot-1]** No stale bot configured
- **[agentic-rules-1]** No AI agent configuration files detected
- **[AK-GIT-CLONE-README.md:36]** Assumed knowledge: "clone" operation used without explanation
- **[AK-GIT-FORK-README.md:173]** Assumed knowledge: "fork" operation used without explanation
- **[AK-TOOL-NPM-README.md:38]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:80]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-ACRONYM-GPT-README.md:13]** Undefined acronym "GPT" may confuse newcomers
- **[AK-ACRONYM-POST-README.md:45]** Undefined acronym "POST" may confuse newcomers
- **[release-cadence-1]** No releases or version tags found
- **[semver-validation-1]** No git tags found — cannot validate SemVer

## Recommendations

- **[HIGH impact / medium effort]** Add a LICENSE file to the repository root. Visit https://choosealicense.com/ for guidance.
  - https://choosealicense.com/
- **[HIGH impact / medium effort]** Diversify contributors across multiple organizations to reduce single-vendor risk
  - https://chaoss.community/metric-project-sponsorship/
- **[HIGH impact / medium effort]** Add a test suite to improve code reliability and enable coverage tracking
  - https://chaoss.community/metric-test-coverage/
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Consider pinning "react" to an exact version for reproducible builds
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Add a LICENSE file with a recognized open source license
- **[MEDIUM impact / low effort]** Single contributor detected — consider recruiting additional maintainers
- **[MEDIUM impact / low effort]** Low casual-to-regular conversion suggests contributor onboarding friction
- **[MEDIUM impact / low effort]** Add a CODE_OF_CONDUCT.md — see https://www.contributor-covenant.org/
- **[MEDIUM impact / low effort]** Add a SUPPORT.md documenting how users can get help
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Consider adding a Prerequisites section listing required tools and versions
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Check scanner implementation for errors
- **[MEDIUM impact / low effort]** Add .github/ISSUE_TEMPLATE/ with bug report and feature request templates
- **[MEDIUM impact / low effort]** Add a linter (ESLint, Prettier, Ruff, golangci-lint, etc.) and configure it to run in CI

## Score Rationale

Overall score is a weighted sum of six pillar scores (each scored 0–10).

| Pillar | Weight | Raw Score | Contribution |
|--------|--------|-----------|-------------|
| Security | 25% | 0.0 | 0.00 |
| Governance | 20% | 0.0 | 0.00 |
| Community | 15% | 0.0 | 0.00 |
| AI Readiness | 15% | 3.5 | 0.53 |
| Inclusive Language | 15% | 0.0 | 0.00 |
| Technical Rigor | 10% | 3.0 | 0.30 |
| **Overall** | **100%** | | **0.80** |

---
*quaid-scanner v0.1.2 | 2026-06-01T21:16:52.008Z*
*Commit: 9dce436f9b0478a8a4a6790597521ba582315b6b*