import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { ClearCart } from "../../store/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const allProducts = useSelector((state) => state.product.allProducts);
  const customItems = useSelector((state) => state.cart.customItems);
  const navigate = useNavigate();

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
  const [isProcessing, setisProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  console.log(customItems);

  const { finalTotal = 0 } = location.state || {};

  const pollPaymentStatus = async (orderId) => {
    const attempts = 6;
    const delayMs = 2000;
    for (let i = 0; i < attempts; i++) {
      try {
        const res = await axios.get(`${BASE_URL}/payment/status/${orderId}`, {
          withCredentials: true,
        });
        const st = (res.data?.status || "").toLowerCase();
        console.log(`Poll ${i + 1}:`, st);

        if (st === "captured" || st === "authorized") {
          setPaymentError(null);
          dispatch(ClearCart());
          navigate("/thank-you");
          return { ok: true, status: st };
        }

        if (st === "failed" || st === "cancelled" || st === "refused") {
          setPaymentError("❌ Payment failed — please try again.");
          return { ok: false, status: st };
        }
      } catch (err) {
        console.warn("poll error:", err?.response?.data || err.message);
      }

      await new Promise((r) => setTimeout(r, delayMs));
    }

    setPaymentError(
      "⌛ Payment pending. If amount was debited, check Orders after a minute."
    );
    return { ok: false, status: "pending" };
  };

  const verifyPayment = async (razorpayResponse) => {
    try {
      setisProcessing(true);
      setPaymentError(null);

      const orderId = razorpayResponse?.razorpay_order_id;

      if (!orderId) {
        console.error("No razorpay_order_id in response:", razorpayResponse);
        setPaymentError("❌ Payment response missing order ID.");
        return;
      }

      setCurrentOrderId(orderId);

      const result = await pollPaymentStatus(orderId);
      if (result.ok) {
        console.log("Payment verified successfully:", result.status);
      } else {
        console.log("Payment verification result:", result.status);
      }
    } catch (err) {
      console.error("verifyPayment error:", err?.response?.data || err.message);
      setPaymentError(
        "❌ Could not verify payment. Please try again or check your Orders."
      );
    } finally {
      setisProcessing(false);
    }
  };

  const handleClick = async () => {
    setisProcessing(true);
    try {
      if (!validateForm()) {
        setisProcessing(false);
        throw new Error("Please fill the form correctly");
      }
      const normalItems = cartProducts.map((p) => ({
        productId: p._id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        color: p.color || null,
        fragrance: p.fragrance || null,
        image: Array.isArray(p.image) ? p.image[0] : p.image,
      }));

      const customPayloadItems = customItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
        isCustom: true,
        customDetails: item.customDetails,
      }));

      const items = [...normalItems, ...customPayloadItems];

      const payload = {
        items,
        shippingAddress: address,
        subtotal: totalPrice,
        shippingCharge: 120,
        totalAmount: finalTotal,
      };

      console.log("FINAL PAYLOAD:", payload);

      const res = await axios.post(BASE_URL + "/payment/create", payload, {
        withCredentials: true,
      });

      const { amount, keyId, currency, notes, orderId } = res.data;
      var options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Noor-e-Chandani",
        description: "Thanks for shopping with us",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "gold",
        },
        handler: verifyPayment,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setErrors({});
    } catch (err) {
      setisProcessing(false);
      setPaymentError("Please check your filled details and try again.");
      console.log(err);
    }
  };

  useEffect(() => {
    const entries = Object.entries(cartItems);

    const products = entries
      .map(([key, value]) => {
        const isVariant = typeof value === "object";
        const productId = isVariant ? value.productId : key;

        const product = allProducts.find((p) => p._id === productId);
        if (!product) return null;

        return {
          ...product,
          cartKey: key,
          quantity: isVariant ? value.quantity : value,
          color: isVariant ? value.color : null,
          fragrance: isVariant ? value.fragrance : null,
        };
      })
      .filter(Boolean);

    setCartProducts(products);

    const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    setTotalPrice(total);
  }, [cartItems, allProducts]);

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

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-grid">
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
              type="tel"
              value={address.phone}
              maxLength={10}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Home Address</label>
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

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartProducts.map((p) => (
              <div className="summary-item" key={p.cartKey}>
                <img src={`${BASE_URL}${p.image[0]}`} alt={p.name} />
                <div>
                  <p>{p.name}</p>
                  {p.color && p.color !== "Default" && p.color !== "Fixed" && (
                    <p className="variant-info">
                      Wax Color: <b>{p.color}</b>
                    </p>
                  )}

                  {p.fragrance &&
                    p.fragrance !== "Default" &&
                    p.fragrance !== "Fixed" && (
                      <p className="variant-info">
                        Fragrance: <b>{p.fragrance}</b>
                      </p>
                    )}

                  <span>
                    ₹{p.price} × {p.quantity}
                  </span>
                </div>
              </div>
            ))}
            {customItems.length > 0 &&
              customItems.map((item, idx) => (
                <div className="summary-item" key={idx}>
                  <img src={`${BASE_URL}${item.image}`} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>
                      ₹{item.price} × {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          <div className="summary-totals">
            <p className="grand-total">
              <b>Final Total: ₹{finalTotal}</b>
            </p>
          </div>

          <button
            onClick={() => handleClick()}
            className="pay-btn"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay and Proceed"}
          </button>

          {paymentError && (
            <div className="payment-result">
              <p>{paymentError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
