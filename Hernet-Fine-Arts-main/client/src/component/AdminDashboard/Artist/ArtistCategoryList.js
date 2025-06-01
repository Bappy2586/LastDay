import React, { useEffect, useState } from "react";
import "./ArtistCategoryList.css";

const API = "http://localhost:4000/api/artist-categories";

export default function ArtistCategoryList() {
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
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit (add or update)
  const handleSubmit = async e => {
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
  const handleEdit = artist => {
    setForm({ name: artist.name, email: artist.email, address: artist.address });
    setEditingId(artist._id);
  };

  // Delete button
  const handleDelete = async id => {
    if (window.confirm("Delete this artist?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchArtists();
    }
  };

  return (
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
          <button type="button" className="cancel" onClick={() => {
            setForm({ name: "", email: "", address: "" });
            setEditingId(null);
          }}>
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
            {artists.map(artist => (
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
  );
}