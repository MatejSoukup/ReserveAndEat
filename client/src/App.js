import './App.css';
import RestaurantForm from './components/Forms/Restaurant/RestaurantForm';
import ReservationForm from './components/Forms/User/ReservationForm';
import Navbar from './components/Navbar';
import RestuarantCard from './components/RestaurantCard';

const restaurantList = [
{
  name:"rest1",
  shortDescription:"rest1 - bistro"
},
{
  name:"rest2",
  shortDescription:"rest2 - bistro"
}
]

function App() {
  return (
    <div className="App">
      <Navbar/>
      <RestaurantForm/>
    </div>
  );
}

export default App;
