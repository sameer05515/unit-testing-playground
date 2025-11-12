# build-tree-api

Express + EJS playground that wraps the `buildTree` indentation utility in both HTML and JSON interfaces.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server (with auto-reload) or start in production mode:
   ```bash
   npm run dev
   # or
   npm start
   ```
3. Open `http://localhost:3000` and paste an indented outline. Submit the form to render the tree on the page or use the “Call JSON API” button to inspect the REST response.

## API

`POST /api/build-tree`

```json
{
  "textInput": "Root\n    Child\n        Grandchild"
}
```

Response mirrors the utility output:

```json
{
  "isValid": true,
  "errorCode": "SUCCESS",
  "message": "Success",
  "data": [
    {
      "name": "Root",
      "level": 0,
      "children": [
        {
          "name": "Child",
          "level": 1,
          "children": [
            {
              "name": "Grandchild",
              "level": 2,
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
```

If validation fails, `isValid` becomes `false` and the `errorCode/message` fields contain the reason (empty input, inconsistent indentation, etc.).

## Project Structure

- `server.js`: Express setup, routes, and view wiring.
- `views/`: EJS templates for the playground UI and 404 page.
- `public/`: Static assets (currently a single stylesheet).
- `src/text-indentation/`: Copied utilities (`buildTree`, `parse-lines`, `validate`, `error-codes`) shared with the playground form and API.

## Notes

- The service depends on Node.js 18+ (see `package.json` engines field).
- Use `npm run dev` during development to benefit from nodemon reloads. `npm start` runs the same server without reload support.

