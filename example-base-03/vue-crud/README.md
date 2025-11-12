# Vue CRUD Demo

Vue 3 single-page app that consumes the companion Express API (`../nodejs-backend`) to manage an in-memory list of students. It demonstrates simple CRUD flows with the Options API, Axios-powered requests, and a lightweight component structure.

## Getting Started

```powershell
cd vue-crud
npm install
```

### Start the Backend (Required)

The UI expects a REST service at `http://localhost:3000/students`. Use the provided Node backend from this repo:

```powershell
cd ../nodejs-backend
npm install
npm run start
```

Leave the server running, then in another terminal continue with the frontend steps below.

### Run the Vue Dev Server

```powershell
cd vue-crud
npm run serve
```

Vue CLI serves the app at the printed local URL (usually `http://localhost:8080/`) with hot-module reload.

## Available Scripts

- `npm run serve` – Launches the dev server with HMR.
- `npm run build` – Produces a production bundle under `dist/`.
- `npm run lint` – Runs ESLint using the Vue 3 essential preset.

## Feature Tour

- `src/components/StudentComponent.vue` handles listing, adding, editing, and deleting students. Axios calls hit the `/students` endpoints, while local state manages form inputs and edit mode.
- `src/App.vue` simply mounts `StudentComponent` for clarity.
- `src/main.js` wires up the Vue app with the default CLI bootstrap.
- `axios` is the only runtime dependency aside from Vue, keeping the example approachable.

## Customisation Tips

- Update `loadStudents` (and related methods) if your API base URL changes—switch to environment variables or Axios instances for more complex setups.
- Expand the forms with additional fields or validation frameworks as needed.
- Introduce Vuex/Pinia or the Composition API if you want to explore more advanced state management patterns.
