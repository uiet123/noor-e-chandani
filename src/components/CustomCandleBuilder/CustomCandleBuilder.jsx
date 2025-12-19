// src/pages/CustomCandleBuilder.jsx
{/*import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./CustomCandleBuilder.css";
import { AddCustomCandle } from "../../store/customProductSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddCustomItem } from "../../store/cartSlice";
import { BASE_URL } from "../../utils/constants";

const CustomCandleBuilder = () => {
  const [error, setError] = useState({})
  const [glassType, setGlassType] = useState("");
  const [current, setCurrent] = useState(0)
  const [waxType, setWaxType] = useState("");
  const [messageType, setMessageType] = useState("none");
  const [presetMessage, setPresetMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  const [layers, setLayers] = useState("single");
  const [layer1Color, setLayer1Color] = useState("");
  const [layer2Color, setLayer2Color] = useState("");
  const [fragrance, setFragrance] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { slug } = useParams();
  const customProducts = useSelector(
    (state) => state.customCandles.customCandles
  );

  const product = customProducts.find((p) => p.slug === slug);

  const calculatedPrice = useMemo(() => {
    if (!product) return 0;
    const rules = product.priceRules;
    let price = product.basePrice;
    if (glassType) price += rules.glassTypes[glassType] || 0;
    if (waxType) price += rules.waxTypes[waxType] || 0;
    if (product.id === 1 && messageType) {
      price += rules.messageType[messageType] || 0;
   }
    if (product.options.layers && layers) {
      price += rules.layers[layers] || 0;
    }
    if (layer1Color) price += rules.color;
    if (layers === "double" && layer2Color) price += rules.color;
    if (waxType !== "gel-wax" && fragrance) {
      price += rules.fragrance[fragrance] || 0;
    }
    return price;
  }, [
    product,
    glassType,
    waxType,
    messageType,
    layers,
    layer1Color,
    layer2Color,
    fragrance,
  ]);

  const prevSlide = () => {
    setCurrent((prev) => prev === 0 ? product.image.length - 1 : prev -1)
  }

  const nextSlide = () => {
    setCurrent((prev) => prev === product.image.length -1 ? 0 : prev + 1)
  }

  const handleAddToCart = async () => {
    if(!validateData()){
      throw new Error("Please fill the data.")
    }
    try {
      const payload = {
        productId: product.id,
        picture: product.image[0],
        name: product.name,
        glassType,
        waxType,
        messageType,
        messageText:
          messageType === "preset"
            ? presetMessage
            : messageType === "custom"
            ? messageText
            : "",
        layers,
        layer1Color,
        layer2Color: layers === "double" ? layer2Color : "",
        fragrance,
        quantity,
      };
      const res = await axios.post(`${BASE_URL}/custom-candle`, payload, {
        withCredentials: true,
      });
      dispatch(AddCustomItem(res.data.data));
    } catch (err) {
      console.error(err)
    }
  };

  const validateData = () => {
    const temp = {}
    if(glassType === "") temp.glassType = "Glass type is required";
    if(messageText.length > 30) temp.messageText = "Message length should be less than 20";
    if(waxType === "") temp.waxType = "Wax type is required"
    setError(temp)
    return Object.keys(temp).length === 0;
  }

  const setGlass = (g) => {
    if (glassType === g) {
      setGlassType("")
    }
    else{
      setGlassType(g)
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev === product.image.length-1 ? 0 : prev + 1)
    }, 4000)
    return clearInterval(interval)
  },[product?.image])

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${BASE_URL}/get-custom-candle`);
      dispatch(AddCustomCandle(res.data.data));
      console.log(res.data.data);
    }
    getData();
  }, []);

  if (customProducts.length === 0) {
    return <h2>Loading .... </h2>;
  }

  if (!product) {
    return <h2>Product not found </h2>;
  }
  

  return (
    <div className="custom-builder-page">
      <div className="custom-builder-card">
        <div className="custom-builder-left">
          <div className="image-container">
          <div className="image-slider">
            <div className="left arrows" onClick={prevSlide}>
              <MdKeyboardArrowLeft />
            </div>
            <div className="image-slider-images" style={{ transform: `translateX(-${current * 100}%)` }}>
              {product.image.map((pic, idx) => {
                return (
                  <div key={idx} className="img-card">
                    <img
                      className="custom-builder-image"
                      src={`${BASE_URL}${pic}`}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <div className="right arrows" onClick={nextSlide}>
             < MdKeyboardArrowRight />
            </div>
          </div>
          </div>

          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="price-box">
            <span className="price-label">Price:</span>
            <span className="price-value">₹{calculatedPrice}</span>
          </div>

          <div className="qty-box">
            <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          <button
            className="custom-add-btn"
            onClick={() => handleAddToCart()}
          >Add</button>
        </div>
        <div className="custom-builder-right">
          <div className="option-block">
            <h4>Glass Type</h4>
            <div className="option-row">
              {product.options.glassTypes.map((g) => (
                <button
                  key={g}
                  className={glassType === g ? "opt-btn active" : "opt-btn"}
                  onClick={() => setGlass(g)}
                >
                  {g}
                </button>
              ))}
              
            </div>
            {error.glassType && <p className="error">Glass type is required.</p>}
          </div>
          <div className="option-block">
            <h4>Wax Type</h4>
            <div className="option-row">
              {product.options.waxTypes.map((w) => (
                <button
                  key={w}
                  className={waxType === w ? "opt-btn active" : "opt-btn"}
                  onClick={() => {waxType === w? setWaxType(""): setWaxType(w)}}
                >
                  {w}
                </button>
              ))}
            </div>
            {error.waxType && <p className="error">Wax type is required.</p>}
          </div>
          {product.id === 1 && (
            <div className="option-block">
              <h4>Message</h4>
              <div className="option-row">
                <button
                  className={
                    messageType === "preset" ? "opt-btn active" : "opt-btn"
                  }
                  onClick={() => {messageType === "preset" ? setMessageType("") : setMessageType("preset")}}
                >
                  Preset
                </button>

                <button
                  className={
                    messageType === "custom" ? "opt-btn active" : "opt-btn"
                  }
                  onClick={() => {messageType === "custom" ? setMessageType("") : setMessageType("custom")}}
                >
                  Custom
                </button>
              </div>
              {error.messageText && <p className="error">Message length should less than 20.</p>}

              {messageType === "preset" && (
                <div className="option-row present-msg">
                  {product.options.presetMessages.map((msg) => (
                    <button
                      key={msg}
                      className={
                        presetMessage === msg ? "opt-btn active" : "opt-btn"
                      }
                      onClick={() => setPresetMessage(msg)}
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              )}

              {messageType === "custom" && (
                <textarea
                  className="message-input"
                  placeholder="Type your message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              )}
            </div>
          )}
          {product.options.layers && (
            <div className="option-block">
              <h4>Layers</h4>
              <div className="option-row">
                {product.options.layers.map((l) => (
                  <button
                    key={l}
                    className={layers === l ? "opt-btn active" : "opt-btn"}
                    onClick={() => {
                      setLayers(l);
                      setLayer1Color("");
                      setLayer2Color("");
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.options.singleLayerColors && (
            <div className="option-block">
              <h4>Colors</h4>

              {layers === "single" && (
                <div className="option-row">
                  {product.options.singleLayerColors.map((c) => (
                    <button
                      key={c}
                      className={
                        layer1Color === c ? "opt-btn active" : "opt-btn"
                      }
                      onClick={() => { layer1Color === c ? setLayer1Color(""): setLayer1Color(c)}}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {layers === "double" && (
                <>
                  <p className="layers-colour">Top Layer colour</p>
                  <div className="option-row">
                    {product.options.doubleLayerColors.map((c) => (
                      <button
                        key={"l1-" + c}
                        className={
                          layer1Color === c ? "opt-btn active" : "opt-btn"
                        }
                        onClick={() => {layer1Color === c ? setLayer1Color(""): setLayer1Color(c)}}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <p className="layers-colour">Bottom Layer colour</p>
                  <div className="option-row">
                   
                    {product.options.doubleLayerColors.map((c) => (
                      <button
                        key={"l2-" + c}
                        className={
                          layer2Color === c ? "opt-btn active" : "opt-btn"
                        }
                        onClick={() => {layer2Color === c ? setLayer2Color(""):setLayer2Color(c)}}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        
          { waxType !== "gel-wax" && product.options.fragrances && (
            <div className="option-block">
              <h4>Fragrance</h4>
              <div className="option-row">
          
                {product.options.fragrances.map((f) => (
                  <button
                    key={f}
                    className={fragrance === f ? "opt-btn active" : "opt-btn"}
                    onClick={() => {fragrance === f ? setFragrance("") : setFragrance(f)}}
                  >
                    {f}
                  </button>
                ))}

              
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCandleBuilder;
*/}