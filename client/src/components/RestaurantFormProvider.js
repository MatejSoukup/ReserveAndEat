import { createContext, useState } from "react";

// Create a new context for the RestaurantFormProvider
export const RestaurantFormContext = createContext();

function RestaurantFormProvider({ children }) {
 
  function handleCreate(restaurant) {

    fetch("http://localhost:8000/restaurant/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    }).catch((error) => {
        console.log(error)
      });
  }

  // Expose the form state, creation state, and handleCreate function to the context
  const value = {
    handleCreate : handleCreate
  };

  return (
    <RestaurantFormContext.Provider value={value}>
      {children}
    </RestaurantFormContext.Provider>
  );
}

export default RestaurantFormProvider;
