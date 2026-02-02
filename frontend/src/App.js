import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import DashboardStats from "./components/DashboardStats";
import RestaurantList from "./components/RestaurantList";
import Menu from "./components/Menu";
import Orders from "./components/Orders";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          {/* Sidebar */}
          <div className="sidebar">
            <h2>🍽 Admin</h2>
            <Link to="/">Dashboard</Link>
            <Link to="/orders">Orders</Link>
          </div>

          {/* Main */}
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <DashboardStats />
                    <RestaurantList />
                    <Menu />
                  </>
                }
              />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
