# Couchify Semantic API Docs

This folder documents the Couchify local-first semantic protocol layer.

## Purpose

Couchify turns a consented physical seat, laptop, phone, or room node into an artifact-producing AI workspace.

The API is designed around:

- local node registration;
- explicit consent state;
- typed semantic intent;
- policy validation;
- dry-run planning;
- artifact generation;
- proof manifests;
- development-history logging.

## Semantic Protocol Anchor

The Semantic Protocol Runtime package frames the deeper architecture: users author typed intent, the runtime parses it into internal structure, verifies policies, plans legal runtime paths, and lowers work into supported backends.

For Couchify, that means a session can move from human intent to an artifact bundle without treating the LLM as the source of truth. The LLM assists with interpretation and ranking, while the protocol preserves declared effects, policy checks, and auditable output.

## Public API files

- `openapi-lite.json` — minimal machine-readable API surface.
- `swagger-ui.html` — local Swagger UI wrapper. Open it in a browser after cloning the repo.

## Local docs usage

Open `swagger-ui.html` from this folder, or serve the repository locally and point Swagger UI at `openapi-lite.json`.

## Safety boundary

This API is for user-owned or explicitly authorized devices only. Every capture, artifact, and sharing mode must be consented and reviewable. The public version avoids unsafe remote-control claims and focuses on local creator workflows, proof artifacts, and policy-governed semantic work.
