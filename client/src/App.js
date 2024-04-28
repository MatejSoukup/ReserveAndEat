import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Shared/Layout"

import UserProvider from './components/UserProvider'
import Dashboard from './components/Dashboard';
import DashboardProvider from './components/DashboardProvider';
import NavigationButtons from './components/NavigationButtons';
import RestaurantList from './components/RestaurantList';
import RestaurantListProvider from './components/RestaurantListProvider';
import RestaurantProvider from './components/RestaurantProvider';
import RestaurantRoute from './components/RestaurantRoute';

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
                  <RestaurantList/>
                </RestaurantListProvider>}/>
                
                <Route path="restaurantDetail" element={
                <RestaurantProvider>
                  <RestaurantRoute/>
                </RestaurantProvider>
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
