import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const AddUser = ({users}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const link_to = useNavigate();

  
  const onAdd = async () => {

    const new_user = {
      id : users.length + 1,
      name: name,
      email: email,
      date: date,
      age: age,
    };
    try
    {
      const response = await axios.post(
        `http://localhost:3010/api/user/add`,
        new_user
      );
      if (response.status === 201) {
        setMessage("USER ADDED SUCCESSUFLY ");
        setTimeout(() => link_to("/"), 2000);
      }
    }
    catch(err)
    {
      setMessage(err.message)
    }
  };
  return (
    <>
      <Link to={"/"}>
        <button>Back</button>
      </Link>
      {message &&
      <h1 className="alert alert-success">{message}</h1>
      }
      <div className="row d-flex justify-content-center text-center">
        <div className="card col-md-6 col-sm-1">
          <div className="card-header bg-warning ">
            <h3>Add New User</h3>
          </div>
          <div className="card-body d-flex flex-column align-items-center gap-2">
            <div className="col-md-12 col-sm-6">
              <h4>Name</h4>
            </div>
            <div className="col-md-8 col-sm-6">
              <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)}/>
            </div>

            <div className="col-12">
              <h4>Email</h4>
            </div>
            <div className="col-md-8">
              <input type="text" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>

            <div className="col-md-8">
              <h4>Date</h4>
            </div>
            <div className="col-8">
              <input type="date" className="form-control" value={date} onChange={(event) => setDate(event.target.value)}/>
            </div>

            <div className="col-8">
              <h4>Age</h4>
            </div>
            <div className="col-8">
              <input type="number" className="form-control" value={age} onChange={(event) => setAge(event.target.value)}/>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button className="btn btn-warning" onClick={onAdd} style={{width : "100%"}}>
                <h3>Add</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
