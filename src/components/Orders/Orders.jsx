import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../store/orderSlice";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(`${BASE_URL}/orders`, {
          withCredentials: true,
        });
        dispatch(setOrder(res?.data?.data));
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchOrders();
  }, [dispatch]);

  if (!Array.isArray(orders) || orders.length === 0) {
    return <div className="empty-orders">You haven’t placed any orders yet.</div>;
  }



  return (<>
  {user &&  <div className="orders-page">
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
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.name}
                  className="order-item-image"
                />
                <div className="order-item-info">
                  <h3>{item.name}</h3>
                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <p>
              <strong>Shipping:</strong> ₹{order.shippingCharge}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  order.orderStatus === "Pending"
                    ? "Pending"
                    : "Delivered"
                }`}
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
    </div>}
   
  </>);
};

export default Orders;
