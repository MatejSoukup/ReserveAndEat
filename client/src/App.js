import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Shared/Layout"

import UserProvider from './components/UserProvider'
import UserDashboard from './components/UserDashboard';
import ReservationProvider from './components/ReservationProvider';
import NavigationButtons from './components/NavigationButtons';
import RestaurantList from './components/RestaurantList';
import RestaurantProvider from './components/RestaurantProvider';

function App() {


  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={
                <NavigationButtons>
                    <UserDashboard/>
                </NavigationButtons>}
                />

                <Route path="restaurants" element={
                <RestaurantProvider>
                  <RestaurantList/>
                </RestaurantProvider  >
                }/>

                <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>

    </div>
  );
}

export default App;
