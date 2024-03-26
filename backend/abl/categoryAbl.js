const fs = require("fs");
const path = require("path");

async function list(req, res) {
  try {
    const categoryList = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, "../storage/category.json")
      )
    );
    res.json(categoryList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getById(req, res) {
  try {
    const categoryList = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, "../storage/category.json")
      )
    );

    const id = parseInt(req.query.id);
    const category = categoryList.find(cat => cat.id === id)
    console.log(category, id )
    res.json(category);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
  

module.exports = {list, getById}