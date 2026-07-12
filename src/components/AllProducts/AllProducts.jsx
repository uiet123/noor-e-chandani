import React, { useEffect, useState } from "react";
import { setAllProducts } from "../../store/productSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AddToCart, RemoveFromCart } from "../../store/cartSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./AllProducts.css";

const AllProducts = () => {
  const [ratings, setRatings] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.product.allProducts);
  const cartItems = useSelector((state) => state.cart.items);

  const renderStars = (value) => {
    const stars = [];
    const rounded = Math.round(value * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rounded)) {
        stars.push(<FaStar key={i} className="pd-star full" />);
      } else if (i === Math.floor(rounded) + 1 && rounded % 1 >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="pd-star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="pd-star empty" />);
      }
    }

    return stars;
  };

  const buyNow = (id) => {
    dispatch(AddToCart(id));
  };

  useEffect(() => {
    // If we need data here when refreshing directly on /allproducts, it should be fetched from a static file.
    // For now, it relies on the redux state populated by Collections.jsx
  }, []);

  useEffect(() => {
    async function getRatings() {
      try {
        const res = await axios.get(`${BASE_URL}/reviews/summary`);
        const map = {};

        res?.data?.data?.forEach((r) => {
          map[r.productId] = { avg: r.avg, count: r.count };
        });

        setRatings(map);
      } catch (err) {
        console.log("Rating fetch error:", err.message);
      }
    }

    getRatings();
  }, []);
  return (
    <div className="allproducts-page">
      <h2 className="allproducts-page-h2">All Products</h2>
      <div className="allproducts-items">
        {allProducts.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="product-card-link"
          >
            <div key={item._id} className="allproducts-page-map">
              <img src={item.image[0].startsWith('/') ? item.image[0] : `${BASE_URL}${item.image[0]}`} alt={item.name} />

              <div className="add-to-cart-page">
                {cartItems[item._id] ? (
                  <div className="cart-add-sub">
                    <FaMinus
                      className="sub-button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(RemoveFromCart(item._id))}}
                    />
                    <span className="item-qty">{cartItems[item._id]}</span>
                    <FaPlus
                      className="add-button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(AddToCart(item._id))}}
                    />
                  </div>
                ) : (
                  <button
                    className="buy-now-page"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      buyNow(item._id);
                    }}
                  >
                    Add
                  </button>
                )}
              </div>

              {ratings[item._id] && (
                <div className="avg-rating-page">
                  <div className="stars-page">
                    {renderStars(ratings[item._id].avg)}
                  </div>
                </div>
              )}
            </div>

            <div className="product-details-page">
              <h4 className="name-page">{item.name}</h4>
               
            { item.actualPrice ?  
            <div className="price-box-allproducts">
            <p className="selling-price-allproducts">₹{item.price}</p>
            <span className="actual-price-allproducts">₹{item.actualPrice}</span>
            <span className="discount-badge-allproducts">
              {Math.round(
                ((item.actualPrice - item.price) / item.actualPrice) *
                  100
              )}
              % OFF
            </span> 
          </div> : <p className="price-page">₹{item.price}</p> }
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
