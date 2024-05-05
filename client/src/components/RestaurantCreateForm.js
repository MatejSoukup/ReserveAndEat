import { useContext } from "react";
import { UserContext } from "./UserContext";
import { RestaurantFormContext } from "./RestaurantFormProvider";
import CategorySelect from "./CategorySelect";
import CategorySelectProvider from "./CategorySelectProvider";

function RestaurantCreateForm() {
  const { loggedInUser } = useContext(UserContext);
  const { handleCreate } = useContext(RestaurantFormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const restaurant = {
      name: formdata.get("name"),
      address: {
        city: formdata.get("city"),
        street: formdata.get("street"),
        country: formdata.get("country"),
      },
      email: formdata.get("email"),
      website: formdata.get("website"),
      phone: formdata.get("phone"),
      shortDescription: formdata.get("shortDescription"),
      description: formdata.get("description"),
      openingHours: formdata.get("openingHours"),
      categoryId: formdata.get("category"),
      userId: loggedInUser.id,
    };

    handleCreate(restaurant);
    console.log(restaurant);
  };

  if (loggedInUser) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
          />
        </div>
        <div>
          <input
            type="text"
            name="street"
            placeholder="Street"
          />
        </div>
        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="url"
            name="website"
            placeholder="Website"
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
          />
        </div>
        <div>
          <input
            type="text"
            name="shortDescription"
            placeholder="Short Description"
          />
        </div>
        <div>
          <textarea
            name="description"
            rows="4"
            cols="50"
            placeholder="Description"
          />
        </div>
        <div>
          <input
            type="text"
            name="openingHours"
            placeholder="Opening Hours"
          />
        </div>
        <div className="centred">
          <CategorySelectProvider>
            <CategorySelect />
          </CategorySelectProvider>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default RestaurantCreateForm;
