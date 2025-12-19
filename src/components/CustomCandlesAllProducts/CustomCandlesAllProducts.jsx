/*import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./CustomCandlesAllProducts.css";
import { AddCustomCandle } from "../../store/customProductSlice";

const CustomCandlesAllProducts = () => {
  const dispatch = useDispatch();
  const customProducts = useSelector(
    (state) => state.customCandles.customCandles
  );

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/get-custom-candle`);
        dispatch(AddCustomCandle(res.data.data)); 
      } catch (err) {
        console.log("Error loading custom products", err.message);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="collections-customCandles">
      <h2>Customize your Candles</h2>
    <div className="collections-items-customCandles">
      {customProducts.map((product) => (
        <Link key={product.id} to={`/customize/${product.slug}`} className="card-customCandles">     
            <img src={`${BASE_URL}${product.image[0]}`} alt="img" />
              <h3>{product.name}</h3> 
        </Link>
      ))}
    </div>
    </div>
  );
};

export default CustomCandlesAllProducts;*/
