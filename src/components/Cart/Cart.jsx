import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveFromCart, AddToCart, ClearCart } from "../../store/cartSlice";
import { BASE_URL } from "../../utils/constants";
import { setAllProducts } from "../../store/productSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { AddCustomItem, RemoveCustomItem } from "../../store/cartSlice";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items); 
  const customItems = useSelector((state) => state.cart.customItems);
  const allProduct = useSelector((state) => state.product.allProducts);
  const cartEntries = Object.entries(cartItems);

const cartProducts = cartEntries
  .map(([key, value]) => {
    const isVariant = typeof value === "object";
    const productId = isVariant ? value.productId : key;

    const product = allProduct.find((p) => p._id === productId);
    if (!product) return null;

    return {
      ...product,
      cartKey: key,
      quantity: isVariant ? value.quantity : value,
      color: isVariant ? value.color : null,
    };
  })
  .filter(Boolean);

  console.log(customItems)

  const normalTotal = cartProducts.reduce(
  (sum, p) => sum + p.price * p.quantity,
  0
);

  const customTotal = customItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrice = normalTotal + customTotal;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [finalTotal, setFinalTotal] = useState(totalPrice);
  const shippingCharge = Number(import.meta.env.VITE_SHIPPING_CHARGE);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const applyCoupon = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/apply-coupon`,
        {
          couponCode: coupon,
          cartTotal: totalPrice,
        },
        { withCredentials: true }
      );

      setDiscount(res.data.discount);
      setFinalTotal(res.data.finalAmount);
      setCouponApplied(true);
      setCouponMsg("");
      setError("");

      setCouponMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Coupon");
    }
  };

  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/products`, {
          withCredentials: true,
        });
        dispatch(setAllProducts(res?.data?.data));
      } catch (err) {
        console.error(err.message);
      }
    }
    getAllProducts();
  }, []);




  useEffect(() => {
    setFinalTotal(totalPrice + shippingCharge - discount);
  }, [totalPrice, discount]);

  useEffect(() => {
    if (couponApplied) {
      const newDiscount = Math.floor((totalPrice * 10) / 100);
      setDiscount(newDiscount);
      setFinalTotal(totalPrice + shippingCharge - newDiscount);
    } else {
      setFinalTotal(totalPrice + shippingCharge);
    }
  }, [totalPrice]);

  if (cartProducts.length === 0 && customItems.length === 0) {
    return <h2 className="empty-cart">🛒 Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cartProducts.map((product) => (
          <div key={product.cartKey} className="cart-item">
            <div className="thumb">
              <img src={`${BASE_URL}${product.image[0]}`} alt={product.name} />
              <div className="counter-bar counter-in">
                <button
                  className="icon-btn"
                  onClick={() => dispatch(RemoveFromCart(product.cartKey))}
                >
                  <FaMinus />
                </button>
                <span className="thumb-number">{product.quantity}</span>
                <button
                  className="icon-btn"
                  onClick={() => dispatch(AddToCart( product.color
                  ? {
                      variantKey: product.cartKey,
                      productId: product._id,
                      color: product.color,
                    }
                  : product._id))}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="cart-info">
              <h3>{product.name}</h3>
              {product.color && (
  <p className="variant-info">Color: {product.color}</p>
)}
              <p>₹{product.price}</p>
              <p className="subtotal">
                Subtotal: ₹{product.price * product.quantity}
              </p>
              <div className="counter-bar counter-out">
                <FaMinus
                  className="icon-btn"
                  onClick={() => dispatch(RemoveFromCart(product.cartKey))}
                >
                  -
                </FaMinus>
                <span className="thumb-number">{product.quantity}</span>
                <FaPlus
                  className="icon-btn"
                  onClick={() => dispatch(AddToCart( product.color
                  ? {
                      variantKey: product.cartKey,
                      productId: product._id,
                      color: product.color,
                    }
                  : product._id))}
                ></FaPlus>
              </div>
            </div>
          </div>
        ))}
        <div className="custom-cart-items">
          {customItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="thumb">
                <img src={`${BASE_URL}${item.image}`} alt="custom-candle" />

                <div className="counter-bar counter-in">
                  <button
                    className="icon-btn"
                    onClick={() => dispatch(RemoveCustomItem(index))}
                  >
                    <FaMinus />
                  </button>

                  <span className="thumb-number">{item.quantity}</span>

                  <button
                    className="icon-btn"
                    onClick={() =>
                      dispatch(
                        AddCustomItem({
                          ...item,
                          quantity: 1,
                          customDetails: item.customDetails,
                        })
                      )
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.customDetails.glassType}</p>
                <p>{item.customDetails.waxType}</p>
                <p>{item.customDetails.layers}</p>   
                {item.customDetails.layer1Color && (
                  <p>Top layer colour: {item.customDetails.layer1Color}</p>
                )}
                {item.customDetails.layer2Color && (
                  <p>Bottom layer colour: {item.customDetails.layer2Color}</p>
                )}        
                {item.customDetails.fragrance && (
                  <p>Fragrance: {item.customDetails.fragrance}</p>
                )}
                {item.customDetails.messageText && (
                  <p>Message: {item.customDetails.messageText}</p>
                )}
                <p>₹{item.price}</p>
                <p className="subtotal">
                  Subtotal: ₹{item.price * item.quantity}
                </p>
                <div className="counter-bar counter-out">
                  <FaMinus
                    className="icon-btn"
                    onClick={() => dispatch(RemoveCustomItem(index))}
                  />
                  <span className="thumb-number">{item.quantity}</span>
                  <FaPlus
                    className="icon-btn"
                    onClick={() =>
                      dispatch(
                        AddCustomItem({
                          ...item,
                          quantity: 1,
                          customDetails: item.customDetails,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="coupon-section">
        <div className="coupon-section-code">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="coupon-input"
          />
          <Link to={user ? "" : "/login"}>
            <button
              className="coupon-btn"
              onClick={applyCoupon}
              disabled={couponApplied}
            >
              {couponApplied ? "Applied" : "Apply"}
            </button>
          </Link>
        </div>
        <div>
          {error && <p className="coupon-error">{error}</p>}
          {couponMsg && <p className="coupon-success">{couponMsg}</p>}
        </div>
      </div>

      <div className="cart-footer">
        <div className="cart-footer-checkout">
          <div className="cart-footer-checkout-info">
            <h6>Subtotal: ₹{totalPrice}</h6>

            {discount > 0 && (
              <h6 style={{ color: "green" }}>Discount: -₹{discount}</h6>
            )}
            <h6>Shipping: ₹{shippingCharge}</h6>

            <h6>Final Total: ₹{finalTotal}</h6>
          </div>
          <Link
            to={user ? "/checkout" : "/login"}
            state={{ finalTotal: finalTotal }}
          >
            <button className="checkout-btn">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
