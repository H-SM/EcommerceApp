import React,{useState} from 'react';

const ProductDetails = ({ selectedProduct }) => {

  const [showDetails, setShowDetails] = useState(true);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return <div>No product selected</div>;
  }


  const handleClose = () => {
    setShowDetails(false);
  };

  const { name, brand, image, returnAvailable, price } = selectedProduct;

  const handleBuyNow = () => {
    // Logic for Buy Now button
  };

  const handleAddToCart = () => {
    // Logic for Add to Cart button
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buttonStyle = {
    padding: '4px 8px', 
    fontSize: '12px', 
  };


  const detailsContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Align content to the center horizontally
    paddingTop: '20px', // Adjust top padding as needed
  };
  


  return (
    <>
    <div className="product-details-container">
    {showDetails &&(
      <>
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div style={detailsContainer} className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-brand">{brand}</p>
        <p className="product-price">Price: ₹{price}</p>
        <p>
          Quantity:
          <button style={buttonStyle} onClick={decrementQuantity}>-</button>
          {quantity}
          <button style={buttonStyle} onClick={incrementQuantity}>+</button>
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
          <button onClick={handleBuyNow}>Buy Now</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </>
    )}
    </div>
    </>
  );
};

export default ProductDetails;
