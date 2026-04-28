# Couchify Ecosystem Repository Registry

**Owner:** Joseph Skrobynets / overandor  
**Date:** 2026-04-28  
**Status:** Repository split plan and creation queue  

## Purpose

This registry defines the separate repositories that should exist around the Couchify ecosystem. It turns the current monolithic concept stack into a portfolio of focused, appraisable, buildable software and research assets.

The current GitHub connector can write files and issues inside existing repositories, but it does not expose a direct create-repository action. This file is therefore the canonical repo-creation manifest. It can be executed manually through GitHub, GitHub CLI, Codex, or another authenticated repository-creation workflow.

## Repository Map

| Proposed Repo | Role | Initial Contents | Status |
|---|---|---|---|
| `Couchify` | Parent product and marketplace narrative | Manifesto, API docs, development history | Exists |
| `couchos-seatos` | Seat operating system for creator sessions | Booking/session flow, privacy modes, artifact export | To create |
| `ai-witness-node` | Consent-based room witnessing | Session capture policy, consent states, proof records | To create |
| `couchify-idea-economy` | Licensing and contribution economy | Consent licenses, attribution, reward model | To create |
| `maximum-expressed-value` | Human MEV framework | MEV definitions, value-node protocol, scoring | To create |
| `words-to-gdp` | Prompt/session economic measurement | Word Contribution Unit, prompt-GDP pipeline, calculators | To create |
| `joseph-operator-premium` | Personal operator benchmark | Benchmark packets, scoring rubrics, service packages | To create |
| `cognitive-operator-protocols` | Persona/protocol marketplace | Persona specs, yield scoring, task-class benchmarks | To create |
| `semantic-protocol-runtime` | Typed intent and policy-aware planning | Runtime prototype, OpenAPI spec, lowering docs | To create |
| `local-compute-node-network` | Local device/node protocol | Node registry, consent API, artifact manifest API | To create |
| `valueleak-os` | Productization engine for messy artifacts | Value leak scoring, artifact packaging, monetization templates | To create |
| `truth-graded-memory` | Evidence and provenance scoring | Claim scoring, contradiction risk, proof manifests | To create |
| `gas-memory-collateral` | On-chain cost memory collateral | Existing Solana/IPFS provenance engine | Exists separately |

## Suggested Creation Order

1. `couchos-seatos`
2. `ai-witness-node`
3. `semantic-protocol-runtime`
4. `local-compute-node-network`
5. `words-to-gdp`
6. `joseph-operator-premium`
7. `cognitive-operator-protocols`
8. `couchify-idea-economy`
9. `maximum-expressed-value`
10. `valueleak-os`
11. `truth-graded-memory`

## Standard Repo Skeleton

Each repo should start with:

```text
README.md
PROJECT_OVERVIEW.md
ROADMAP.md
docs/
  ARCHITECTURE.md
  DEVELOPMENT_HISTORY.md
  SAFETY_AND_CONSENT.md
examples/
  sample_manifest.json
.meta/
  repo_manifest.json
```

## Standard README Fields

Each repository should answer:

- What is this system?
- What problem does it solve?
- How does it connect to Couchify?
- What is the MVP?
- What are the safety boundaries?
- What artifacts does it produce?
- What is the next build step?

## Portfolio Logic

The purpose of splitting the ecosystem into multiple repos is to make each concept independently legible, appraisable, and sellable while preserving a parent system map.

Couchify remains the parent product narrative.

The sub-repos become modular proof assets:

- product layer;
- protocol layer;
- consent layer;
- local compute layer;
- measurement layer;
- operator benchmark layer;
- provenance layer.

## Immediate Next Action

Create each repository under `overandor`, then copy the matching section from this registry into the new repo's first README.
