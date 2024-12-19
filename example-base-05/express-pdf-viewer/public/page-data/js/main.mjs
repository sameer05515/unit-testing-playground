import { Pages as pages } from "./repository/PageData.repository.mjs";
import registerToggle from "./toggle.mjs";
import renderPages from "./ui.mjs";

document.addEventListener("DOMContentLoaded", function () {
  renderPages(pages);
  registerToggle();
});
