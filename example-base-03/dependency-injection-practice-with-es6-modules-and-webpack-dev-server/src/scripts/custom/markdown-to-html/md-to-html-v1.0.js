import {marked} from 'marked';

// Or if you're including it in your HTML file, you can directly use 'marked'

const markdownText = '# Hello, world!\nThis is **Markdown** text.';
const htmlText = marked(markdownText);
console.log(htmlText);