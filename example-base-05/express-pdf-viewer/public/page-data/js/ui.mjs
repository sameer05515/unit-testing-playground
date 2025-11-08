// Function to generate a single list item
const createListItem = ({ name, link, children, description }) => `
  <li class="list-group-item text-wrap">
    ${link ? `<a href="${link}">${name}</a>` : `<b>${name}</b>`}
    ${description || ""}
    ${children?.length ? createNestedList(children) : ""}
  </li>
`;

// Function to generate a nested list
const createNestedList = (children) => `
  <ul class="list-group ml-2">
    ${generateListItems(children)}
  </ul>
`;

// Function to generate multiple list items
const generateListItems = (pages = []) => pages.map(createListItem).join("");

// Function to render links inside the UL
const renderPages = (pages) => {
  document.getElementById("nav-links-on-home-page").innerHTML = generateListItems(pages);
};

export default renderPages;
