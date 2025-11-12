import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { CollectionData } from "../../data/CollectionData";
import { RemoveFromCart, AddToCart, ClearCart } from "../../store/cartSlice";
import { BASE_URL } from "../../utils/constants";
import { setAllProducts } from "../../store/productSlice";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  const cartItems = useSelector((state) => state.cart.items); // {101:2, 202:1...}
  const allProduct = useSelector(state => state.product.allProducts)


  // Filter only products which are in cart
  const cartProducts = allProduct.filter((p) => cartItems[p._id]);

  const totalPrice = cartProducts.reduce(
    (sum, p) => sum + p.price * cartItems[p._id],
    0
  );

    useEffect(() => {
    async function getAllProducts() {
      try{
        const res = await axios.get(`${BASE_URL}/products`, {
          withCredentials: true
        })
        dispatch(setAllProducts(res?.data?.data))
      }catch(err) {
        console.error(err.message)
      }
       }
       getAllProducts()
  },[])

  if (cartProducts.length === 0) {
    return <h2 className="empty-cart">🛒 Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cartProducts.map((product) => (
          <div key={product._id} className="cart-item">
            <div className="thumb">
            <img src={`${BASE_URL}${product.image}`} alt={product.name} />
            <div className="counter-bar counter-in">
            <button className="icon-btn" onClick={() => dispatch(RemoveFromCart(product._id))}>
                <FaMinus />
              </button>
              <span className="thumb-number">{cartItems[product._id]}</span>
              <button className="icon-btn" onClick={() => dispatch(AddToCart(product._id))}>
                <FaPlus />
              </button>
              </div>
            </div>
            <div className="cart-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p className="subtotal">Subtotal: ₹{product.price * cartItems[product._id]}</p>
              <div className="counter-bar counter-out">
            <FaMinus className="icon-btn" onClick={() => dispatch(RemoveFromCart(product._id))}>
                -
              </FaMinus>
              <span className="thumb-number">{cartItems[product._id]}</span>
              <FaPlus className="icon-btn" onClick={() => dispatch(AddToCart(product._id))}>
                
              </FaPlus>
              </div>
            </div>
             
          </div>
          
        ))}
        
      </div>

      <div className="cart-footer">
        <div className="cart-footer-checkout">
        <h3>Total: ₹{totalPrice}</h3>
        <Link to={user ? "/checkout": "/login"}><button className="checkout-btn">Checkout</button></Link>
        </div>
        <button className="trash" onClick={() => dispatch(ClearCart())}><GoTrash /></button>
      </div>
    </div>
  );
};

export default Cart;
