import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";

const ArtMarket = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/artMarket", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status !== 200 || !res.data) {
        console.log("error");
      } else {
        setData(res.data.getUser);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const dltUser = async (id) => {
    try {
      const res = await axios.delete(`/api/artMarket/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status !== 200 || !res.data) {
        console.log("error");
      } else {
        getUserData();
        setShow(true);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          User Deleted
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-2">
        <h1 className="text-center mt-2">MERN Image Upload Projects</h1>
        <div className="text-end">
          <Button variant="primary">
            <Link to="/dataEntryForm" className="text-decoration-none text-light">
              Add User
            </Link>
          </Button>
        </div>

        <div className="row d-flex justify-content-between align-items-center mt-5">
          {data.length > 0
            ? data.map((el, i) => (
                <Card
                  style={{ width: "22rem", height: "18rem" }}
                  className="mb-3"
                  key={el._id}
                >
                  <Card.Img
                    variant="top"
                    style={{
                      width: "100px",
                      textAlign: "center",
                      margin: "auto",
                    }}
                    src={`/uploads/${el.imgpath}`}
                    className="mt-2"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>User Name : {el.fname}</Card.Title>
                    <Card.Text>
                      Date Added : {moment(el.date).format("L")}
                    </Card.Text>
                    <Button
                      variant="danger"
                      className="col-lg-6 text-center"
                      onClick={() => dltUser(el._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default ArtMarket;