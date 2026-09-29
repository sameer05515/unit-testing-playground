# Markdown to PDF Converter

A simple **Node.js application** that converts a Markdown (`.md`) file into a PDF file.

The application uses:

* **Node.js** — Application runtime
* **Marked** — Converts Markdown to HTML
* **Puppeteer** — Generates PDF from HTML
* **Chrome/Chromium** — PDF rendering engine

---

## Features

* Convert Markdown files to PDF
* A4 PDF format
* Automatic page numbering
* Support for:

  * Headings
  * Paragraphs
  * Bold and italic text
  * Ordered and unordered lists
  * Links
  * Tables
  * Blockquotes
  * Inline code
  * Code blocks
  * Images
* Print-friendly styling
* Command-line support
* Custom input and output filenames

---

## Project Structure

```text
md-to-pdf/
│
├── input.md
├── md-to-pdf.js
├── package.json
├── package-lock.json
├── output.pdf
└── node_modules/
```

---

## Prerequisites

Make sure the following are installed:

### Node.js

Check the installed version:

```bash
node --version
```

Example:

```text
v22.x.x
```

### npm

```bash
npm --version
```

---

## Installation

Clone or create the project:

```bash
mkdir md-to-pdf
cd md-to-pdf
```

Initialize the Node.js project:

```bash
npm init -y
```

Install dependencies:

```bash
npm install marked puppeteer
```

---

## Puppeteer Chrome Installation

Puppeteer requires a compatible Chrome browser.

Install the Chrome browser used by Puppeteer:

```bash
npx puppeteer browsers install chrome
```

You can verify the installed browser:

```bash
npx puppeteer browsers list
```

---

## Usage

### Basic Usage

Create a Markdown file named:

```text
input.md
```

Then execute:

```bash
node md-to-pdf.js
```

The application will generate:

```text
output.pdf
```

---

### Specify Input and Output Files

You can provide both filenames:

```bash
node md-to-pdf.js input.md output.pdf
```

Example:

```bash
node md-to-pdf.js README.md documentation.pdf
```

This will convert:

```text
README.md
```

into:

```text
documentation.pdf
```

---

## npm Script

Add the following script to `package.json`:

```json
{
  "scripts": {
    "pdf": "node md-to-pdf.js"
  }
}
```

Then execute:

```bash
npm run pdf -- input.md output.pdf
```

Example:

```bash
npm run pdf -- README.md documentation.pdf
```

---

## Sample Markdown

Create an `input.md` file:

````markdown
# My Document

This is a **Markdown** document converted into PDF.

## Technologies

- Node.js
- Java
- Spring Boot
- React
- Angular

## Code Example

```java
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
````

## Table

| Technology | Type     |
| ---------- | -------- |
| Java       | Backend  |
| React      | Frontend |
| Node.js    | Backend  |
| Angular    | Frontend |

## Conclusion

This Markdown file has been converted into a PDF.

````

Run:

```bash
npm run pdf -- input.md output.pdf
````

---

## How It Works

The application follows this flow:

```text
             input.md
                |
                v
        Read Markdown File
                |
                v
             marked
                |
                v
        Markdown → HTML
                |
                v
            Puppeteer
                |
                v
       Chrome / Chromium
                |
                v
            output.pdf
```

### Step 1 — Read Markdown

Node.js reads the Markdown file using the filesystem API:

```javascript
const markdown = fs.readFileSync(inputFile, "utf8");
```

### Step 2 — Convert Markdown to HTML

`marked` converts Markdown into HTML:

```javascript
const htmlContent = marked.parse(markdown);
```

### Step 3 — Generate Complete HTML

The generated HTML is wrapped inside a complete HTML document with CSS:

```javascript
const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* PDF styles */
    </style>
</head>
<body>

${htmlContent}

</body>
</html>
`;
```

### Step 4 — Generate PDF

Puppeteer loads the HTML:

```javascript
await page.setContent(html, {
    waitUntil: "networkidle0"
});
```

Then generates the PDF:

```javascript
await page.pdf({
    path: outputFile,
    format: "A4",
    printBackground: true
});
```

---

## Page Numbers

The generated PDF contains page numbers using Puppeteer's header/footer functionality:

```javascript
footerTemplate: `
    <div style="
        font-size: 9px;
        width: 100%;
        text-align: center;
        color: #777;
    ">
        Page <span class="pageNumber"></span>
        of <span class="totalPages"></span>
    </div>
`
```

The output looks like:

```text
                 Page 1 of 5
```

---

## PDF Configuration

The PDF uses A4 paper:

```javascript
format: "A4"
```

Print backgrounds:

```javascript
printBackground: true
```

Margins:

```javascript
margin: {
    top: "25mm",
    right: "20mm",
    bottom: "25mm",
    left: "20mm"
}
```

---

## Error Handling

If the input Markdown file does not exist:

```text
Error: Markdown file not found: input.md
```

Make sure the file exists in the current directory or provide the complete path.

Example:

```bash
node md-to-pdf.js "E:\documents\input.md" "E:\documents\output.pdf"
```

---

## Windows Example

PowerShell:

```powershell
cd E:\GIT\unit-testing-playground\example-base-13\md-to-pdf

npm install

npx puppeteer browsers install chrome

npm run pdf -- input.md output.pdf
```

Expected output:

```text
PDF created successfully: E:\GIT\unit-testing-playground\example-base-13\md-to-pdf\output.pdf
```

---

## Dependencies

### marked

Markdown parser:

```bash
npm install marked
```

### puppeteer

Browser automation and PDF generation:

```bash
npm install puppeteer
```

---

## package.json

Example:

```json
{
  "name": "md-to-pdf",
  "version": "1.0.0",
  "description": "Convert Markdown files to PDF using Node.js, Marked and Puppeteer",
  "main": "md-to-pdf.js",
  "scripts": {
    "pdf": "node md-to-pdf.js"
  },
  "dependencies": {
    "marked": "^16.0.0",
    "puppeteer": "^24.0.0"
  }
}
```

> Dependency versions may differ depending on when `npm install` is executed.

---

## Troubleshooting

### 1. Chrome not found

If you see:

```text
Error: Could not find Chrome
```

Run:

```bash
npx puppeteer browsers install chrome
```

Then execute:

```bash
npm run pdf -- input.md output.pdf
```

---

### 2. Input file not found

If you see:

```text
Error: Markdown file not found
```

Check the filename:

```bash
dir
```

Make sure the Markdown file exists:

```text
input.md
```

Or provide the full path:

```bash
node md-to-pdf.js "C:\documents\input.md" "C:\documents\output.pdf"
```

---

### 3. Puppeteer installation issue

Reinstall dependencies:

```bash
rm -rf node_modules
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
```

Then:

```bash
npm install
```

Install Chrome again:

```bash
npx puppeteer browsers install chrome
```

---

## Future Enhancements

Possible improvements:

* Custom CSS file support
* Custom page size
* Landscape PDF
* Table of contents
* Syntax highlighting
* Mermaid diagram support
* Header/footer customization
* Custom fonts
* Cover page
* PDF metadata
* Multiple Markdown files → single PDF
* Markdown folder → PDF
* REST API
* Web UI
* Docker support

---

## License

This project is intended for learning and development purposes.
