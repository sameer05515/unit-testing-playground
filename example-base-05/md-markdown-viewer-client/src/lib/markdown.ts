import { marked } from 'marked';
import Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';

marked.use({
  renderer: {
    code({ text, lang }) {
      const language = (lang || '').trim().toLowerCase();
      const grammar = Prism.languages[language as keyof typeof Prism.languages] || Prism.languages.markup;
      const highlighted = Prism.highlight(text, grammar, language);
      const languageClass = language ? `language-${language}` : 'language-plaintext';
      return `<pre class="${languageClass}"><code class="${languageClass}">${highlighted}</code></pre>`;
    }
  }
});

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown) as string;
}

