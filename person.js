const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("could not connect :", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "contact already exists"],
    required: [true, "name field is required"],
    minlength: [3, "name should be at least 3 characters long"],
  },
  number: {
    type: String,
    required: [true, "number field is required"],
    minlength: [8, "number should be at least 8 characters long"],
  },
});

personSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
