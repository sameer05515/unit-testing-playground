import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// Import Prism language components
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

// Configure marked with syntax highlighting
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  const language = lang || 'text';
  let grammar = Prism.languages[language];
  
  // Fallback to markup or text if language not found
  if (!grammar) {
    grammar = Prism.languages.markup || Prism.languages.text;
  }
  
  const highlighted = Prism.highlight(text, grammar, language);
  return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export function renderMarkdown(markdown) {
  return marked.parse(markdown);
}

