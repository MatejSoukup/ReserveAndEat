import { useContext, useState, useCallback } from "react";
import { RestaurantListContext } from "./RestaurantListContex";
import RestuarantCard from "./RestaurantCard"
import RestaurantList from "./RestaurantList";
import Icon from '@mdi/react';
import { mdiSilverware } from '@mdi/js';
import CategorySelect from "./CategorySelect";
import CategorySelectProvider from "./CategorySelectProvider";

function Restaurants(){
    const {restaurantList,handlerMap} = useContext(RestaurantListContext);

    const handleSubmit = useCallback(
        async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const filters = {
                city:formData.get("city"),
                categoryId: formData.get("category"),
          };
          try {
            handlerMap.setFilters(filters)
          } catch (error) {
            console.error(error);
          }
        },
        [handlerMap]
      );
    
    const resetForm = useCallback(() => {
        const cityInput = document.querySelector('input[name="city"]');
        cityInput.value = ''; // reset city input field
    
        // reset category select field
        const categorySelect = document.querySelector('select[name="category"]');
        categorySelect.selectedIndex = 0;
    }, []);

    return(
        
            <div className="page">
            <div className="listHeader">
                <div>
                <Icon path={mdiSilverware} size={2} />
                All restaurants
                </div>
                <div className="filters">
                    <form className="filtersForm" onSubmit={handleSubmit}>
                        <input placeholder="Filter by city" className="formInput" name="city"/>
                        <CategorySelectProvider>
                            <CategorySelect/>
                        </CategorySelectProvider>
                        <button className="formInput filterButton" type="submit">Filter</button>
                        <button className="formInput filterButton" onClick={resetForm}>Reset</button>
                    </form>
                </div>
            
            </div>
                <RestaurantList restaurantList={restaurantList}/>
            </div>
            
    )
}

export default Restaurants;