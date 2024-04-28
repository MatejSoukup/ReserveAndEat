import { useEffect, useState } from "react";
import { DashboardContext } from "./DashboardContext";

function DashboardProvider({ children }) {
  const [reservationListDto, setReservationListDto] = useState({
    state: "ready",
    data: [],
  });

  const [filters, setFilters] = useState({
    userId: "",
    restaurantId:"",
  })

  useEffect(() => {
    handleLoad()
    console.log(filters, " |3")
  }, [filters]);

  function handleLoad(){
    console.log(filters, " |1")
    if (filters.userId === "" || filters.restaurantId === "" ) {
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
    reservationList: reservationListDto.data || [],
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