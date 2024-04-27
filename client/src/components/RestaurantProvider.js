import { useEffect, useState } from "react";
import { RestaurantContext } from "./RestaurantContext";

function RestaurantProvider({ filter, children }) {
  const [restaurantListDto, setRestaurantListDto] = useState({
    state: "ready",
    data: [],
  });

  useEffect(() => {
    setRestaurantListDto((current) => ({ ...current, state: "loading" }));
    fetch(`http://localhost:8000/restaurant/list`, {
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
  }, [filter]);

  const value = {
    restaurantList: restaurantListDto.data || [],
  };

  return (
    <>
      <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>
    </>
  );
}

export default RestaurantProvider;