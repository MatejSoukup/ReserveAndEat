import { useEffect, useState } from "react";
import { RestaurantListContext } from "./RestaurantListContex";

function RestaurantListProvider({ children }) {
  const [restaurantListDto, setRestaurantListDto] = useState({
    state: "ready",
    data: [],
  });
  const [filters, setFilters] = useState({
    userId : "",
    categoryId : "",
    city : ""
})

  useEffect(() => {
    handleLoad()
  }, [filters]);

  const value = {
    restaurantList: restaurantListDto.data || [],
    handlerMap:{
    setFilters : setFilters
    },
  };

  function handleLoad(){
    setRestaurantListDto((current) => ({ ...current, state: "loading" }));
    fetch(`http://localhost:8000/restaurant/list?${new URLSearchParams(filters)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setRestaurantListDto({ state: "error", error: responseJson.error });
        } else {
          setRestaurantListDto({ state: "ready", data: responseJson });
        }
      })
      .catch((error) => {
        setRestaurantListDto({
          state: "error",
          error: error.message,
        });
      });
  }

  return (
    <>
      <RestaurantListContext.Provider value={value}>{children}</RestaurantListContext.Provider>
    </>
  );
}

export default RestaurantListProvider;