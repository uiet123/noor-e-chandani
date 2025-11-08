import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CollectionData } from "../../data/CollectionData";
import { AddToCart, RemoveFromCart } from "../../store/cartSlice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { setProducts } from "../../store/productSlice";
import "./CollectionDetails.css";

const CollectionDetail = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // { [id]: qty }
  const products = useSelector(state => state.product.products)
  const collectionSlug = useSelector(state => state.collection.collections)

  const { slug } = useParams();
  const collection = CollectionData.find((c) => c.slug === slug);

  if (!collection) {
    return <h2 style={{ color: "white" }}>Collection not found</h2>;
  }

  useEffect(() => {
    async function getProducts() {
       const res = await axios.get(`${BASE_URL}/collections/${slug}`, {
        withCredentials: true
       })
       dispatch(setProducts(res?.data?.data?.products))
      
    }
    getProducts()
  },[])
  console.log(collectionSlug)

  return (
    <div className="collection-detail">
      <h2>{collection.name}</h2>
      <p className="collection-desc">{collection.description}</p>

      <div className="products-grid">
        {products.map((item) => (
          <div key={item._id} className="product-card">
            <img src={`${BASE_URL}${item.image}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="price-add-btn">
                <p className="price">₹{item.price}</p>

            {cartItems[item._id]?<div className="cart-add-sub">
                <FaMinus className="sub-button" onClick={() => dispatch(RemoveFromCart(item._id))}></FaMinus>
                <p id="cart-text">{cartItems[item._id]}</p>
                <FaPlus className="add-button" onClick={() => dispatch(AddToCart(item._id))}></FaPlus>
            </div> :<button className="cart-add-btn" onClick={() => dispatch(AddToCart(item._id))}>Add</button>}
            </div>
            
            
          </div>
        ))}
      </div>

      <Link to="/" className="back-link">← Back to Collections</Link>
    </div>
  );
};

export default CollectionDetail;
