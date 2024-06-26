import { useEffect, useState } from "react";
import { DashboardContext } from "./DashboardContext";

function DashboardProvider({ children }) {
  const [reservationListDto, setReservationListDto] = useState({
    state: "ready",
    data: [],
  });

  const [restaurantListDto, setRestaurantListDto] = useState({
    state: "ready",
    data: [],
  });

  

  const [filters, setFilters] = useState({
    userId: null,
  })

  useEffect(() => {
    handleLoad()
    if(filters.userId){
      handleUserRestaurants()
    }
  }, [filters]);

  function handleLoad(){
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

  function handleUserRestaurants(){
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

  const value = {
    reservationList: reservationListDto.data || [],
    restaurantList: restaurantListDto.data || [],
    handlerMap:{
      setFilters:setFilters
    }
  };

  return (
    <>
      <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
    </>
  );
}

export default DashboardProvider;