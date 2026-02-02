import { Component } from "react";
import {
  fetchMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from "../../services/api";
import "./index.css";

class Menu extends Component {
  state = {
    menu: [],
    search: "",
    loading: false,
    error: null,

    name: "",
    category: "Beverage",
    price: "",
    editingId: null,
  };

  componentDidMount() {
    this.loadMenu();
  }

  loadMenu = () => {
    this.setState({ loading: true, error: null });
    fetchMenu(this.state.search)
      .then((data) => this.setState({ menu: data, loading: false }))
      .catch((err) => this.setState({ error: err.message, loading: false }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, price, editingId } = this.state;
    const payload = { name, category, price: Number(price) };

    const action = editingId
      ? updateMenuItem(editingId, payload)
      : addMenuItem({ ...payload, isAvailable: true });

    action
      .then(() => {
        this.resetForm();
        this.loadMenu();
      })
      .catch((err) => alert(err.message));
  };

  handleEditClick = (item) => {
    this.setState({
      editingId: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
    });
  };

  handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;
    deleteMenuItem(id)
      .then(() =>
        this.setState((prev) => ({
          menu: prev.menu.filter((i) => i._id !== id),
        }))
      )
      .catch(() => alert("Delete failed"));
  };


  

  handleToggle = (id) => {
    this.setState((prev) => ({
      menu: prev.menu.map((i) =>
        i._id === id ? { ...i, isAvailable: !i.isAvailable } : i
      ),
    }));

    toggleAvailability(id).catch(() => {
      this.setState((prev) => ({
        menu: prev.menu.map((i) =>
          i._id === id ? { ...i, isAvailable: !i.isAvailable } : i
        ),
      }));
      alert("Toggle failed");
    });
  };

  resetForm = () => {
    this.setState({
      name: "",
      category: "Beverage",
      price: "",
      editingId: null,
    });
  };

  render() {
    const {
      menu,
      search,
      loading,
      error,
      name,
      category,
      price,
      editingId,
    } = this.state;

    return (
      <div className="menu-card">
        <h2 className="menu-title">Menu Management</h2>

        <input
          className="menu-search"
          placeholder="Search menu..."
          value={search}
          onChange={(e) =>
            this.setState({ search: e.target.value }, this.loadMenu)
          }
        />

        <form className="menu-form" onSubmit={this.handleSubmit}>
          <input
            placeholder="Item name"
            value={name}
            required
            onChange={(e) => this.setState({ name: e.target.value })}
          />

          <select
            value={category}
            onChange={(e) => this.setState({ category: e.target.value })}
          >
            <option>Beverage</option>
            <option>Appetizer</option>
            <option>Main Course</option>
            <option>Dessert</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            required
            onChange={(e) => this.setState({ price: e.target.value })}
          />

          <button type="submit" className="primary-btn">
            {editingId ? "Update Item" : "Add Item"}
          </button>

          {editingId && (
            <button
              type="button"
              className="secondary-btn"
              onClick={this.resetForm}
            >
              Cancel
            </button>
          )}
        </form>

        {loading && <p className="loading-text">Loading menu...</p>}
        {error && <p className="error-text">{error}</p>}

        <table className="menu-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
             {menu.length === 0 && !loading && (
    <tr>
      <td colSpan="5" className="empty-state">
        No menu items found
      </td>
    </tr>
  )}
            {menu.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>
                  <span
                    className={`status-badge ${
                      item.isAvailable ? "available" : "unavailable"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td>
  <div className="menu-actions">
    {/* Availability Toggle Switch */}
    <label className="switch">
      <input
        type="checkbox"
        checked={item.isAvailable}
        onChange={() => this.handleToggle(item._id)}
      />
      <span className="slider" />
    </label>

    {/* Edit */}
    <button
      className="action-btn action-edit"
      onClick={() => this.handleEditClick(item)}
    >
      Edit
    </button>

    {/* Delete */}
    <button
      className="action-btn action-delete"
      onClick={() => this.handleDelete(item._id)}
    >
      Delete
    </button>
  </div>
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Menu;
