const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://abhinav1229:abhinav1229@abhinav.pkmqgjl.mongodb.net/recipeapp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

mongoose.connection.on("error", (err) => {
  console.log("Connection failed");
});
mongoose.connection.on("connected", (connected) => {
  console.log("Connected with database");
});
