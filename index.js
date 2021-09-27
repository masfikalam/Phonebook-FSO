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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((data) => {
      data ? res.json(data) : res.status(404).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons/", (req, res) => {
  const person = new Person(req.body);

  person.save().then((data) => {
    res.json(data);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

const errHandler = (err, req, res, next) => {
  console.error(err.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "incorrect id" });
  }

  next(error);
};

app.use(errHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
