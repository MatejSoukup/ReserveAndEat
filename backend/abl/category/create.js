const categoryDao = require("../../dao/category/categoryDao")

const dao = new categoryDao()

async function create(res , req){
   await dao.delete("d38861f14ac6f39533b744f007745d8b")
}

create()