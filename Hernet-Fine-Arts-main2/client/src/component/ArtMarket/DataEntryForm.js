import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataEntryForm = () => {
  const [fname, setFName] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const setdata = (e) => {
    setFName(e.target.value);
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  const addUserData = async (e) => {
    e.preventDefault();

    if (!fname || !file) {
      alert("Please provide both a name and an image.");
      return;
    }

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post("/api/artMarket", formData, config);

      if (!res.data || res.data.status !== 201) {
        alert("Could not save. " + (res.data?.message || "Unknown error"));
      } else {
        navigate("/artMarket");
      }
    } catch (err) {
      alert("Network or server error: " + err.message);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>

        <Form className="mt-3" onSubmit={addUserData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              onChange={setdata}
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control
              type="file"
              onChange={setimgfile}
              name="photo"
              placeholder=""
              accept="image/*"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default DataEntryForm;