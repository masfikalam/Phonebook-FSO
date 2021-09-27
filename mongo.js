const mongoose = require("mongoose");
const terminal = process.argv;

if (terminal.length < 3) {
  console.log("Display contacts : node mongo.js <password>");
  console.log("Add contacts : node mongo.js <password> <name> <number>");
  process.exit(1);
}

const url = `mongodb+srv://fso-2021:${terminal[2]}@cluster0.lcv2f.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (terminal.length === 3) {
  Person.find({}).then((res) => {
    res.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });

    mongoose.connection.close();
  });
}

if (terminal.length === 5) {
  const person = new Person({
    name: terminal[3],
    number: terminal[4],
  });

  person.save().then(() => {
    console.log("contact saved!");
    mongoose.connection.close();
  });
}
