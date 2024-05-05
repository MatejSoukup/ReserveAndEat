import { useContext } from "react";
import { UserContext } from "./UserContext";
import { RestaurantFormContext } from "./RestaurantFormProvider";
import CategorySelect from "./CategorySelect";
import CategorySelectProvider from "./CategorySelectProvider";

function RestaurantCreateForm(){
  const {loggedInUser} = useContext(UserContext);
  const {handleCreate} = useContext(RestaurantFormContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const restaurant = {
      name: formdata.get('name'),
      address: {
        city: formdata.get('city'),
        street: formdata.get('street'),
        country: formdata.get('country'),
      },
      email: formdata.get('email'),
      website: formdata.get('website'),
      phone: formdata.get('phone'),
      shortDescription: formdata.get('shortDescription'),
      description: formdata.get('description'),
      openingHours: formdata.get('openingHours'),
      categoryId: formdata.get('category'),
      userId: loggedInUser.id
    };

    handleCreate(restaurant)
    console.log(restaurant)
  }


if(loggedInUser){
return (

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Name"
    />
    <input
      type="text"
      name="city"
      placeholder="City"

    />
    <input
type="text"
      name="street"
      placeholder="Street"

    />
    <input
      type="text"
      name="country"
      placeholder="Country"

    />
    <input
      type="email"
      name="email"
      placeholder="Email"

    />
    <input
      type="url"
      name="website"
      placeholder="Website"

    />
    <input
      type="tel"
      name="phone"
      placeholder="Phone"

    />
    <input
      type="text"
      name="shortDescription"
      placeholder="Short Description"

    />
    <textarea
      name="description"
      rows="4"
      cols="50"
      placeholder="Description"

    />
    <input
      type="text"
      name="openingHours"
      placeholder="Opening Hours"

    />
    <CategorySelectProvider>
      <CategorySelect/>
    </CategorySelectProvider>
    <button type="submit">Submit</button>
  </form>
);
}
}
export default RestaurantCreateForm;