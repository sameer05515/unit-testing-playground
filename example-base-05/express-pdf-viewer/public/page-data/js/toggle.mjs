const registerToggle = () => {
  // Dark-Light Mode Toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const ulElement = document.getElementById("nav-links-on-home-page");
  const body = document.body;

  // Function to toggle theme
  function toggleTheme() {
    body.classList.toggle("dark-mode");
    ulElement.classList.toggle("dark-mode-ul"); // Apply dark mode to UL also
    const isDarkMode = body.classList.contains("dark-mode");
    themeToggleBtn.textContent = isDarkMode ? "🌙" : "🌞";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }

  // Check and apply saved theme on page load
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    ulElement.classList.add("dark-mode-ul"); // Apply dark mode to UL
    themeToggleBtn.textContent = "🌙";
  }

  // Event Listener for Toggle Button
  themeToggleBtn.addEventListener("click", toggleTheme);
};

export default registerToggle;
