import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { RestaurantContext } from "./RestaurantContext.js";

function RestaurantProvider({ children }) {
  const [restaurantLoadObject, setRestaurantLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoad();
  }, [location]);

  function handleLoad() {
    setRestaurantLoadObject((current) => ({ ...current, state: "pending" }));
    fetch(`http://localhost:8000/restaurant/get?id=${new URLSearchParams(location.search).get("id")}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
            setRestaurantLoadObject({ state: "error", error: responseJson.error });
        } else {
            setRestaurantLoadObject({ state: "ready", data: responseJson });
        }
      })
      .catch((error) => {
        setRestaurantLoadObject({
          state: "error",
          error: error.message,
        });
      });
  }

  async function handleReservationCreate(reservation) {
    const response = await fetch("http://localhost:8000/reservation/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
    const serverResponse = await response.json();
    if (response.status < 400) {
      
    }
  }

  async function addRestaurantToFavorite(dtoIn){
    console.log(dtoIn)
    const response = await fetch(`http://localhost:8000/user/favorite/add?${new URLSearchParams(dtoIn)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const serverResponse = await response.json();
    console.log(serverResponse)
    return serverResponse
  }

  const value = {
    restaurant: restaurantLoadObject.data,
    makeReservation: handleReservationCreate,
    addtoFavorite: addRestaurantToFavorite
  };

  return (
    <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>
  );
}

export default RestaurantProvider;