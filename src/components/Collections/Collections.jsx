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
    const staticCollections = [
      {
        _id: "693ecbcb15d350d6839d3f60",
        name: "Home Aesthetics",
        slug: "home_aesthetics",
        description: "Home Aesthetics candles are designed to elevate your space and fill it…",
        image: "/collection_cover/welness_col.jpg"
      },
      {
        _id: "693ecda715d350d6839d3f89",
        name: "Everyday Themes",
        slug: "everyday_themes",
        description: "Everyday Theme Candles are inspired by the little moods that shape our…",
        image: "/collection_cover/everyday_col.jpg"
      },
      {
        _id: "693ecefd15d350d6839d3f97",
        name: "HeartScripts",
        slug: "heartscripts",
        description: "HeartScripts Candles are crafted to say what words often cannot. Each…",
        image: "/collection_cover/dating_col.jpg"
      },
      {
        _id: "693ed06315d350d6839d3fea",
        name: "Wax Art",
        slug: "wax_art",
        description: "Wax Art is a collection where wax takes form. Each candle is sculpted…",
        image: "/collection_cover/festival_col.jpg"
      }
    ];
    dispatch(setCollections(staticCollections));
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    const staticProducts = [
      {
        _id: "694d18736b61764697bfae1a",
        name: "Blue Sea Paradise",
        description: "Blue Sea Paradise is a handcrafted gel wax candle inspired by the calm…",
        price: 399,
        actualPrice: 699,
        image: ["/wellness/ocean_breeze.png"],
        stock: 100,
        materialUsed: "Gel wax",
        fragranceType: "Non-Scented",
        scentName: "",
        burnTime: "45–55 hours",
        weight: "445g",
        collection: "693ecbcb15d350d6839d3f60"
      },
      {
        _id: "69637358d4d451c0c97fa216",
        name: "Petal Bliss",
        description: "Petal Bliss is a handcrafted floral candle with soft pastel blooms, cr…",
        price: 299,
        actualPrice: 499,
        image: ["/wellness/lavender_calm_jar.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "30 - 35 hours",
        weight: "390 g",
        collection: "693ecbcb15d350d6839d3f60"
      },
      {
        _id: "696756e1d4d451c0c97fa3b7",
        name: "Tender Heart",
        description: "Tender Heart is a beautifully handcrafted heart candle that symbolizes…",
        price: 99,
        actualPrice: 149,
        image: ["/wax_art/1.png", "/wax_art/2.png", "/wax_art/3.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "7 - 8 hours",
        weight: "130 g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "697790bbd4d451c0c97faaad",
        name: "Moonlit Owl",
        description: "Moonlit Owl is a beautifully handcrafted candle inspired by calm night…",
        price: 119,
        actualPrice: 199,
        image: ["/wax_art/2.png", "/wax_art/3.png", "/wax_art/1.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "6 - 7 hours",
        weight: "112g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_0",
        name: "Wax Art Special 1",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 234,
        actualPrice: 416,
        image: ["/wax_art/file_0000000007307209a8e6a365b2463841.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_1",
        name: "Wax Art Special 2",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 116,
        actualPrice: 401,
        image: ["/wax_art/file_0000000007d87208b81b730004e10fe8.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_2",
        name: "Wax Art Special 3",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 295,
        actualPrice: 304,
        image: ["/wax_art/file_000000000d2472069ceea99a31b3cb6c.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_3",
        name: "Wax Art Special 4",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 203,
        actualPrice: 496,
        image: ["/wax_art/file_0000000011c4720ba21b512aa479a673.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_4",
        name: "Wax Art Special 5",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 238,
        actualPrice: 332,
        image: ["/wax_art/file_00000000126471fa946b7cf5562ad708.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_5",
        name: "Wax Art Special 6",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 203,
        actualPrice: 414,
        image: ["/wax_art/file_0000000013f47207a700ca85afb53f6c.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_6",
        name: "Wax Art Special 7",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 126,
        actualPrice: 394,
        image: ["/wax_art/file_0000000020b872068ac52b15f1a80640.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_7",
        name: "Wax Art Special 8",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 220,
        actualPrice: 367,
        image: ["/wax_art/file_0000000031607209b2b4b0a7913ba6be.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_8",
        name: "Wax Art Special 9",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 230,
        actualPrice: 467,
        image: ["/wax_art/file_0000000049387208a39cebaeb564f5c1.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_9",
        name: "Wax Art Special 10",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 164,
        actualPrice: 443,
        image: ["/wax_art/file_000000004e587208a937c6e29414e0e0.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_10",
        name: "Wax Art Special 11",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 160,
        actualPrice: 407,
        image: ["/wax_art/file_00000000531871fa9fc481aa37d22844.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_11",
        name: "Wax Art Special 12",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 184,
        actualPrice: 367,
        image: ["/wax_art/file_00000000575471f6a749f8583c5432fe.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_12",
        name: "Wax Art Special 13",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 113,
        actualPrice: 370,
        image: ["/wax_art/file_000000006c6c72098bb89410fe7b560a.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_13",
        name: "Wax Art Special 14",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 191,
        actualPrice: 324,
        image: ["/wax_art/file_0000000073c07208adc47dcbb40d9e1d.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_14",
        name: "Wax Art Special 15",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 166,
        actualPrice: 333,
        image: ["/wax_art/file_000000007a48720783cc1987cfe81253.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_15",
        name: "Wax Art Special 16",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 161,
        actualPrice: 368,
        image: ["/wax_art/file_0000000083b47207a7aa1938e6f2a8b6.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_16",
        name: "Wax Art Special 17",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 173,
        actualPrice: 392,
        image: ["/wax_art/file_0000000086d07208b5a0e7669d836554.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_17",
        name: "Wax Art Special 18",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 288,
        actualPrice: 318,
        image: ["/wax_art/file_000000008ac0720680e7d0eb5471294c.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_18",
        name: "Wax Art Special 19",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 235,
        actualPrice: 451,
        image: ["/wax_art/file_0000000090047209bbeea14023bd6d19.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_19",
        name: "Wax Art Special 20",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 250,
        actualPrice: 413,
        image: ["/wax_art/file_0000000093147209a84b24b19070c0ec.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_20",
        name: "Wax Art Special 21",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 117,
        actualPrice: 378,
        image: ["/wax_art/file_0000000099f47208addfc502774d59b6 (1).png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_21",
        name: "Wax Art Special 22",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 119,
        actualPrice: 465,
        image: ["/wax_art/file_000000009d047209add2cc3005ee9e06.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_22",
        name: "Wax Art Special 23",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 250,
        actualPrice: 308,
        image: ["/wax_art/file_000000009e2c72068e5a3b8927e0fd70.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_23",
        name: "Wax Art Special 24",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 275,
        actualPrice: 427,
        image: ["/wax_art/file_00000000a3287206b74a2572ba606e05.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_24",
        name: "Wax Art Special 25",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 112,
        actualPrice: 427,
        image: ["/wax_art/file_00000000a6a072089283b559b1c5c05c (1).png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_25",
        name: "Wax Art Special 26",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 194,
        actualPrice: 389,
        image: ["/wax_art/file_00000000b0987208a7479d830349c6f4.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_26",
        name: "Wax Art Special 27",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 236,
        actualPrice: 310,
        image: ["/wax_art/file_00000000b50c720791113d4edaee710c.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_27",
        name: "Wax Art Special 28",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 99,
        actualPrice: 379,
        image: ["/wax_art/file_00000000c6787206b53ed196628fe5f0.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_28",
        name: "Wax Art Special 29",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 284,
        actualPrice: 363,
        image: ["/wax_art/file_00000000c8c872068a96eae55e4064a2.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_29",
        name: "Wax Art Special 30",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 212,
        actualPrice: 421,
        image: ["/wax_art/file_00000000cd2c7209af6e80f6321d1d52.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_30",
        name: "Wax Art Special 31",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 114,
        actualPrice: 482,
        image: ["/wax_art/file_00000000d5bc72089bf97f5b6f77184e.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_31",
        name: "Wax Art Special 32",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 287,
        actualPrice: 452,
        image: ["/wax_art/file_00000000e6187206b041cb34a97e32e3.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      },
      {
        _id: "dummy_wax_art_32",
        name: "Wax Art Special 33",
        description: "A beautiful piece of wax art handcrafted with care.",
        price: 118,
        actualPrice: 381,
        image: ["/wax_art/file_00000000e77c7206a4e483bfe2a6f7fc.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ed06315d350d6839d3fea"
      }
,
      {
        _id: "dummy_everyday_0",
        name: "Plain Pillar Candle",
        description: "A wonderful addition to your everyday essentials.",
        price: 293,
        actualPrice: 427,
        image: ["/everday_essentials/plain_pillar_candle.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecda715d350d6839d3f89"
      },
      {
        _id: "dummy_everyday_1",
        name: "Tealight Candles Scented",
        description: "A wonderful addition to your everyday essentials.",
        price: 241,
        actualPrice: 301,
        image: ["/everday_essentials/tealight_candles_scented.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecda715d350d6839d3f89"
      },
      {
        _id: "dummy_everyday_2",
        name: "Tealight Candles Unscented",
        description: "A wonderful addition to your everyday essentials.",
        price: 114,
        actualPrice: 419,
        image: ["/everday_essentials/tealight_candles_unscented.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecda715d350d6839d3f89"
      },
      {
        _id: "dummy_everyday_3",
        name: "Votive Candles",
        description: "A wonderful addition to your everyday essentials.",
        price: 291,
        actualPrice: 471,
        image: ["/everday_essentials/votive_candles.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecda715d350d6839d3f89"
      },
      {
        _id: "dummy_everyday_4",
        name: "Wax Melts",
        description: "A wonderful addition to your everyday essentials.",
        price: 285,
        actualPrice: 462,
        image: ["/everday_essentials/wax_melts.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecda715d350d6839d3f89"
      }
,
      {
        _id: "dummy_home_aesthetics_0",
        name: "Home Aesthetics Special 1",
        description: "A perfect piece to elevate your home aesthetics.",
        price: 387,
        actualPrice: 454,
        image: ["/home_asthetics/file_0000000053f071fa8196f4f7814be3b8.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecbcb15d350d6839d3f60"
      },
      {
        _id: "dummy_home_aesthetics_1",
        name: "Home Aesthetics Special 2",
        description: "A perfect piece to elevate your home aesthetics.",
        price: 369,
        actualPrice: 412,
        image: ["/home_asthetics/file_0000000077e07208b9fb4c407fa759f7.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecbcb15d350d6839d3f60"
      },
      {
        _id: "dummy_home_aesthetics_2",
        name: "Home Aesthetics Special 3",
        description: "A perfect piece to elevate your home aesthetics.",
        price: 304,
        actualPrice: 468,
        image: ["/home_asthetics/file_00000000f40c71fab2c9075b50aad75e.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "10 - 15 hours",
        weight: "200g",
        collection: "693ecbcb15d350d6839d3f60"
      }
,
      {
        _id: "dummy_heartscripts_0",
        name: "HeartScripts Special 1",
        description: "A special candle from the HeartScripts collection to say what words cannot.",
        price: 274,
        actualPrice: 475,
        image: ["/heart/file_00000000ca9c720682bbf832ad0179bd.png"],
        stock: 100,
        materialUsed: "Soya wax",
        scentName: "",
        burnTime: "8 - 12 hours",
        weight: "150g",
        collection: "693ecefd15d350d6839d3f97"
      }
    ];
    dispatch(setAllProducts(staticProducts));
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
              <img src={item.image.startsWith('/collection_cover') ? item.image : `${BASE_URL}${item.image}`} />
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
                  <img src={item.image[0].startsWith('/') ? item.image[0] : `${BASE_URL}${item.image[0]}`} alt={item.name} />

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
                  <img src={item.image[0].startsWith('/') ? item.image[0] : `${BASE_URL}${item.image[0]}`} alt={item.name} />

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
