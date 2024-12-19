export const toggleLogic = () => {
  // 🔅 Theme Toggle
  const themeToggle = document.getElementById("toggle-theme");
  const html = document.documentElement;

  if (localStorage.getItem("know-your-potential-theme") === "dark") {
    html.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("know-your-potential-theme", isDark ? "dark" : "light");
  });
};
