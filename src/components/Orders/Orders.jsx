import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../store/orderSlice";
import { AddReview } from "../../store/reviewSlice";
import "./Orders.css";
import { CiStar } from "react-icons/ci";

const Orders = () => {
  const [ratingMap, setRatingMap] = useState({});
  const [imageMap, setImageMap] = useState({});
  const [commentMap, setCommentMap] = useState({});
  const [submittedMap, setSubmittedMap] = useState({});
  const [loadingSubmitMap, setLoadingSubmitMap] = useState({});
  const [imgErrorMap, setImgErrorMap] = useState({});
  const [ratingErrorMap, setRatingErrorMap] = useState({});

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user.user);
  

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(`${BASE_URL}/orders`, {
          withCredentials: true,
        });
        dispatch(setOrder(res?.data?.data || []));
      } catch (err) {
        console.error("fetchOrders err:", err);
      }
    }
    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(orders) || orders.length === 0) return;

    let mounted = true;
    (async () => {
      try {
        const newSubmitted = {};

        const checks = [];

        for (const order of orders) {
          for (const item of order.items) {
            if (order.orderStatus !== "Delivered") continue;

            const url = `${BASE_URL}/orders/${order._id}/products/${item._id}/can-review`;
            checks.push(
              axios
                .get(url, { withCredentials: true })
                .then((res) => {
                  
                     if (res?.data?.canReview === false) {
      newSubmitted[`${order._id}_${item._id}`] = true;
    }
                 
                })
                .catch((err) => {
                   const msg = err.response?.data?.message;
                     if (msg && msg.includes("already reviewed")) {
      newSubmitted[`${order._id}_${item._id}`] = true;
    }
                })
            );
          }
        }

        await Promise.all(checks);
        if (mounted && Object.keys(newSubmitted).length) {
          setSubmittedMap((prev) => ({ ...prev, ...newSubmitted }));
        }
      } catch (e) {
        console.error("populate submittedMap err:", e);
      }
      return () => {
        mounted = false;
      };
    })();
  }, [orders]);

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="empty-orders">You haven’t placed any orders yet.</div>
    );
  }

  const makeKey = (orderId, orderItemId) => `${orderId}_${orderItemId}`;

  const HandleRating = (star, orderItemId, order) => {
    const key = makeKey(order._id, orderItemId);
    setRatingErrorMap((prev) => ({ ...prev, [key]: false }));

    setRatingMap((prev) => ({ ...prev, [key]: star }));
  };

  const submitReview = async (orderId, orderItemId) => {
    const key = makeKey(orderId, orderItemId);
    const rating = ratingMap[key] || 0;
    const comment = commentMap[key] || "";
    const images = imageMap[key] || [];

    if (!rating) {
      setRatingErrorMap((prev) => ({ ...prev, [key]: true }));
      return;
    }

    try {
      setLoadingSubmitMap((prev) => ({ ...prev, [key]: true }));

      const formData = new FormData();
      formData.append("r", rating);
      formData.append("comment", comment);

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.post(
        `${BASE_URL}/orders/${orderId}/products/${orderItemId}/review`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const created = res?.data?.review ?? res?.data?.data ?? res?.data;
      try {
        dispatch(AddReview(created));
      } catch (e) {}

      setSubmittedMap((prev) => ({ ...prev, [key]: true }));
      setRatingMap((prev) => ({ ...prev, [key]: 0 }));
      setCommentMap((prev) => ({ ...prev, [key]: "" }));
      setImageMap((prev) => ({ ...prev, [key]: [] }));
    } catch (err) {
       const msg = err.response?.data?.message;

  // 🔥 IMPORTANT: backend bol raha hai review already ho chuka
  if (msg && msg.includes("already reviewed")) {
    setSubmittedMap((prev) => ({
      ...prev,
      [key]: true,
    }));
  }

  console.error("submitReview error:", msg || err.message);
    } finally {
      setLoadingSubmitMap((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="orders-page">
      <h2 className="orders-heading">Your Orders</h2>

      {[...orders].reverse().map((order) => (
        <div key={order._id} className="order-box">
          <div className="order-header">
            <p>
              <strong>Order Placed:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => {
              const key = makeKey(order._id, item._id);
              const isSubmittedLocal = !!submittedMap[key];

             const alreadyReviewed = submittedMap[key];


              return (
                <div className="order-item" key={key}>
                  <div className="order-item-info">
                    <img
                      src={`${BASE_URL}${item.image}`}
                      alt={item.name}
                      className="order-item-image"
                    />

                    <div className="order-item-details">
                      <h3>{item.name}</h3>
                      {item.color && <h4>Colour : {item.color}</h4>}
                      {item.customDetails.isCustom && (
                        <>
                          <p>Glass Type: {item.customDetails.glassType}</p>
                          <p>Wax: {item.customDetails.waxType}</p>
                          {item.customDetails.messageType !== "none" && (
                            <p>
                              Message Type: {item.customDetails.messageType}
                            </p>
                          )}
                          {item.customDetails.messageText !== "" && (
                            <p>
                              Message Text: {item.customDetails.messageText}
                            </p>
                          )}
                          {item.customDetails.layers !== "" && (
                            <p>Layers: {item.customDetails.layers}</p>
                          )}
                          {item.customDetails.layer1Color !== "" && (
                            <p>
                              Top Layer colour: {item.customDetails.layer1Color}
                            </p>
                          )}
                          {item.customDetails.layer2Color !== "" && (
                            <p>
                              Bottom Layer colour:{" "}
                              {item.customDetails.layer2Color}
                            </p>
                          )}
                          {item.customDetails.fragrance !== "" && (
                            <p>Fragrance: {item.customDetails.fragrance}</p>
                          )}
                        </>
                      )}
                      <p>
                        ₹{item.price} × {item.quantity}
                      </p>
                      <p>Subtotal: ₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <div className="order-review-section">
                    {order.orderStatus === "Delivered" &&
                      (submittedMap[key] ? (
                        <p className="thanks-text">Thanks for the review.</p>
                      ) : (
                        <div className="reviews-section">
                          <div className="stars">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const starNum = i + 1;
                              const currentRating = ratingMap[key] || 0;
                              return (
                                <div
                                  className="rating"
                                  key={starNum}
                                  onClick={() =>
                                    HandleRating(starNum, item._id, order)
                                  }
                                >
                                  <CiStar
                                    className={
                                      starNum <= currentRating
                                        ? "active-rating"
                                        : "rating"
                                    }
                                  />
                                </div>
                              );
                            })}
                          </div>
                          {ratingErrorMap[key] && (
                            <span style={{ color: "red", marginTop: "-6px" }}>
                              Please give the rating.
                            </span>
                          )}

                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="image-input"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);

                              if (files.length > 5) {
                                setImgErrorMap((prev) => ({
                                  ...prev,
                                  [key]: true,
                                }));
                                e.target.value = "";
                                return;
                              }

                              setImgErrorMap((prev) => ({
                                ...prev,
                                [key]: false,
                              }));

                              setImageMap((prev) => ({
                                ...prev,
                                [key]: files,
                              }));
                            }}
                          />

                          {imgErrorMap[key] && (
                            <span style={{ color: "red" }}>
                              Please upload a maximum of 5 images.
                            </span>
                          )}

                          <textarea
                            className="review-textarea"
                            placeholder="Give your review here."
                            value={commentMap[key] || ""}
                            maxLength={100}
                            onChange={(e) =>
                              setCommentMap((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                              }))
                            }
                          />
                          <span className="char-count">
                            {commentMap[key]?.length || 0}/100
                          </span>

                          <button
                            type="button"
                            className="review-btnn"
                            onClick={() => submitReview(order._id, item._id)}
                            disabled={!!loadingSubmitMap[key]}
                          >
                            {loadingSubmitMap[key]
                              ? "Submitting..."
                              : "Submit Review"}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-summary">
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Order status:</strong>{" "}
              <span
                className={
                  order.orderStatus === "Pending" ? "Pending" : "Delivered"
                }
              >
                {order.orderStatus}
              </span>
            </p>
            <p className="delivery-info">
              Estimated delivery between <strong>5 to 7 days</strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
