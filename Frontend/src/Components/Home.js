import React, { useState, useEffect, useRef, useContext } from "react";
import "./Home.css";
import obj from "./Login/Login";
import menIcon from "./men-icon.png";
import womenIcon from "./women-icon.png";
import kidsIcon from "./kids-icon.png";
import shoes from "./shoes-icon.png";
import caps from "./caps-icon.png";
import jeans from "./jeans-icon.png";
import tshirt from "./tshirts-icon.png";
import adidas from "./adidas.jpg";
import puma from "./puma.jpg";
import nike from "./nike.jpg";
import jordan from "./jordan.jpg";
import reebok from "./reebok.jpg";
import { productsearch } from "./Search/productsearch";
import SearchResults from "./Search/searchresults";
import {message} from 'antd';
import userContextValue from "../context/User/userContext";

function Home() {


  const Login = obj.Login;
  
  const [isLoggedin,setisLoggedin]=useState(false);
  const context =useContext(userContextValue);
  const {userData,getuserinfo}=context;
  useEffect(()=>{
    getuserinfo();
    if(localStorage.getItem("token"))
      setisLoggedin(true);
    else setisLoggedin(false);
  },[])

  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const [isHomePage, setIsHomePage] = useState(true);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const [displayedProducts, setDisplayedProducts] = useState([]);


  const Logout=()=>{
    setisLoggedin(false);
    message.success('Signed out successfully.');
  }

  const handleCategoryClick = (brand, event) => {
    event.preventDefault();
    const results = productsearch(brand);
    setSearchResults(results);
    setIsHomePage(false);
  };

  const openLogin = () => {
    setLoginOpen(true);
    setisLoggedin(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    if (searchQuery && event.key === "Enter") {
      event.preventDefault();
      const results = productsearch(searchQuery);
      setSearchResults(results);
      setIsHomePage(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchExpanded(!isSearchExpanded);
  };

  return (
    <div>
      <div className="navbar">
        <button className="cart-button" onClick={() => {setCartOpen(!isCartOpen)}}>
          <span className="cart-icon" role="img" aria-label="Cart">
            🛒
          </span>
          Cart
        </button>
        {/* <button className="wishlist-button">
          <span className="wishlist-icon" role="img" aria-label="Wishlist">
            ❤️
          </span>
          Wishlist
        </button> */}
        <a
          href="/"
          className="navbar-title"
          onClick={() => setIsHomePage(true)}
        >
          <span className="fancy-text">FLEXKART</span>
        </a>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {isLoggedin ===false ? (
        <button className="sign-in-button" onClick={openLogin}>
          Sign In
        </button>
        
        ):(
          <>
          <div className="uid">
              {userData.name}
            </div>
          <button className="sign-in-button" onClick={Logout}>
          Sign Out
        </button>
        </>
        )
        }
      </div>

      <header className="header">
        <h1>The FLEXKART Diwali Sale is Live !!!</h1>
      </header>
      {!isHomePage ? (
        <div className="res">
          {searchResults.length > 0 && (
            <SearchResults results={searchResults} />
          )}
        </div>
      ) : (
        <div className="cond">
          <div className="category-cards">
            <div
              className="category-card"
              onClick={(event) => handleCategoryClick("Men", event)}
            >
              <a href="/men">
                <img src={menIcon} alt="Men" />
                <h3>Men</h3>
              </a>
            </div>
            <div
              className="category-card"
              onClick={(event) => handleCategoryClick("Women", event)}
            >
              <a href="/women">
                <img src={womenIcon} alt="Women" />
                <h3>Women</h3>
              </a>
            </div>
            <div
              className="category-card"
              onClick={(event) => handleCategoryClick("Kids", event)}
            >
              <a href="/kids">
                <img src={kidsIcon} alt="Kids" />
                <h3>Kids</h3>
              </a>
            </div>
          </div>
          <div className="brand-section">
            <h1>Browse among the Most Popular Brands</h1>
            <div className="brand-cards">
              <div
                className="brand-card"
                onClick={(event) => handleCategoryClick("Adidas", event)}
              >
                <img src={adidas} alt="Adidas" />
              </div>
              <div
                className="brand-card"
                onClick={(event) => handleCategoryClick("Puma", event)}
              >
                <img src={puma} alt="Puma" />
              </div>
              <div
                className="brand-card"
                onClick={(event) => handleCategoryClick("Nike", event)}
              >
                <img src={nike} alt="Nike" />
              </div>
              <div
                className="brand-card"
                onClick={(event) => handleCategoryClick("Jordan", event)}
              >
                <img src={jordan} alt="Jordan" />
              </div>
              <div
                className="brand-card"
                onClick={(event) => handleCategoryClick("Reebok", event)}
              >
                <img src={reebok} alt="Reebok" />
              </div>
            </div>
          </div>

          <div className="search-section">
            <h2>
              Get Exciting Offers and Upto 50% OFF on the Following Categories{" "}
            </h2>
            <div className="category-cards">
              <div
                className="category-card"
                onClick={(event) => handleCategoryClick("Shoes", event)}
              >
                <a href="/shoes">
                  <img src={shoes} alt="Shoes" />
                  <h3>Shoes</h3>
                </a>
              </div>
              <div
                className="category-card"
                onClick={(event) => handleCategoryClick("T-shirts", event)}
              >
                <a href="/tshirts">
                  <img src={tshirt} alt="T-shirts" />
                  <h3>T-shirts</h3>
                </a>
              </div>
              <div
                className="category-card"
                onClick={(event) => handleCategoryClick("Joggers", event)}
              >
                <a href="/jeans">
                  <img src={jeans} alt="Jeans" />
                  <h3>Joggers</h3>
                </a>
              </div>

              <div
                className="category-card"
                onClick={(event) => handleCategoryClick("Caps", event)}
              >
                <a href="/caps">
                  <img src={caps} alt="Caps" />
                  <h3>Caps</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} The FLEXKART Store</p>
      </footer>
      {/* <div className="jak">
        {isLoginOpen === true && <Login onLogin={closeLogin}  />}
      </div> */}
      {isLoginOpen && (
        <div>
          <div className="background-blur"></div>
          <div className="modal">
            <Login onLogin = {closeLogin}/>
            <button onClick={closeLogin}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
