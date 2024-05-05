import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { RestaurantContext } from "./RestaurantContext.js";

function RestaurantProvider({ children }) {
  const [restaurantLoadObject, setRestaurantLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const [reservationListDto, setReservationListDto] = useState({
    state: "ready",
    data: [],
  });

  const [filters, setFilters] = useState({
    userId: "",
    restaurantId:"",
  })

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
      handleLoad();
      handleLoadReservationList()
    
  }, [filters, location]);

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

  async function handleReservationUpdate(reservation) {
    const response = await fetch("http://localhost:8000/reservation/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
    const serverResponse = await response.json();
    if (response.status < 400) {
      setReservationListDto((current) => {
        const reservationIndex = current.data.findIndex(
          (e) => e.id === serverResponse.id
        );
        current.data[reservationIndex] = serverResponse;
        return { state: "ready", data: current.data };
      });

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


  function handleLoadReservationList(){
    console.log(filters, " |1")
    if (filters.restaurantId === "" ){
      console.log(filters, " |2")
      setReservationListDto({ state: "ready", data: [] });
      return;
    }
    setReservationListDto((current) => ({ ...current, state: "loading" }));
    fetch(`http://localhost:8000/reservation/list?${new URLSearchParams(filters)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setReservationListDto({ state: "error", error: responseJson.error });
        } else {
          setReservationListDto({ state: "ready", data: responseJson });
        }
      })
      .catch((error) => {
        setReservationListDto({
          state: "error",
          error: error.message,
        });
      });
  }




  const value = {
    restaurant: restaurantLoadObject.data,
    reservationList: reservationListDto.data,
    makeReservation: handleReservationCreate,
    updateReservation: handleReservationUpdate,
    addtoFavorite: addRestaurantToFavorite,
    setFilters: setFilters,
  };

  return (
    <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>
  );
}

export default RestaurantProvider;