import React, { Component } from "react";
import { fetchRestaurants } from "../../services/api";
import "./index.css";

class RestaurantList extends Component {
  state = {
    restaurants: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    fetchRestaurants()
      .then((data) => {
        this.setState({
          restaurants: data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
          loading: false,
        });
      });
  }

  render() {
    const { restaurants, loading, error } = this.state;

    if (loading) {
      return (
        <div className="restaurant-card">
          <p className="loading-text">Loading restaurants...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="restaurant-card error-text">
          Error: {error}
        </div>
      );
    }

    return (
      <div className="restaurant-card">
        <h2 className="restaurant-title">Restaurants</h2>

        <ul className="restaurant-list">
          {restaurants.map((res) => (
            <li key={res._id} className="restaurant-item">
              <span className="restaurant-name">{res.name}</span>
              <span className="restaurant-location">
                {res.location || "—"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RestaurantList;
