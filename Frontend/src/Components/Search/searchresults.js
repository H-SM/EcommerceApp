import React, { useState } from 'react';
import './searchresults.css';
import { Link } from 'react-router-dom';
import ProductDetails from './productdetails'; // Assuming the correct path to ProductDetails

const SearchResults = ({ results }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (clickedProduct) => {
    setSelectedProduct(clickedProduct);
  };

  return (
    <div className="products-container">
      {selectedProduct ? (
        <ProductDetails selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
      ) : (
        <>
          {results.length > 0 ? (
            results.map((product) => (
              <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                <div className="product-image">
                  <img src={product.image} alt="Product Image" />
                </div>
                <div className="product-details">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-brand">{product.brand}</p>
                  <p className="product-price">₹{product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
