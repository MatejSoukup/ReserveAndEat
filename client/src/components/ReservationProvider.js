import { useEffect, useState } from "react";
import { ReservationContext } from "./ReservationContext";

function ReservationProvider({ filter, children }) {
  const [reservationListDto, setReservationListDto] = useState({
    state: "ready",
    data: [],
  });

  useEffect(() => {
    setReservationListDto((current) => ({ ...current, state: "loading" }));
    filter && fetch(`http://localhost:8000/reservation/list?${new URLSearchParams(filter)}`, {
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
  }, [filter]);

  const value = {
    reservationList: reservationListDto.data || [],
  };

  return (
    <>
      <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>
    </>
  );
}

export default ReservationProvider;