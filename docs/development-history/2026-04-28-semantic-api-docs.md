# 2026-04-28 — Semantic API Docs and Local Compute Network Direction

## System

Couchify / CouchOS / Semantic Protocol Runtime

## What changed

A public-safe API documentation layer was added for the Couchify local-first semantic protocol concept.

## Files added

- `docs/api/README.md`
- `docs/api/openapi-lite.json`
- `docs/api/swagger-ui.html`
- `docs/development-history/README.md`
- `docs/development-history/2026-04-28-semantic-api-docs.md`

## Decision

The API docs should describe Couchify as a consent-first local creator-node network. The public interface focuses on typed intent, consent state, policy validation, planning, artifacts, proof manifests, and development-history events.

## Semantic Protocol connection

The Semantic Protocol Runtime package frames the system as typed intent lowered into policy-aware runtime plans. In Couchify, that becomes the layer that turns a human session into a verified artifact bundle without treating the LLM as the source of truth.

## Safety boundary

The public API documentation avoids unsafe remote-control framing. It is limited to authorized local devices, consented sessions, artifact packaging, and proof records.

## Next build

Build a minimal local FastAPI service that serves the OpenAPI document, exposes `/v1/health`, validates a sample semantic intent, and writes a development-history event to disk.
