import React, { Component } from "react";
import {
  fetchOrders,
  updateOrderStatus

} from "../../services/api";
import "./index.css";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
    error: null,
    statusFilter: "",
    page: 1,
    limit: 5,
  };

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = () => {
    const { statusFilter, page, limit } = this.state;
    this.setState({ loading: true, error: null });

    fetchOrders(statusFilter, page, limit)
      .then((data) => {
        const orders = data.orders || data;
        this.setState({ orders, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  };

  handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
      .then(() => this.loadOrders())
      .catch(() => alert("Failed to update status"));
  };

  

  render() {
    const { orders, loading, error, statusFilter, page } = this.state;

    return (
      <div className="orders-card">
        <div className="orders-header">
          <h2 className="orders-title">Orders Dashboard</h2>

          <select
            className="orders-filter"
            value={statusFilter}
            onChange={(e) =>
              this.setState(
                { statusFilter: e.target.value, page: 1 },
                this.loadOrders
              )
            }
          >
            <option value="">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading && <p className="loading-text">Loading orders...</p>}
        {error && <p className="error-text">{error}</p>}

        <table className="orders-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
           
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber || "-"}</td>
                <td>{order.customerName || "-"}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span
                    className={`order-status ${
                      order.status === "Delivered"
                        ? "delivered"
                        : order.status === "Cancelled"
                        ? "cancelled"
                        : "pending"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    className="status-select"
                    value={order.status}
                    onChange={(e) =>
                      this.handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Ready</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="orders-pagination">
          <button
            disabled={page === 1}
            onClick={() =>
              this.setState({ page: page - 1 }, this.loadOrders)
            }
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            onClick={() =>
              this.setState({ page: page + 1 }, this.loadOrders)
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Orders;
