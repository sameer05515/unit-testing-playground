
//### 3. `md-to-pdf.js`


const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const puppeteer = require("puppeteer");

async function convertMarkdownToPdf(inputFile, outputFile) {

    if (!fs.existsSync(inputFile)) {
        throw new Error(`Markdown file not found: ${inputFile}`);
    }

    // Read Markdown
    const markdown = fs.readFileSync(inputFile, "utf8");

    // Convert Markdown -> HTML
    const htmlContent = marked.parse(markdown);

    // Complete HTML document
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <style>
        @page {
            size: A4;
            margin: 25mm 20mm 25mm 20mm;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #222;
        }

        h1 {
            font-size: 28px;
            border-bottom: 2px solid #333;
            padding-bottom: 8px;
        }

        h2 {
            font-size: 22px;
            margin-top: 30px;
        }

        h3 {
            font-size: 18px;
            margin-top: 25px;
        }

        p {
            margin: 10px 0;
        }

        ul, ol {
            margin: 10px 0 10px 25px;
        }

        blockquote {
            border-left: 4px solid #999;
            padding-left: 15px;
            color: #555;
            margin-left: 0;
        }

        code {
            background: #f4f4f4;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: Consolas, monospace;
        }

        pre {
            background: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        pre code {
            background: none;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }

        th {
            background: #eee;
        }

        img {
            max-width: 100%;
        }

        a {
            color: #0645ad;
            text-decoration: none;
        }
    </style>
</head>

<body>

${htmlContent}

</body>
</html>
`;

    // Start browser
    const browser = await puppeteer.launch({
        headless: true
    });

    try {

        const page = await browser.newPage();

        // Load generated HTML
        await page.setContent(html, {
            waitUntil: "networkidle0"
        });

        // Generate PDF
        await page.pdf({
            path: outputFile,
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,

            headerTemplate: `
                <div></div>
            `,

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
            `,

            margin: {
                top: "25mm",
                right: "20mm",
                bottom: "25mm",
                left: "20mm"
            }
        });

        console.log(`PDF created successfully: ${outputFile}`);

    } finally {
        await browser.close();
    }
}


// --------------------------------------------------
// Command line arguments
// --------------------------------------------------

const inputFile = process.argv[2] || "input.md";
const outputFile = process.argv[3] || "output.pdf";

convertMarkdownToPdf(
    path.resolve(inputFile),
    path.resolve(outputFile)
)
.catch(error => {
    console.error("Error:", error.message);
    process.exit(1);
});