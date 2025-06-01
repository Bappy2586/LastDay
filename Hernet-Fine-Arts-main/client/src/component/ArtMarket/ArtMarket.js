import React, { useState, useEffect } from "react";
import "./ArtMarket.css";
import img1 from "../../assets/artMarket/img1 2.png";
import img2 from "../../assets/artMarket/image 4.png";
import img3 from "../../assets/artMarket/image 2.png";

const API = "http://localhost:4000/api/art";

const ArtMarket = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [artists, setArtists] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all artists
  const fetchArtists = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setArtists(data);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // Add
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", email: "", address: "" });
    setEditingId(null);
    fetchArtists();
  };

  // Edit button
  const handleEdit = (artist) => {
    setForm({ name: artist.name, email: artist.email, address: artist.address });
    setEditingId(artist._id);
  };

  // Delete button
  const handleDelete = async (id) => {
    if (window.confirm("Delete this artist?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchArtists();
    }
  };

  return (
    <div className="container art-market-container">
      <div className="row d-flex">
        {/* Sidebar */}
        <div className="col-md-3 sidebar">
          <h4>All Artwork/ All</h4>
          <h3>Original Art For Sale</h3>
          <h5>Category</h5>
          <select className="form-select">
            <option>All</option>
          </select>
          <h5>ARTISTS</h5>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" /> Rokeya Sultana
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" /> Mohammad Eunus
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" /> Murtaja Baseer
          </label>
          <h5>MEDIUM</h5>
          <h5>MATERIAL</h5>
          <h5>SUBJECT</h5>
          <h5>PRICE</h5>
          <h5>NFT</h5>
          <h5>TIME PERIOD</h5>
          <h5>LIMITED EDITION</h5>
        </div>

        {/* Main Content */}
        <div className="col-md-9 main-content">
          <div className="artist-category-wrapper">
            {/* Form */}
            <form className="artist-form" onSubmit={handleSubmit}>
              <h3>{editingId ? "Update Artist" : "Add Artist"}</h3>
              <input
                type="text"
                name="name"
                placeholder="Artist Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Artist Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Artist Address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <button type="submit">{editingId ? "Update" : "Add"}</button>
              {editingId && (
                <button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    setForm({ name: "", email: "", address: "" });
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </form>

            {/* List */}
            <div className="artist-list">
              <h3>Artist Categories</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((artist) => (
                    <tr key={artist._id}>
                      <td>{artist.name}</td>
                      <td>{artist.email}</td>
                      <td>{artist.address}</td>
                      <td>
                        <button onClick={() => handleEdit(artist)}>Edit</button>
                        <button onClick={() => handleDelete(artist._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards */}
          <div className="row filter-buttons">
            <div className="butt">
              <button className="btn btn-primary">Recommended</button>
              <button className="btn btn-secondary">Image Search</button>
            </div>
            <div className="row">
              {[img1, img2, img3, img1, img2, img3, img1, img2, img3].map((img, i) => (
                <div className="col-md-4" key={i}>
                  <div className="card">
                    <img src={img} alt="pic" className="my-image" />
                    <h5>Turquoise Magenta S 1</h5>
                    <p>Paintings,70.1 W x 100.1 H x 3.8 D cm</p>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            Peter Nottrott <br />
                            Germany
                          </td>
                          <td>
                            <b>$1,360</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtMarket;