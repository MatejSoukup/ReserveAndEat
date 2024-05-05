import { useContext } from "react";
import { RestaurantListContext } from "./RestaurantListContex";
import RestaurantList from "./RestaurantList";
import Icon from '@mdi/react';
import { mdiSilverware } from '@mdi/js';

import FilterForm from "./FilterForm";

function Restaurants() {
  const { restaurantList } = useContext(RestaurantListContext);



  return (

    <div className="page">
      <div className="listHeader">
        <div>
          <Icon path={mdiSilverware} size={2} />
          All restaurants
        </div>
        <FilterForm />

      </div>
      <RestaurantList restaurantList={restaurantList} />
    </div>

  )
}

export default Restaurants;