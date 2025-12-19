import React, { useEffect, useRef, useState } from "react";
import "./Collections.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCollections, setLoading } from "../../store/collectionSlice";
import { setAllProducts } from "../../store/productSlice";
import { AddToCart, RemoveFromCart } from "../../store/cartSlice";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const collectionRef = useRef(null)
  const collectionH2Ref = useRef(null)
  const [randomProducts, setRandomProducts] = useState([]);

  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const collections = useSelector((state) => state.collection.collections);
  const loading = useSelector((state) => state.collection.loading);
  const allProducts = useSelector((state) => state.product.allProducts);
  const cartItems = useSelector((state) => state.cart.items);

  // DESKTOP: 3 items per page
  const page1Products = randomProducts.slice(0, 3);
  const page2Products = randomProducts.slice(3, 5);

  // MOBILE: 2 items per page
  const page1ProductsMobile = randomProducts.slice(0, 2);
  const page2ProductsMobile = randomProducts.slice(2, 3);

  const pages = [page1Products, page2Products];
  const pagesMobile = [page1ProductsMobile, page2ProductsMobile];

  const [ratings, setRatings] = useState({});

  const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};


useEffect(() => {
  if (allProducts.length > 0) {
    const shuffled = shuffleArray(allProducts);
    setRandomProducts(shuffled);
  }
}, [allProducts]);


  const handleClickLeft = () => {
    setCurrent((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const handleClickRight = () => {
    setCurrent((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  // Add item
  const buyNow = (id) => {
    dispatch(AddToCart(id));
  };

  useEffect(() => {
    async function getCollections() {
      const res = await axios.get(`${BASE_URL}/collections`, {
        withCredentials: true,
      });
      dispatch(setCollections(res?.data?.data));
      dispatch(setLoading(false));
    }
    getCollections();
  }, []);

  useEffect(() => {
    async function getAllProducts() {
      const res = await axios.get(`${BASE_URL}/products`, {
        withCredentials: true,
      });
      dispatch(setAllProducts(res?.data?.data));
    }
    getAllProducts();
  }, []);

  useEffect(() => {
    async function getRatings() {
      try {
        const res = await axios.get(`${BASE_URL}/reviews/summary`);
        const map = {};

        res?.data?.data?.forEach((r) => {
          map[r.productId] = { avg: r.avg, count: r.count };
        });

        setRatings(map);
      } catch (err) {
        console.log("Rating fetch error:", err.message);
      }
    }

    getRatings();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(collectionRef.current, {
        scale: 0.8,
      
        scrollTrigger: {
          trigger: collectionRef.current,
          start: "top 90%",  
          end: "top 20%",
          scrub: true,
          
        },
      });
    }, collectionRef);

    return () => ctx.revert(); 
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(collectionH2Ref.current, {
        scale: 1.5,
      
        scrollTrigger: {
          trigger: collectionH2Ref.current,
          start: "top 90%",  
          end: "top 40%",
          scrub: true,
          
        },
      });
    }, collectionH2Ref);

    return () => ctx.revert(); 
  }, []);

  return (
    <div  className="collections">
      <h2 ref={collectionH2Ref}>Our Collections</h2>
      <div ref={collectionRef} className="collections-items">
        {loading ? (
          <div>Loading...</div>
        ) : (
          collections.map((item) => (
            <Link to={`/collections/${item.slug}`} key={item._id} className="card">
              <img src={`${BASE_URL}${item.image}`} />
              <h3>{item.name}</h3>
            </Link>
          ))
        )}
      </div>

      <div className="collections-product">
        <h2>All Products</h2>
        <div className="all-products-wrapper"> 
          <MdKeyboardArrowLeft className={`arrow-left ${current === 0 ? "disabled-arrow" : ""}`} onClick={current === 0 ? null : handleClickLeft} />
        <div className="all-products">
          <div className="desktop-view-products">
            {pages[current].map((item) => (
              <Link to={`/product/${item._id}`} key={item._id} className="product-card-link">
                <div className="allproducts-page-map-collection">
                  <img src={`${BASE_URL}${item.image[0]}`} alt={item.name} />

                  <div className="add-to-cart-page-collection">
                    {cartItems[item._id] ? (
                      <div className="cart-add-sub-collection">
                        <FaMinus
                          className="sub-button-collection"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(RemoveFromCart(item._id));
                          }}
                        />
                        <span className="item-qty-collection">{cartItems[item._id]}</span>
                        <FaPlus
                          className="add-button-collection"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(AddToCart(item._id));
                          }}
                        />
                      </div>
                    ) : (
                      <button
                        className="buy-now-page-collection"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          buyNow(item._id);
                        }}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>

            {/*    <div className="product-details-collection">
                  <h4 className="name-page-collection">{item.name}</h4>
                </div> */}
              </Link> 
            ))}

            {/* SEE ALL PRODUCTS inside product row */}
            {current === 1 && (
              <Link to="/allproducts">
                <div className="all-products-map see-all-box">
                  <p>Click here to view </p>
                  <span className="see-all-btn">All Products</span>
                </div>
              </Link>
            )}
          </div>

          {/* MOBILE VIEW */}
          <div className="mobile-view-products">
            {pagesMobile[current].map((item) => (
              <Link to={`/product/${item._id}`} key={item._id} className="product-card-link">
                <div className="allproducts-page-map-collection">
                  <img src={`${BASE_URL}${item.image[0]}`} alt={item.name} />

                  <div className="add-to-cart-page-collection">
                    {cartItems[item._id] ? (
                      <div className="cart-add-sub-collection">
                        <FaMinus
                          className="sub-button-collection"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(RemoveFromCart(item._id));
                          }}
                        />
                        <span className="item-qty-collection">{cartItems[item._id]}</span>
                        <FaPlus
                          className="add-button-collection"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(AddToCart(item._id));
                          }}
                        />
                      </div>
                    ) : (
                      <button
                        className="buy-now-page-collection"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          buyNow(item._id);
                        }}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>

               {/* <div className="product-details-collection">
                  <h4 className="name-page-collection">{item.name}</h4>
                </div> */}
              </Link>
            ))}

            {current === 1 && (
              <Link to="/allproducts">
                <div className="all-products-map see-all-box">
                  <p>Click here to view </p>
                  <span className="see-all-btn">All Products</span>
                </div>
              </Link>
            )}
          </div>

          
        </div>
        <MdKeyboardArrowRight className={`arrow-right ${current === pages.length - 1 ? "disabled-arrow" : ""}`} onClick={current === pages.length - 1 ? null : handleClickRight} />
        </div>
      </div>
    </div>
  );
};

export default Collections;
