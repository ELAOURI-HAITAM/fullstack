import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoInfo, GoTrash } from "react-icons/go";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'animate.css'
const UsersLists = () => {
  const [modal_details, setModal_Details] = useState();
  const [modal_delete, setModal_Delete] = useState();
  const [user_details, setUser_Details] = useState({});
  const [success_message, setSuccess_Message] = useState("");
  const [error_message, setError_Message] = useState("");
  const [users, setUsers] = useState([]);
  const [selected_user, setSelected_User] = useState();
  const Fetch_Data = async () => {
    try {
      const response = await axios.get(`http://localhost:3010/api/user/all`);
      if (response.status == 200) {
        setUsers(response.data);
      }
    } catch (err) {
      setError_Message(err.response?.data.message);
    }
  };
  useEffect(() => {
    Fetch_Data();
  }, []);
  

  const ShowDetails = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:3010/api/user/${user_id}`);
      if (response.status == 200) {
        setUser_Details(response.data);
        setModal_Details(true);
      }
    } catch (err) {
      setError_Message(err.response?.data.message);
    }
  };
  /*
selected_id = (user_id) => button
 */

  const Confrim_Delete = (user_id) => {
    setModal_Delete(true);
    setSelected_User(user_id);
  };
  console.log(selected_user);

  const Delete_User = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3010/api/user/${id}`);
      if (response.status == 200) {
        setSuccess_Message("USER DELETED SUCCESSUFLY");
        setTimeout(() => setSuccess_Message(""), 3000);
        setModal_Delete(false);
        Fetch_Data();
      }
    } catch (err) {
      setError_Message(err.response?.data.message);
    }
  };

  
  return (
    <>
      {success_message && (
        <h1 className=" alert alert-success animate__animated animate__slideInRight text-center">
          {success_message}
        </h1>
      )}
      {error_message && (
        <h1 className=" alert alert-danger animate__animated animate__slideInRight text-center">
          {error_message}
        </h1>
      )}
      {users.length < 1 &&
          <h1 className="alert alert-danger text-center animate__animated animate__slideInRight" >NO DATA TO DISPLAY :(</h1>
      
      }
      <h1 className=" text-center ">USERS LISTS</h1>
      <Link to={'/add_user'}>
        <button className="btn btn-success">ADD NEW USER</button>
      </Link>
      <table className="table table-dark text-center animate__animated animate__fadeInDown">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { users.map((items, index) => (
            <tr key={index}>
              <td>{items.name}</td>
              <td>{items.email}</td>
              <td>{items.date}</td>
              <td>{items.age}</td>
              <td className="d-flex justify-content-center gap-5 ">
                <button
                  className="btn btn-warning btn-lg   "
                  style={{width : "50%"}}
                  onClick={() => ShowDetails(items.id)}
                >
                  <GoInfo className=" " />
                </button>
                <button
                  className="btn btn-danger w-40 btn-lg"
                  style={{width : "50%"}}
                  onClick={() => Confrim_Delete(items.id)}
                >
                  <GoTrash className="text-4xl ml-12 " />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        className="text-center"
        show={modal_details}
        onHide={() => setModal_Details(false)}
        centered
      >
        <Modal.Header closeButton className="text-center">
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name :{user_details.name}</p>
          <p>Email : {user_details.email}</p>
          <p>Date : {user_details.date}</p>
          <p>Age : {user_details.age}</p>
        </Modal.Body>
      </Modal>

      <Modal
        className="text-center"
        show={modal_delete}
        onHide={() => setModal_Delete(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>USER DELETE</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>ARE YOU SURE TO DELETE THIS USER ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => Delete_User(selected_user)}>
            Yes Im Sure
          </Button>
          <Button variant="primary" onClick={() => setModal_Delete(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersLists;
