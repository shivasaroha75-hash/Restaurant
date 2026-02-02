import React, { Component } from "react";
import { fetchDashboardStats } from "../../services/api";
import "./index.css";

class DashboardStats extends Component {
  state = {
    stats: null,
    loading: true,
    error: null,
  };
componentDidMount() {
  fetchDashboardStats()
    .then((data) => {
      this.setState({
        stats: {
          totalOrders: data.totalOrders || data.ordersCount || 0,
          totalRevenue: data.totalRevenue || data.revenue || 0,
        },
        loading: false,
      });
    })
    .catch((err) => {
      this.setState({ error: err.message, loading: false });
    });
}


  render() {
    const { stats, loading, error } = this.state;

    if (loading) {
      return (
        <div className="dashboard-card">
          <p className="loading-text">Loading dashboard...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="dashboard-card error-text">
          {error}
        </div>
      );
    }

    return (
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard Overview</h2>

        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{stats.totalOrders}</span>
          </div>

          <div className="stat-box revenue">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">₹{stats.totalRevenue}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardStats;
