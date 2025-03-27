const express = require('express');
const route = express.Router();
route.use(express.json());
const users = require("../model/userModel");

route.get("/", (request, response) => {
  response.send("welcom to user route :)");
});


route.get("/all", async (request, response) => {
  try {
    const find_all = await users.find();
    response.status(200).send(find_all);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

route.get("/:id", async (request, response) => {
  const user_id = request.params.id;
  try {
    const find_user = await users.findOne({ id: user_id });
    if (!find_user) {
      return response.status(400).json({ message: "user not found :(" });
    }
    response.status(200).send(find_user);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

route.post("/add", async (request, response) => {
  const { id, name, date, email, age } = request.body;
  if (!id || !name || !date || !email || !age) {
    return response
      .status(400)
      .json({ message: "please fill all the fields !!" });
  }
  try {
    const new_user = await users.insertOne({
      id: id,
      name: name,
      email: email,
      date: date,
      age: age,
    });

    response
      .status(201)
      .json({ message: "user added successufly :) ", user: new_user });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

route.delete("/:id", async (request, response) => {
  const user_id = request.params.id;
  try {
    const delete_user = await users.deleteOne({ id: user_id });
    response.json({ message: "user deleted successufly :)" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});
module.exports = route;
