# Angular Project Setup Instructions

This Angular project requires Angular CLI to run properly. Vite alone cannot compile Angular templates.

## Setup Steps

1. **Install Angular CLI globally** (if not already installed):
```bash
npm install -g @angular/cli
```

2. **Create a new Angular project with CLI**:
```bash
cd ..
ng new md-markdown-viewer-angular-cli --routing --style=css --skip-git
cd md-markdown-viewer-angular-cli
```

3. **Install dependencies**:
```bash
npm install marked prismjs @types/prismjs bootstrap
```

4. **Copy the source files**:
   - Copy `src/app` folder from `md-markdown-viewer-angular` to the new CLI project
   - Copy `src/styles.css` content
   - Copy `index.html` and update it

5. **Update `angular.json`** to include Bootstrap CSS:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/prismjs/themes/prism-tomorrow.min.css",
  "src/styles.css"
]
```

6. **Add proxy configuration** in `angular.json`:
```json
"serve": {
  "options": {
    "proxyConfig": "proxy.conf.json"
  }
}
```

7. **Create `proxy.conf.json`**:
```json
{
  "/api": {
    "target": "http://localhost:3030",
    "secure": false,
    "changeOrigin": true
  }
}
```

8. **Run the application**:
```bash
ng serve
```

The app will be available at `http://localhost:4200`

