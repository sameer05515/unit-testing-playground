# Comics Viewer - Next.js

A Next.js application for viewing comics PDF files with a modern, responsive interface.

## Features

- 📚 Display PDF name and count/total-count in header
- 🎛️ Toggle left sidebar button
- 📋 Display comics name list in left sidebar with search
- 📄 Display comics PDF in right section
- 🔍 Search functionality for comics
- 📅 Sort by name or date (newest/oldest first)
- ⌨️ Keyboard navigation (Arrow keys, Escape)
- 🌙 Dark mode support
- 📱 Responsive design

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn

## Configuration

The comics directory is configured via environment variable. Create a `.env.local` file in the root directory:

**Windows:**
```env
COMICS_DIRECTORY=D:\\Prem\\comics
```

**Linux/Mac:**
```env
COMICS_DIRECTORY=/path/to/comics
```

**Note:** The `.env.local` file is git-ignored and should not be committed to version control. You can copy the example file:

```bash
# Create .env.local file manually with your comics directory path
# Example content:
# COMICS_DIRECTORY=D:\\Prem\\comics
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Create `.env.local` file and configure the comics directory:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your comics directory path
   ```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
comics-viewer-nextjs/
├── app/
│   ├── api/
│   │   ├── comics/
│   │   │   └── route.ts          # API endpoint for fetching comics list
│   │   └── comic-slug/
│   │       └── [slug]/
│   │           └── route.ts      # API endpoint for serving PDF files
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main page component
├── lib/
│   └── comics.ts                # Comics file system operations
├── types/
│   └── comic.ts                  # TypeScript type definitions
├── .env.local.example            # Example environment configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Usage

1. **Toggle Sidebar**: Click the hamburger menu button in the header to show/hide the sidebar
2. **Select Comic**: Click on any comic in the sidebar to view it
3. **Search**: Use the search box in the sidebar to filter comics by name
4. **Sort Comics**: Use the sort dropdown in the sidebar to sort by:
   - Name (A-Z): Alphabetical order
   - Date (Newest First): Most recently modified files first
   - Date (Oldest First): Oldest files first
5. **Keyboard Navigation**:
   - Arrow Up/Down or Left/Right: Navigate through comics
   - Escape: Close sidebar
6. **Dark Mode**: Click the theme toggle button to switch between light and dark modes

## API Endpoints

- `GET /api/comics?sortBy={sortBy}` - Get all comics list
  - Query parameter `sortBy`: `name` (default), `dateDesc` (newest first), `dateAsc` (oldest first)
- `GET /api/comic-slug/{slug}` - Get comic PDF by slug

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: UI library

## Differences from Spring Boot Version

- Uses Next.js App Router instead of Spring Boot
- Client-side rendering with React hooks
- TypeScript for type safety
- Environment variables for configuration
- No server-side templating (pure React components)

## Notes

- The application scans the configured directory and all subdirectories for PDF files
- PDFs are served inline in the browser
- The sidebar is responsive and will overlay on mobile devices
- File sizes are displayed in human-readable format (KB, MB, GB)
- Dates are displayed in relative format (e.g., "Today", "2 days ago")
- Theme preference is saved in localStorage

## Troubleshooting

### Comics not loading
- Check that `COMICS_DIRECTORY` in `.env.local` points to a valid directory
- Ensure the directory contains PDF files
- Check the browser console for errors

### PDFs not displaying
- Verify the file paths are correct
- Check that PDF files are not corrupted
- Ensure the API route is working (check Network tab in browser dev tools)

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check that Node.js version is 18.0 or higher
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## License

MIT
