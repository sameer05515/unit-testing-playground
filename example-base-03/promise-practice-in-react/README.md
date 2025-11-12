# Promise Practice (React Edition)

React playground that mirrors the vanilla Promise demos found in `../promise-practice`, but rebuilt with modern React tooling. The app lets you browse Promise exercises, simulated APIs, and moment.js utilities by picking routes from a dropdown. Each example focuses on a different pattern: simple `useState` flows, reducer-driven state machines, chained async work, error handling, and data visualisation.

## Quick Start

```powershell
cd promise-practice-in-react
npm install
npm start
```

The development server runs on `http://localhost:3000`. Saving changes hot-reloads the browser.

## Project Overview

- `src/utils/promises.js` wraps a static employee dataset with Promise-based APIs (`fetchUsers`, `fetchUserDetailsForEmpCode`, `fetchUserAttendanceForDateRange`). Each call is randomized with configurable latency and success/failure probabilities.
- `src/utils/router-constants.js` holds the entire route tree. `generateRoutes()` turns that config into `<Routes>` elements so new demos can be registered in one place.
- `src/common/CustomSelect.jsx` renders a select control backed by the route config. Changing the selection triggers a `useNavigate` to the corresponding demo.
- `src/common/ContainerComponent.jsx` is a layout primitive that supplies header/left/right/footer regions used across demos.
- `src/components/sub-components/PromisePractice*.jsx` showcase different Promise techniques:
  - **PromisePractice1** – basic `useState` loading/error flows.
  - **PromisePractice2** – consolidated status/message reducer plus styling via `PROMISE_STATUS_CONSTANTS`.
  - **PromisePracticeWithReducer** – full `useReducer` for Promise state transitions.
  - **PromisePractice3** – sequential Promises with chained `.then()` calls fetching user lists and details.
  - **PromisePractice4** – similar chain built around `Promise.resolve()` for improved readability and error propagation.
  - **PromisePractice5** – extends the chain to a third async call producing attendance data and rendering tabular results.
- `src/components/sub-components/MomentUsageBasicExamples.jsx` contains companion demos that exercise moment.js for date generation, input-driven ranges, and synthetic attendance flags.

## Routing & Navigation

Routes are generated from `routeConfig`:

- `/` loads the `Parent` container, which displays the select box and renders child routes inside its footer via `<Outlet />`.
- Child routes map to each Promise and Date demo. Toggle `displayInCombo` to control which options show up in the dropdown.
- An inline `NotFound` component handles unmatched routes with a simple back button.

To add a new exercise:

1. Create the component under `src/components/sub-components/YourDemo.jsx`.
2. Register it in `componentMap` and a `routeConfig` entry (set `displayInCombo: true` to expose it in the select).

## Promise Simulation Controls

Inside `src/utils/promises.js`:

- `SKIP_SIMULATION` forces every Promise to resolve for deterministic demos.
- `DEFAULT_THRESHOLD`, `MIN_TIMEOUT_IN_MS`, `MAX_TIMEOUT_IN_MS`, and the `timeoutInMS` argument let you tune success odds and artificial latency per call.
- Helpers such as `generateEmployeeAttendanceData` and `generateDateRange` supply realistic payloads without a backend dependency.

## Testing & Production Builds

- `npm test` runs CRA's Jest setup (React Testing Library is pre-configured, though no custom specs ship with the project yet).
- `npm run build` bundles the app for production.
- `npm run eject` exposes the underlying CRA configuration (irreversible).

## Tips

- Open the browser console when running sequential demos (especially `PromisePractice4`/`5`) to see the detailed logging each step emits.
- The moment-based demos accept `DD/MMM/YYYY` formatted strings. Extend the validation logic in `DateRangeComponentV2/V3` if you need stricter parsing or locale support.
- Because all data is simulated locally, the app runs offline. Swap the Promise helpers with real API calls when you are ready to integrate with a backend.
