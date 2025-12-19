import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { setProducts } from "../../store/productSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./CollectionDetails.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AddToCart, RemoveFromCart } from "../../store/cartSlice";

const CollectionDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const cartItems = useSelector((state) => state.cart.items);
  const [collection, setCollection] = useState(null);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
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
    async function fetchCollection() {
      try {
        const res = await axios.get(`${BASE_URL}/collections/${slug}`, {
          withCredentials: true,
        });

        const { collection, products } = res?.data?.data || {};

        setCollection(collection);
        dispatch(setProducts(products));
      } catch (err) {
        console.log("Error fetching collection:", err);
        setCollection(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCollection();
  }, [slug]);

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

  if (loading) return <h2 style={{ color: "white" }}>Loading...</h2>;
  if (!collection)
    return <h2 style={{ color: "white" }}>Collection not found</h2>;

  return (
    <div className="collection-detail">
      <h2>{collection.name}</h2>
      <p className="collection-desc">{collection.description}</p>

      <div className="allproducts-items-collectionDetails">
        {products.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="product-card-link-collectionDetails"
          >
            <div
              key={item._id}
              className="allproducts-page-map-collectionDetails"
            >
              <img src={`${BASE_URL}${item.image[0]}`} alt={item.name} />

              <div className="add-to-cart-page-collectionDetails">
                {cartItems[item._id] ? (
                  <div className="cart-add-sub-collectionDetails">
                    <FaMinus
                      className="sub-button-collectionDetails"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(RemoveFromCart(item._id));
                      }}
                    />
                    <span className="item-qty-collectionDetails">
                      {cartItems[item._id]}
                    </span>
                    <FaPlus
                      className="add-button-collectionDetails"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(AddToCart(item._id));
                      }}
                    />
                  </div>
                ) : (
                  <button
                    className="buy-now-page-collectionDetails"
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
                <div className="avg-rating-page-collectionDetails">
                  <div className="stars-page-collectionDetails">
                    {renderStars(ratings[item._id].avg)}
                  </div>
                </div>
              )}
            </div>

            <div className="product-details-page-collectionDetails">
              <h4 className="name-page-collectionDetails">{item.name}</h4>
              {item.actualPrice ? (
                <div className="price-box-allproducts">
                  <p className="selling-price-allproducts">₹{item.price}</p>
                  <span className="actual-price-allproducts">
                    ₹{item.actualPrice}
                  </span>
                  <span className="discount-badge-allproducts">
                    {Math.round(
                      ((item.actualPrice - item.price) / item.actualPrice) * 100
                    )}
                    % OFF
                  </span>
                </div>
              ) : (
                <p className="price-page">₹{item.price}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <Link to="/" className="back-link">
        ← Back to Collections
      </Link>
    </div>
  );
};

export default CollectionDetail;
