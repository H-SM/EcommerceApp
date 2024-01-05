import React from 'react'

export default function cart(results) {
  return (
    <div className='products-container'>
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
    </div>
  )
}