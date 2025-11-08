import React, { useEffect } from "react";
import "./Collections.css";
import {Link} from "react-router-dom"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCollections, setLoading } from "../../store/collectionSlice";
const Collections = () => {
  const dispatch = useDispatch();
  const collections = useSelector(state => state.collection.collections) 
  const loading = useSelector(state => state.collection.loading)
  useEffect(() => {
    try{
        async function getCollections() {
      const res = await axios.get(`${BASE_URL}/collections`, {
        withCredentials: true
      })
      dispatch(setCollections(res?.data?.data))
      dispatch(setLoading(false))
    }
    getCollections()
    }
    catch(err){
      console.log("Error while fetching collections", err)
    }
  
    
  },[])
  return (
    <div className="collections">
      <h2>Our Collections</h2>
      <div className="collections-items">
        {loading? <div>Loading.....</div> : collections.map((item) => {
          return (
            <Link to={`/collections/${item.slug}`} key={item._id} className="card">
              <img height={300} width={250} src={`${BASE_URL}${item.image}`} alt="img" />
              <h3>{item.name}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
