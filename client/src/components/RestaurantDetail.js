import React, { useContext } from "react";
import { RestaurantContext } from "./RestaurantContext";

function RestaurantDetail({ restaurant, user }) {
  const { addtoFavorite } = useContext(RestaurantContext);

  return (
    <div className="background"> {/* Parent container with class */}
      <div className="restaurant-header">
        <div className="restaurant-name">{restaurant.name}</div>
        {user ? (
          <div
            className="mark-favorite"
            onClick={() => addtoFavorite({ restaurantId: restaurant.id, id: user.id })}
          >
            Mark as favorite
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="restaurant-info">
        <div className="label">Description</div>
        <div className="value">{restaurant.description}</div>
      </div>

      <div className="restaurant-info">
        <div className="label">Opening hours</div>
        <div className="value">{restaurant.openingHours}</div>
      </div>

      <div className="restaurant-info"> 
        <div className="label">Contacts</div>
        <div className="contact-item">Address: {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.country}</div>
        <div className="contact-item">Phone: {restaurant.phone}</div>
        <div className="contact-item">Email: {restaurant.email}</div>
        <div className="contact-item">Website: <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a></div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
