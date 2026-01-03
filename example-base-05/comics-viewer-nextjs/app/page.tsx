'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ComicFile, SortOption } from '@/types/comic';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComic, setSelectedComic] = useState<ComicFile | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [comics, setComics] = useState<ComicFile[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');

  // Filtered comics
  const filteredComics = useMemo(() => {
    return comics.filter((comic) => {
      if (!searchQuery) return true;
      return comic.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [comics, searchQuery]);

  // Select comic
  const selectComic = useCallback((comic: ComicFile, index: number) => {
    setSelectedComic(comic);
    const filtered = comics.filter((c) => {
      if (!searchQuery) return true;
      return c.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const actualIndex = filtered.findIndex((c) => c.path === comic.path);
    setCurrentIndex(actualIndex >= 0 ? actualIndex : index);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('slug', comic.slug);
    router.push(`/?${params.toString()}`);

    // Close sidebar on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [comics, searchQuery, searchParams, router]);

  // Load comics from API
  const loadComics = useCallback(async (sort: SortOption = 'name') => {
    try {
      const response = await fetch(`/api/comics?sortBy=${sort}`);
      const data: ComicFile[] = await response.json();
      setComics(data);

      // If a comic was selected, find it again in the newly sorted list
      if (selectedComic) {
        const comic = data.find((c) => c.slug === selectedComic.slug);
        if (comic) {
          const index = data.indexOf(comic);
          selectComic(comic, index);
        } else {
          setSelectedComic(null);
          setCurrentIndex(-1);
        }
      }
    } catch (error) {
      console.error('Error loading comics:', error);
    }
  }, [selectedComic, selectComic]);

  // Navigation
  const previousComic = useCallback(() => {
    if (filteredComics.length === 0) return;
    let newIndex = currentIndex < 0 ? filteredComics.length - 1 : (currentIndex - 1 + filteredComics.length) % filteredComics.length;
    selectComic(filteredComics[newIndex], newIndex);
  }, [filteredComics, currentIndex, selectComic]);

  const nextComic = useCallback(() => {
    if (filteredComics.length === 0) return;
    let newIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % filteredComics.length;
    selectComic(filteredComics[newIndex], newIndex);
  }, [filteredComics, currentIndex, selectComic]);

  // Apply sort
  const applySort = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', newSort);
    router.push(`/?${params.toString()}`);
    loadComics(newSort);
  }, [searchParams, router, loadComics]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Format size
  const formatSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }, []);

  // Format date
  const formatDate = useCallback((timestamp: number): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    return date.toLocaleDateString();
  }, []);

  // Initialize
  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Get sort preference from URL
    const sortParam = (searchParams.get('sortBy') as SortOption) || 'name';
    setSortBy(sortParam);

    // Load comics
    loadComics(sortParam);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle slug from URL after comics load
  useEffect(() => {
    const slug = searchParams.get('slug');
    if (slug && comics.length > 0 && !selectedComic) {
      const comic = comics.find((c) => c.slug === slug);
      if (comic) {
        const index = comics.indexOf(comic);
        selectComic(comic, index);
      }
    }
  }, [comics, searchParams, selectedComic, selectComic]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextComic();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        previousComic();
      } else if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextComic, previousComic]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50 h-20 transition-colors duration-200">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            {/* Toggle Sidebar Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={previousComic}
              disabled={!selectedComic || filteredComics.length === 0}
              className={`p-2 rounded-md transition-colors text-gray-700 dark:text-gray-200 ${
                !selectedComic || filteredComics.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              aria-label="Previous comic"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextComic}
              disabled={!selectedComic || filteredComics.length === 0}
              className={`p-2 rounded-md transition-colors text-gray-700 dark:text-gray-200 ${
                !selectedComic || filteredComics.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              aria-label="Next comic"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* PDF Name */}
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {selectedComic ? selectedComic.name : 'No comic selected'}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Count Display */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span>{selectedComic && currentIndex >= 0 ? currentIndex + 1 : 0}</span> / <span>{filteredComics.length}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Left Sidebar */}
        <aside
          className={`fixed left-0 top-20 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out z-40 overflow-hidden flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Comics List</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{comics.length} comics found</p>
          </div>

          {/* Search Box and Sort */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search comics..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sortBy" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => applySort(e.target.value as SortOption)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="name">Name (A-Z)</option>
                <option value="dateDesc">Date (Newest First)</option>
                <option value="dateAsc">Date (Oldest First)</option>
              </select>
            </div>
          </div>

          {/* Comics List */}
          <div className="flex-1 overflow-y-auto sidebar-scroll">
            <ul className="p-2">
              {filteredComics.map((comic, index) => (
                <li key={comic.path}>
                  <button
                    onClick={() => selectComic(comic, index)}
                    className={`w-full text-left p-3 rounded-md border-2 transition-colors mb-1 text-gray-800 dark:text-gray-200 ${
                      selectedComic && selectedComic.path === comic.path
                        ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent'
                    }`}
                  >
                    <div className="font-medium">{comic.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{formatSize(comic.size)}</span>
                      {comic.lastModified && <span className="ml-2">{formatDate(comic.lastModified)}</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 ml-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
          <div className="pdf-container">
            {selectedComic ? (
              <iframe
                src={`/api/comic-slug/${selectedComic.slug}`}
                className="w-full h-full border-0"
                frameBorder={0}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <svg className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">Select a comic from the sidebar to view</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
