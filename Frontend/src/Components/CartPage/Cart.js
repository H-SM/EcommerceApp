import React, { useEffect , useContext , useState } from 'react';
import userContextValue from '../../context/User/userContext';
import './Cart.css'; // Import your CSS file for styling
import axios from 'axios';
import {messsage} from 'antd';import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from '../Stripe/Stripe';

export default function Cart() {
  const [showPayment, setShowPayment] = useState(false);
  const context = useContext(userContextValue);
  const { userData , setUserData } = context;
  const [cartList, setCartList] = useState(userData.cartList);
  const [cartItems, setCartItems] = useState([]);
  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    // Add functionality to handle product clicks
  };


  const calculateTotalPrice = () => {
    return cartList.reduce((total, product) => total + product.price, 0);
  };

  const handleBuyNow = async() => {
    const totalPrice = calculateTotalPrice();
    setShowPayment(true);
  };

  const handleQuantityChange = (product, action) => {
    const updatedCart = cartList.map((item) => {
      if (item._id === product._id) {
        return {
          ...item,
          quantity: action === 'increase' ? (item.quantity || 1) + 1 : (item.quantity || 1) - 1,
        };
      }
      return item;
    });
    setCartList(updatedCart);
  };


  useEffect(() => {
    if (userData && userData.cartList) {
      const itemObject = {};
      userData.cartList.forEach((item) => {
        if (itemObject[item._id]) {
          // If item exists, update its quantity
          itemObject[item._id].quantity += 1;
        } else {
          // If item doesn't exist, add it to the object
          itemObject[item._id] = { ...item, quantity: 1 };
        }
      });
      // Convert object values to array for rendering
      setCartItems(Object.values(itemObject));
    }
  }, [userData]);


  // const crt = userData.cartList;
  //   let flag = false;
  //   crt.forEach((item) => {
  //         if (selectedProduct._id === item._id) {
  //           // If item exists, update its quantity
  //           item.quantity += quantity;
  //           flag = true ;
  //           return ;
  //         }
  //   });



  //   if(flag === false){
  //         selectedProduct.quantity = quantity;
  //         crt.push(selectedProduct);
  //       }
      
    


  const RemoveClicked = async(value)=>{
    const updatedProducts = userData.cartList.filter(product => product._id !== value._id);
    setCartList(updatedProducts)
    //console.log(updatedProducts);
    await axios.put('http://localhost:8000/api/crud/updatecart', {
      email: userData.email,
      crt: updatedProducts,
    });
    
  }



  return (
  
    <div className="cart-container">
      <div className="cart-items">
        {cartList.length > 0 ? (
          cartList.map((product) => (
            <div key={product.id} className="cart-item">
              <div className="product-image">
                <img src={product.image} alt="Product Image" />
              </div>
              <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                <p className="product-price">₹{product.price}</p>
                <div className="quantity-counter">
                  <button onClick={() => handleQuantityChange(product, 'decrease')}>-</button>
                  <span>{product.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(product, 'increase')}>+</button>
                </div>
              </div>
              <button className = "remove-item h-11" onClick ={() => RemoveClicked(product)}>Remove</button>
            </div>
          ))
        ) : (
          <p className="empty-cart-message">Your cart is empty</p>
        )}
      </div>
      <div className="cart-summary">
        <div className="cart-summary-card">
          <h3>Order Summary</h3>
          <p>Total: ₹{calculateTotalPrice()}</p>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}


