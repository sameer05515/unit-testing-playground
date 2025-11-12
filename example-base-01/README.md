# Example Base 01

Full-stack sample composed of a minimal Express backend and a React frontend that satisfy the problem statement in `Problem.md`.

## Project Structure
- `backend/` – Express server exposing `/app` and proxying data from `https://dummyjson.com/products`.
- `frontend/` – React single-page app that renders the products supplied by the backend.

## Backend
- **Tech**: Node.js, Express, `request`, `cors`, `nodemon`.
- **Requirements**: Node 18+.
- **Commands**
  - `npm install`
  - `npm start` – launches on `http://localhost:3000`.
- **API**
  - `GET /app` → responds with an array of `{ title, description }`.
- **Testing**: no automated tests are provided.

## Frontend
- **Tech**: React 18, Create React App, Axios, Testing Library.
- **Requirements**: Node 18+, backend running on `http://localhost:3000`.
- **Commands**
  - `npm install`
  - `npm start` – launches the dev server on `http://localhost:3001` (or the next free port).
  - `npm test` – runs the React Testing Library suite.
- **Behavior**
  - Requests data from `http://localhost:3000/app`.
  - Renders each product in a simple card with its title and description.

## Development Notes
- Ensure the backend is running before the frontend dev server, otherwise Axios requests will fail.
- The backend currently relies on the deprecated `request` package; consider swapping to `node-fetch` or `axios` for long-term maintenance.
- There is a mismatch between the backend response (plain array) and the frontend expectation (`{ products: [...] }`). Aligning the contract is required for the UI to display data without adjustments.
- Backend lacks unit tests; expand coverage to validate the transformation and error handling logic.

