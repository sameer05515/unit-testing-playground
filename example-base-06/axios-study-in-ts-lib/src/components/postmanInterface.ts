import { ApiClient, RequestConfig, ApiResponse, ApiError } from '../lib/apiClient';

export class PostmanInterface {
  private apiClient: ApiClient;
  private methodSelect: HTMLSelectElement;
  private urlInput: HTMLInputElement;
  private sendButton: HTMLButtonElement;
  private headersContainer: HTMLDivElement;
  private bodyTextarea: HTMLTextAreaElement;
  private responseContainer: HTMLDivElement;
  private statusElement: HTMLDivElement;
  private timeElement: HTMLDivElement;
  private responseHeadersElement: HTMLDivElement;
  private responseBodyElement: HTMLPreElement;

  constructor() {
    this.apiClient = new ApiClient();
    this.initializeUI();
    this.attachEventListeners();
  }

  private initializeUI(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    app.innerHTML = `
      <div class="postman-container">
        <header class="postman-header">
          <h1>🚀 API Client (Postman-like)</h1>
          <p class="subtitle">Test your APIs with Axios</p>
        </header>
        
        <div class="postman-main">
          <div class="request-panel">
            <div class="request-controls">
              <select id="method-select" class="method-select">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <input 
                type="text" 
                id="url-input" 
                class="url-input" 
                placeholder="Enter API URL (e.g., https://api.example.com/users)"
                value="http://localhost:8080/api/nodes"
              />
              <button id="send-button" class="send-button">Send</button>
            </div>

            <div class="tabs">
              <button class="tab-button active" data-tab="headers">Headers</button>
              <button class="tab-button" data-tab="body">Body</button>
            </div>

            <div class="tab-content">
              <div id="headers-tab" class="tab-pane active">
                <div id="headers-container" class="key-value-container">
                  <div class="key-value-row">
                    <input type="text" class="key-input" placeholder="Header name" value="Content-Type" />
                    <input type="text" class="value-input" placeholder="Header value" value="application/json" />
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                  </div>
                </div>
                <button id="add-header-btn" class="add-btn">+ Add Header</button>
              </div>

              <div id="body-tab" class="tab-pane">
                <textarea 
                  id="body-textarea" 
                  class="body-textarea" 
                  placeholder='Enter request body (JSON format, e.g., {"key": "value"})'
                ></textarea>
              </div>
            </div>
          </div>

          <div class="response-panel">
            <div class="response-header">
              <h2>Response</h2>
              <div class="response-meta">
                <span id="status-element" class="status-badge">-</span>
                <span id="time-element" class="time-badge">-</span>
              </div>
            </div>
            
            <div class="response-tabs">
              <button class="response-tab-button active" data-response-tab="body">Body</button>
              <button class="response-tab-button" data-response-tab="headers">Headers</button>
            </div>

            <div class="response-content">
              <div id="response-body-tab" class="response-tab-pane active">
                <pre id="response-body-element" class="response-body">No response yet. Click Send to make a request.</pre>
              </div>
              
              <div id="response-headers-tab" class="response-tab-pane">
                <pre id="response-headers-element" class="response-headers">No headers yet.</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Get references to elements
    this.methodSelect = document.getElementById('method-select') as HTMLSelectElement;
    this.urlInput = document.getElementById('url-input') as HTMLInputElement;
    this.sendButton = document.getElementById('send-button') as HTMLButtonElement;
    this.headersContainer = document.getElementById('headers-container') as HTMLDivElement;
    this.bodyTextarea = document.getElementById('body-textarea') as HTMLTextAreaElement;
    this.responseContainer = document.querySelector('.response-panel') as HTMLDivElement;
    this.statusElement = document.getElementById('status-element') as HTMLDivElement;
    this.timeElement = document.getElementById('time-element') as HTMLDivElement;
    this.responseHeadersElement = document.getElementById('response-headers-element') as HTMLPreElement;
    this.responseBodyElement = document.getElementById('response-body-element') as HTMLPreElement;
  }

  private attachEventListeners(): void {
    // Send button
    this.sendButton.addEventListener('click', () => this.handleSendRequest());

    // Add header button
    const addHeaderBtn = document.getElementById('add-header-btn')!;
    addHeaderBtn.addEventListener('click', () => this.addHeaderRow());

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tabName = target.dataset.tab!;
        this.switchTab(tabName);
      });
    });

    // Response tab switching
    const responseTabButtons = document.querySelectorAll('.response-tab-button');
    responseTabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tabName = target.dataset.responseTab!;
        this.switchResponseTab(tabName);
      });
    });

    // Enter key to send
    this.urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSendRequest();
      }
    });
  }

  private addHeaderRow(): void {
    const row = document.createElement('div');
    row.className = 'key-value-row';
    row.innerHTML = `
      <input type="text" class="key-input" placeholder="Header name" />
      <input type="text" class="value-input" placeholder="Header value" />
      <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
    `;
    this.headersContainer.appendChild(row);
  }

  private switchTab(tabName: string): void {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    document.getElementById(`${tabName}-tab`)?.classList.add('active');
  }

  private switchResponseTab(tabName: string): void {
    document.querySelectorAll('.response-tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.response-tab-pane').forEach(pane => pane.classList.remove('active'));
    
    document.querySelector(`[data-response-tab="${tabName}"]`)?.classList.add('active');
    document.getElementById(`response-${tabName}-tab`)?.classList.add('active');
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    const rows = this.headersContainer.querySelectorAll('.key-value-row');
    
    rows.forEach(row => {
      const keyInput = row.querySelector('.key-input') as HTMLInputElement;
      const valueInput = row.querySelector('.value-input') as HTMLInputElement;
      
      if (keyInput.value.trim() && valueInput.value.trim()) {
        headers[keyInput.value.trim()] = valueInput.value.trim();
      }
    });
    
    return headers;
  }

  private async handleSendRequest(): Promise<void> {
    const url = this.urlInput.value.trim();
    
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    // Disable send button and show loading
    this.sendButton.disabled = true;
    this.sendButton.textContent = 'Sending...';
    this.responseBodyElement.textContent = 'Loading...';

    try {
      const config: RequestConfig = {
        method: this.methodSelect.value as any,
        url: url,
        headers: this.getHeaders(),
        body: this.bodyTextarea.value.trim() || undefined,
      };

      const result = await this.apiClient.sendRequest(config);

      if ('status' in result) {
        // Success response
        this.displayResponse(result as ApiResponse);
      } else {
        // Error response
        this.displayError(result as ApiError);
      }
    } catch (error) {
      this.displayError({
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        isAxiosError: false,
      });
    } finally {
      this.sendButton.disabled = false;
      this.sendButton.textContent = 'Send';
    }
  }

  private displayResponse(response: ApiResponse): void {
    this.statusElement.textContent = `${response.status} ${response.statusText}`;
    this.statusElement.className = `status-badge status-${this.getStatusClass(response.status)}`;
    this.timeElement.textContent = `${response.time}ms`;

    // Format response body
    try {
      this.responseBodyElement.textContent = JSON.stringify(response.data, null, 2);
    } catch (e) {
      this.responseBodyElement.textContent = String(response.data);
    }

    // Format response headers
    this.responseHeadersElement.textContent = JSON.stringify(response.headers, null, 2);
  }

  private displayError(error: ApiError): void {
    if (error.status) {
      this.statusElement.textContent = `${error.status} ${error.statusText || 'Error'}`;
      this.statusElement.className = `status-badge status-error`;
    } else {
      this.statusElement.textContent = 'Error';
      this.statusElement.className = 'status-badge status-error';
    }

    if (error.time) {
      this.timeElement.textContent = `${error.time}ms`;
    } else {
      this.timeElement.textContent = '-';
    }

    // Format error response
    const errorData: any = {
      message: error.message,
      ...(error.data && { data: error.data }),
    };

    this.responseBodyElement.textContent = JSON.stringify(errorData, null, 2);
    
    if (error.headers) {
      this.responseHeadersElement.textContent = JSON.stringify(error.headers, null, 2);
    } else {
      this.responseHeadersElement.textContent = 'No headers';
    }
  }

  private getStatusClass(status: number): string {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 300 && status < 400) return 'redirect';
    if (status >= 400 && status < 500) return 'client-error';
    if (status >= 500) return 'server-error';
    return 'unknown';
  }
}
