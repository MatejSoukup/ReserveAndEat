import './App.css';
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
      {restaurantList.map(restaurant => 
        <RestuarantCard restaurant={restaurant}/>
      )}
    </div>
  );
}

export default App;
