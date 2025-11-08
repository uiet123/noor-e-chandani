import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { ClearCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {



  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const allProducts = useSelector((state) => state.product.allProducts);
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



  // Step 2: Polling helper — paste inside component (after states)
const pollPaymentStatus = async (orderId) => {
  const attempts = 6;       // total attempts
  const delayMs = 2000;     // 2 seconds between attempts

  for (let i = 0; i < attempts; i++) {
    try {
      const res = await axios.get(`${BASE_URL}/payment/status/${orderId}`, { withCredentials: true });
      const st = (res.data?.status || "").toLowerCase();
      console.log(`Poll ${i+1}:`, st);

      if (st === "captured" || st === "authorized") {
        // success
        setPaymentError(null);
        dispatch(ClearCart());
        navigate("/thank-you");
        return { ok: true, status: st };
      }

      if (st === "failed" || st === "cancelled" || st === "refused") {
        setPaymentError("❌ Payment failed — please try again.");
        return { ok: false, status: st };
      }

      // else: pending/created -> wait and retry
    } catch (err) {
      console.warn("poll error:", err?.response?.data || err.message);
      // ignore and continue retrying
    }

    // wait before next attempt
    await new Promise((r) => setTimeout(r, delayMs));
  }

  // timed out -> still pending
  setPaymentError("⌛ Payment pending. If amount was debited, check Orders after a minute.");
  return { ok: false, status: "pending" };
};




  const verifyPayment = async (razorpayResponse) => {
    try{
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
      // pollPaymentStatus ne khud success handle kar liya (redirect, clear cart)
      console.log("Payment verified successfully:", result.status);
    } else {
      // poll ne fail ya pending diya
      console.log("Payment verification result:", result.status);
    }


    }catch(err){
      console.error("verifyPayment error:", err?.response?.data || err.message);
    setPaymentError("❌ Could not verify payment. Please try again or check your Orders.");
    }
     finally {
    setisProcessing(false);  // loader stop
  }
  }


  const handleClick = async () => {
    try{
        const items = cartProducts.map((p) => ({
      productId: p._id,
      name: p.name,
      price: p.price,
      quantity: cartItems[p._id],
      image: p.image,
    }));

       const payload = {
      items,
      shippingAddress: address,
      subtotal: totalPrice,
      shippingCharge: 50,
      totalAmount: totalPrice + 50,
    };

      const res = await axios.post(BASE_URL + "/payment/create" , 
      payload
    , {withCredentials: true})

    const {amount, keyId, currency, notes, orderId} = res.data
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
        color: "gold"
    },
    handler : verifyPayment
};
    

    const rzp = new window.Razorpay(options)
  rzp.open();

     console.log("Payment create response:", res.data);
  
    }
    catch(err){
      console.log(err);
      alert("❌ Error calling /payment/create API");
    }
    
  }



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

          <button onClick={() => handleClick()} className="pay-btn" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay and Proceed"}
          </button>

            {paymentError && (
  <div className="payment-result">
    <p>{paymentError}</p>

    <div className="payment-actions">
      {/* Retry or Refresh button */}
      <button
        onClick={() => {
          if (currentOrderId) pollPaymentStatus(currentOrderId);
          else handleClick(); // if no order, start new
        }}
      >
        {currentOrderId ? "Refresh Status" : "Retry Payment"}
      </button>

      {/* View Orders */}
      <button onClick={() => (window.location.href = "/orders")}>
        View Orders
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Checkout;