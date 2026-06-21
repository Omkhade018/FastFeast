const mongoose = require("mongoose");

const mongoURI =
  "mongodb://khadeom238_db_user:Venom123@ac-rg5bu1c-shard-00-00.wa9snde.mongodb.net:27017,ac-rg5bu1c-shard-00-01.wa9snde.mongodb.net:27017,ac-rg5bu1c-shard-00-02.wa9snde.mongodb.net:27017/FastFeastmern?ssl=true&replicaSet=atlas-xhd477-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    global.food_items = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();

    global.foodCategory = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    console.log("Food items:", global.food_items.length);
    console.log("Food categories:", global.foodCategory.length);
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = mongoDB;