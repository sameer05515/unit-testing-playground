import { Injectable } from '@angular/core';
import { marked } from 'marked';
import Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  constructor() {
    this.configureMarked();
  }

  private configureMarked(): void {
    const renderer = new marked.Renderer();
    
    renderer.code = ({ text, lang }) => {
      const language = lang || 'text';
      const languages = Prism.languages as any;
      let grammar = languages[language];
      
      if (!grammar) {
        grammar = languages['markup'] || languages['text'];
      }
      
      const highlighted = Prism.highlight(text, grammar, language);
      return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
    };

    marked.setOptions({
      renderer,
      breaks: true,
      gfm: true
    });
  }

  async render(markdown: string): Promise<string> {
    const result = await marked.parse(markdown);
    return typeof result === 'string' ? result : '';
  }
}

