import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart } from "../../store/cartSlice";
import { AddReview } from "../../store/reviewSlice";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./ProductDetails.css";
import { color } from "framer-motion";
import Loading from "../Loading/Loading";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const cartItems = useSelector((state) => state.cart.items);
  const reviewsState = useSelector((state) => state.review.review);
  const dispatch = useDispatch();
  const colors = ["Red", "Green", "Yellow", "Blue", "Orange", "Pink", "White"];
  const [selectedColor, setSelectedColor] = useState("");

  const isWaxArt = product?.collection?.slug === "wax_art";
  const variantKey = product
    ? isWaxArt
      ? `${product._id}-${selectedColor}`
      : product._id
    : null;

  const reviewsArray = useMemo(() => {
    if (Array.isArray(reviewsState)) return reviewsState;
    if (reviewsState && reviewsState.data) return reviewsState.data;
    if (reviewsState && reviewsState.review) return reviewsState.review;
    return [];
  }, [reviewsState]);

  const { avg, count } = useMemo(() => {
    const n = Array.isArray(reviewsArray) ? reviewsArray.length : 0;
    if (n === 0) return { avg: 0, count: 0 };

    const sum = reviewsArray.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    const average = sum / n;
    return { avg: average, count: n };
  }, [reviewsArray]);

  const roundedHalf = Math.round(avg * 2) / 2;

  const renderStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(value)) {
        stars.push(<FaStar key={i} className="pd-star full" />);
      } else if (i === Math.floor(value) + 1 && value % 1 >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="pd-star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="pd-star empty" />);
      }
    }
    return stars;
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === product.image.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? product.image.length - 1 : prev - 1));
  };

  const handleDot = (i) => {
    setDirection(i > current ? "right" : "left");
    setCurrent(i);
  };

  useEffect(() => {
    if (!product?.image) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === product.image.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [product?.image]);

  useEffect(() => {
    let mounted = true;

    async function getProduct() {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/products/${id}`, {
          withCredentials: true,
        });
        if (!mounted) return;
        setProduct(res?.data?.data || res?.data?.product || null);
      } catch (err) {
        console.error("Error fetching product:", err);
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    async function getReviews() {
      try {
        setReviewsLoading(true);
        const res = await axios.get(`${BASE_URL}/reviews/${id}`, {
          withCredentials: true,
        });
        const payload = res?.data?.data ?? res?.data ?? null;
        if (payload) {
          dispatch(AddReview(payload));
        }
      } catch (err) {
        console.error(
          "Error fetching reviews:",
          err.response?.data || err.message
        );
      } finally {
        setReviewsLoading(false);
      }
    }

    getProduct();
    getReviews();

    return () => {
      mounted = false;
    };
  }, [id, dispatch]);

  if (loading) return <Loading />
  if (!product) return <div style={{ color: "white" }}>Product not found</div>;
  console.log(product);

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="pd-carousel">
          <button className="pd-arrow left" onClick={handlePrev}>
            ❮
          </button>

          <div className="pd-image-box">
            <img
              src={`${BASE_URL}${product.image[current]}`}
              alt=""
              className="pd-main-img"
            />
          </div>

          <button className="pd-arrow right" onClick={handleNext}>
            ❯
          </button>

          <div className="pd-dots">
            {product.image.map((_, i) => (
              <div
                key={i}
                className={`pd-dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          <p className="desc desc-desktop">{product.description}</p>
          {product.actualPrice ? (
            <div className="price-boxX">
              <p className="selling-price">₹{product.price}</p>
              <span className="actual-price">₹{product.actualPrice}</span>
              <span className="discount-badge">
                {Math.round(
                  ((product.actualPrice - product.price) /
                    product.actualPrice) *
                    100
                )}
                % OFF
              </span>
            </div>
          ) : (
            <p className="price-page-productdetail">₹{product.price}</p>
          )}
          {isWaxArt && (
            <div className="color-selector">
              <p>Choose Wax Color: <span className="candle-desc-details">{selectedColor}</span></p>
              <div className="color-options">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`color-circle ${color} ${
                      selectedColor === color ? "active" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="add-to-cartX">
            {cartItems[variantKey] ? (
              <div className="cart-add-sub-productdetail">
                <FaMinus
                  className="sub-button"
                  onClick={() => dispatch(RemoveFromCart(variantKey))}
                />
                <span>
                  {typeof cartItems[variantKey] === "number"
                    ? cartItems[variantKey]
                    : cartItems[variantKey]?.quantity}
                </span>

                <FaPlus
                  className="add-button"
                  onClick={() =>
                    dispatch(
                      AddToCart({
                        variantKey,
                        productId: product._id,
                        color: isWaxArt ? selectedColor : null,
                      })
                    )
                  }
                />
              </div>
            ) : (
              <div className="productdetail-btn">
                <button
                  className="cart-add-btn"
                  onClick={() =>
                    dispatch(
                      AddToCart({
                        variantKey,
                        productId: product._id,
                        color: isWaxArt ? selectedColor : null,
                      })
                    )
                  }
                >
                  Add To Cart
                </button>
                <button
                  className="buynow-add-btn"
                  onClick={() => {
                    dispatch(
                      AddToCart({
                        variantKey,
                        productId: product._id,
                        color: isWaxArt ? selectedColor : null,
                      })
                    );
                    navigate("/cart");
                  }}
                >
                  Buy Now
                </button>
              </div>
            )}
          </div>

          {reviewsArray.length > 0 && (
            <div className="pd-average-block">
              <div className="pd-average-stars">{renderStars(roundedHalf)}</div>
              <div className="pd-average-number">
                {count > 0 ? avg.toFixed(2) : "0.00"}
              </div>
              <p className="hiphen">|</p>
              <div className="pd-review-count">
                ({count} review{count !== 1 ? "s" : ""})
              </div>
            </div>
          )}
          <div className="desc candle-desc">
            <p>
              Wax Used :{" "}
              <span className="candle-desc-details">
                {product.materialUsed}
              </span>
            </p>
            <p>
              Fragrance :{" "}
              <span className="candle-desc-details">
                {product.fragranceType}
              </span>
            </p>
            {product.scentName && (
              <p>
                Scent :{" "}
                <span className="candle-desc-details">{product.scentName}</span>
              </p>
            )}
            <p>
              Burn Time :{" "}
              <span className="candle-desc-details">{product.burnTime}</span>
            </p>
            <p>
              Weight :{" "}
              <span className="candle-desc-details">{product.weight}</span>
            </p>
            <div>
              {" "}
              Description:{" "}
              <p className="desc desc-mobile">{product.description}</p>
            </div>
          </div>

          <div className="add-to-cart">
            {cartItems[variantKey] ? (
              <div className="cart-add-sub-productdetail">
                <FaMinus
                  className="sub-button"
                  onClick={() => dispatch(RemoveFromCart(variantKey))}
                />
                <span>
                  {typeof cartItems[variantKey] === "number"
                    ? cartItems[variantKey]
                    : cartItems[variantKey]?.quantity}
                </span>

                <FaPlus
                  className="add-button"
                  onClick={() =>
                    dispatch(
                      AddToCart({
                        variantKey,
                        productId: product._id,
                        color: selectedColor,
                      })
                    )
                  }
                />
              </div>
            ) : (
              <div className="productdetail-btn">
                <button
                  className="cart-add-btn"
                  onClick={() =>
                    dispatch(
                      AddToCart({
                        variantKey,
                        productId: product._id,
                        color: isWaxArt ? selectedColor : null,
                      })
                    )
                  }
                >
                  Add To Cart
                </button>
                <button
                  className="buynow-add-btn"
                  onClick={() => {
                    dispatch(
                      AddToCart({
                        variantKey,
                        productId: product._id,
                        color: isWaxArt ? selectedColor : null,
                      })
                    );
                    navigate("/cart");
                  }}
                >
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="reviews">
        <h1>Reviews</h1>

        {reviewsLoading && <p style={{ color: "white" }}>Loading reviews...</p>}

        {!reviewsLoading && reviewsArray.length === 0 && (
          <p style={{ color: "white" }}>No reviews yet.</p>
        )}

        {!reviewsLoading && reviewsArray.length > 0 && (
          <div className="reviews-list">
            {reviewsArray.map((r) => (
              <div
                key={r._id}
                className="single-review"
                style={{ color: "white", marginBottom: 12 }}
              >
                <div className="user-name-date">
                  <div style={{ fontWeight: "bold" }}>
                    {r.userId && typeof r.userId === "object"
                      ? r.userId.fullName ||
                        `${r.userId.firstName || ""} ${
                          r.userId.lastName || ""
                        }` ||
                        r.userId.email
                      : r.userName || "Anonymous"}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {new Date(r.createdAt).toLocaleString().slice(0, 10)}
                  </div>
                </div>
                <hr />
                <div className="user-rating">
                  <div style={{ display: "flex" }}>{renderStars(r.rating)}</div>
                </div>
                <div className="user-review-images">
                  {r.images.length > 0 &&
                    r.images.map((img, idx) => {
                      return (
                        <img
                          onClick={() =>
                            setPreviewImage(`${BASE_URL}${encodeURI(img)}`)
                          }
                          key={idx}
                          src={`${BASE_URL}${encodeURI(img)}`}
                          alt={`Review Image ${idx + 1}`}
                          className="review-image"
                        />
                      );
                    })}
                </div>

                <div style={{ opacity: 0.9 }}>{r.comment}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {previewImage && (
        <div
          className="image-preview-overlay"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="image-preview-box"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={previewImage} alt="Preview" />

            <button
              className="close-preview"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Link
        to={`/collections/${product.collection?.slug || ""}`}
        className="back-link"
      >
        ← Back to Collection
      </Link>
    </div>
  );
};

export default ProductDetail;
