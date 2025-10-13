import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { ClearCart } from "../../store/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const allProducts = useSelector((state) => state.product.allProducts);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  // 🧮 Calculate Total and Filter Products
  useEffect(() => {
    const filtered = allProducts.filter((p) => cartItems[p._id]);
    setCartProducts(filtered);
    const total = filtered.reduce(
      (sum, p) => sum + p.price * cartItems[p._id],
      0
    );
    setTotalPrice(total);
  }, [cartItems, allProducts]);

  // ✅ Basic Address Validation
  const validateForm = () => {
    let temp = {};
    if (!address.fullName) temp.fullName = "Full name is required";
    if (!address.phone || address.phone.length !== 10)
      temp.phone = "Valid phone number required";
    if (!address.street) temp.street = "Street address is required";
    if (!address.city) temp.city = "City is required";
    if (!address.state) temp.state = "State is required";
    if (!address.pincode || address.pincode.length !== 6)
      temp.pincode = "Valid 6-digit pincode required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;
    alert("✅ Checkout successful (frontend-only demo)");
    dispatch(ClearCart());
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        {/* Address Form */}
        <div className="address-section">
          <h3>Shipping Address</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
            {errors.street && <p className="error">{errors.street}</p>}
          </div>

          <div className="form-group">
            <div>
              <label>City</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
              {errors.state && <p className="error">{errors.state}</p>}
            </div>
          </div>

          <div className="form-group">
            <div>
              <label>Pincode</label>
              <input
                type="number"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />
              {errors.pincode && <p className="error">{errors.pincode}</p>}
            </div>
            <div>
              <label>Country</label>
              <input type="text" value={address.country} disabled />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartProducts.map((p) => (
              <div className="summary-item" key={p._id}>
                <img src={`${BASE_URL}${p.image}`} alt={p.name} />
                <div>
                  <p>{p.name}</p>
                  <span>
                    ₹{p.price} × {cartItems[p._id]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <p>
              Subtotal: <b>₹{totalPrice}</b>
            </p>
            <p>
              Shipping: <b>₹50</b>
            </p>
            <hr />
            <p className="grand-total">
              Total: <b>₹{totalPrice + 50}</b>
            </p>
          </div>

          <button className="pay-btn" onClick={handlePayment}>
            Pay & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
