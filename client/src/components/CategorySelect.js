// CategoryList.js
import React, { useContext } from "react";
import { CategoryListContext } from "./CategorySelectProvider";

function CategorySelect() {
  const { categories } = useContext(CategoryListContext);

  return (
    <div className="category-select">
      <select name="category" id="category">
        <option value={""}>-</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;