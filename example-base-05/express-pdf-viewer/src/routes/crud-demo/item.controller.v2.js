const Item = require("./Item.model.v2");

let items = [
  new Item("Item 1", "This is item 1"),
  new Item("Item 2", "This is item 2"),
];

// Show List
exports.getAllItems = (req, res) => {
  res.render("crud-demo/v2.ejs", { items });
};

// Add Item
exports.addItem = (req, res) => {
  const { name, description } = req.body;
  items.push(new Item(name, description));
  res.redirect("/crud-demo/");
};

// Update Item
exports.updateItem = (req, res) => {
  const { uniqueId, name, description } = req.body;
  items = items.map(item => item.uniqueId === uniqueId ? { uniqueId, name, description } : item);
  res.redirect("/crud-demo/");
};

// Delete Item
exports.deleteItem = (req, res) => {
  const { uniqueId } = req.body;
  items = items.filter(item => item.uniqueId !== uniqueId);
  res.redirect("/crud-demo/");
};
