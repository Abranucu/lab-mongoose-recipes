const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // Iteracion 2
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Fajitas picantonas",
      level: "Amateur Chef",
      ingredients: [
        "pollo",
        "pimiento",
        "cebolla",
        "tomate",
        "coñac",
        "sazonador para fajitas",
        "chile habanero",
      ],
      cuisine: "Mexicana",
      dishType: "snack",
      duration: 20,
      creator: "Abraham y David",
    })
  })
  // Iteracion 3
  .then((response) => {
    console.log(response.title);
    return Recipe.insertMany(data);
  })
  // Iteración 4
  .then((response) => {
    response.forEach((eachRecipe) => {
      console.log(eachRecipe.title);
    })
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then((response) => {
    console.log("Success updating", response.title)

    // Iteración 5
    return Recipe.findOneAndDelete({ title: "Carrot Cake" })
  })
  .then((response) => {
    console.log("Success deleting!!", response.title)
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  // Iteración 6
  .then(() => {
    mongoose.disconnect()
    console.log("desconectado!!");
  })


