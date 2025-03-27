import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersLists from "./UsersLists";
import AddUser from "./AddUser";
import axios from "axios";
const Home = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3010/user/all");
        if (response.status == 200) {
          setList(response.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch()
  },[]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersLists />} />
          <Route path="/add_user" element={<AddUser users={list}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Home;
