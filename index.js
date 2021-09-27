const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./person");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to phonebook</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((data) => res.json(data));
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((data) => res.json(data));
});

app.post("/api/persons/", (req, res) => {
  const person = new Person(req.body);

  person.save().then((data) => {
    res.json(data);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
