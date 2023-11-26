
const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    brand: String,
    price: Number,
    category: String,
    image: String,
  });

const Product= mongoose.model("products",productSchema);
export default Product;
