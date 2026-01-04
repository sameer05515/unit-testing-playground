# SOLID Principles Catalog

A beautiful, interactive catalog of SOLID principles built with HTML, Alpine.js, and Bootstrap 5.

## Features

- 📋 View all 5 SOLID principles with detailed information
- 🔍 Search principles by name, acronym, definition, or problem solved
- 🎨 Dark/Light theme toggle
- 📱 Responsive design for all devices
- 💡 Bad vs Good code examples
- ✨ Modern UI with Bootstrap 5

## SOLID Principles

- **S** - Single Responsibility Principle
- **O** - Open/Closed Principle
- **L** - Liskov Substitution Principle
- **I** - Interface Segregation Principle
- **D** - Dependency Inversion Principle

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Server

Start the HTTP server:

```bash
npm start
```

This will:
- Start the server on port 8083
- Automatically open your browser to `http://localhost:8083`

### Other Commands

- `npm run serve` - Start server without opening browser
- `npm run dev` - Start server with cache disabled (useful for development)

## Project Structure

```
solid-principles/
├── index.html        # Main HTML file
├── principles.json   # SOLID principles data
├── package.json      # Node.js dependencies
└── README.md         # This file
```

## Technologies Used

- **Alpine.js** - Lightweight JavaScript framework
- **Bootstrap 5** - CSS framework
- **http-server** - Simple HTTP server for development

## Features in Detail

- **Principle Cards**: Each principle displayed in a card with acronym badge, definition, problem solved, and benefits
- **Search**: Real-time search across all principle fields
- **Theme Toggle**: Switch between light and dark modes with persistent preference
- **Detailed Modal**: Click "View Details" to see full information including bad vs good code examples
- **Metadata Display**: Shows category, acronym, and technologies where SOLID is used

