const fs = require("fs");
const path = require("path");

async function list(req, res) {
  try {
    const roleList = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, "../storage/role.json")
      )
    );
    res.json(roleList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getById(req, res) {
  try {
    const roleList = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, "../storage/role.json")
      )
    );

    const id = parseInt(req.query.id);
    const role = roleList.find(cat => cat.id === id)
    console.log(role, id )
    res.json(role);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {list, getById }