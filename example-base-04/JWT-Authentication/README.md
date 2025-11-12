# JWT Authentication Playground

This project is a small Express playground that illustrates multiple iterations of a JSON Web Token (JWT) authentication server. Each version builds on the previous one to experiment with different folder structures, middleware, and request/response patterns.

## Project Layout

- `src/authServer.js` – a standalone sample server that demonstrates issuing access and refresh tokens without any routing layers.
- `src/versions/1.0.0` – the original single-file server with hard-coded posts and a minimal `/login` route.
- `src/versions/1.0.1` – refactors the server into controllers, routes, and config modules while keeping the same behaviour.
- `src/versions/1.0.2` – prepares the ground for richer response handling and role-based access control with additional middleware and route segregation.
- `src/common` – shared configuration, response helpers, and middleware used by the versioned servers.
- `requests/*.rest` – REST Client request collections (VS Code extension) for exercising the different versions.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root. Substitute secure values if you have them, otherwise these defaults match the ones baked into `src/common/config/config.js`:
   ```bash
   PORT_1_0_0=3000
   PORT_1_0_1=3001
   PORT_1_0_2=3067
   ACCESS_TOKEN_SECRET=matru-ki-bijli-ka-hindola
   REFRESH_TOKEN_SECRET=chutiyon-ki-toli
   ```

3. Launch the version you want to inspect:
   ```bash
   # v1.0.0 single-file server
   npm run devStart:v1.0.0

   # v1.0.1 modularised server
   npm run devStart:v1.0.1

   # v1.0.2 with role-aware routes
   npm run devStart:v1.0.2

   # standalone refresh-token demo
   npm run devStartAuth
   ```

4. Use the corresponding `.rest` file in `requests/` (or any HTTP client) to obtain tokens and call the protected endpoints. The request files show the expected sequence: login → copy `accessToken` → call `/posts` or other protected routes.

## Development Notes

- Environment variables are optional because sensible defaults are provided, but you should still override secrets in real deployments.
- Refresh tokens in `src/authServer.js` are kept in-memory for demonstrative purposes. Persist them in a database or cache if you adapt the code for production.
- Access tokens issued by the sample servers expire quickly (15 seconds) so that you can practise the refresh flow. Adjust the `expiresIn` value inside `generateAccessToken` when experimenting locally.
- Version `1.0.2` contains scaffolding for standardised responses and role-based authorisation. See `src/common/server-responses` and `src/versions/1.0.2/middleware` for the work-in-progress pieces.

## Next Steps & Ideas

- Complete the shared response middleware (`routerResponseHandler`) and apply it across all routes.
- Add automated tests for authentication flows (success, refresh, invalid credentials, expired tokens).
- Replace the placeholder secrets and user store with deterministic fixtures or a lightweight database for more realistic demos.


