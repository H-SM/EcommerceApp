import React, { useContext, useState } from 'react';
import obj from '../Login/Login';
import axios from 'axios';
import userContextValue from "../../context/User/userContext";

const ProductDetails = ({ selectedProduct, addToCart }) => {
  const [showDetails, setShowDetails] = useState(true);
  const [quantity, setQuantity] = useState(1);
  //const UserModel = require('../../models/user');
  const context =useContext(userContextValue);
  const {userData,getuserinfo}=context;
  if (!selectedProduct) {
    return <div>No product selected</div>;
  }

  const handleClose = () => {
    setShowDetails(false);
  };

  const { name, brand, image, returnAvailable, price } = selectedProduct;

  const handleBuyNow = () => {
    
  };
  console.log(userData);
  const handleAddToCart = async() => {

    //const newProduct
    //addToCart(selectedProduct, quantity);
   
    const crt = userData.cartList;
    crt.push({selectedProduct});
    await axios.put('http://localhost:8000/api/crud/updatecart', {
      email: userData.email,
      crt: crt,
    });
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="product-details-container">
        {showDetails && (
          <>
            <div className="product-picture">
              <img src={image} alt={name} />
            </div>
            <div className="product-info">
              <h2 className="product-name">{name}</h2>
              <p className="product-brand">{brand}</p>
              <p className="product-price">Price: ₹{price}</p>
              <p>
                Quantity:
                <button onClick={decrementQuantity}>-</button>
                {quantity}
                <button onClick={incrementQuantity}>+</button>
              </p>
              <p className="product-return">Return available within 14 days</p>
              <div className="product-bullets">
                <ul>
                  <li>Shipping available all across India with express delivery</li>
                  <li>Return available within 14 days</li>
                  <li>Payment methods: COD, UPI, Netbanking, etc.</li>
                </ul>
              </div>
              <div className="button-container">
                <button className = 'bn' onClick={handleBuyNow}>Buy Now</button>
                <button className = 'atc' onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
