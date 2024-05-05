import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Shared/Layout"

import UserProvider from './components/UserProvider'
import Dashboard from './components/Dashboard';
import DashboardProvider from './components/DashboardProvider';
import NavigationButtons from './components/NavigationButtons';
import Restaurants from './components/Restaurants'
import RestaurantListProvider from './components/RestaurantListProvider';
import RestaurantProvider from './components/RestaurantProvider';
import RestaurantRoute from './components/RestaurantRoute';
import RestaurantFormProvider from "./components/RestaurantFormProvider";
import RestaurantCreateForm from "./components/RestaurantCreateForm"

function App() {


  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route element={<NavigationButtons/>}>
                <Route index element={
                <DashboardProvider>
                    <Dashboard/>
                </DashboardProvider>
                }/>
                <Route path="restaurants" element={
                <RestaurantListProvider>
                  <Restaurants/>
                </RestaurantListProvider>}/>
                
                <Route path="restaurantDetail" element={
                <RestaurantProvider>
                  <RestaurantRoute/>
                </RestaurantProvider>
                }/>
                <Route path="restaurantCreate" element={
                  <RestaurantFormProvider>
                    <RestaurantCreateForm/>
                  </RestaurantFormProvider>
                }/>
              </Route>
                <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>

    </div>
  );
}

export default App;
