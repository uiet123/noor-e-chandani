import React, { useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa6";
import "./Banner.css";
const Banner = () => {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState("right");
  const videos = [
     "/videos/v1.mp4",
  "/videos/v2.mp4",
  "/videos/v3.mp4",
  "/videos/v4.mp4",
  "/videos/v5.mp4",
  "/videos/v6.mp4",
  ];
  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  },[videos.length])

  const handleLeft = () => {
    setCurrent((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setDirection("left")
  };
  const handleRight = () => {
    setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setDirection("right")
  };
  const handleClick = (index) => {
    setCurrent(index)
    setCircle(prev => !prev)
  }
  
  return (
    <div className="video-container">
      <button className="arrow left" onClick={handleLeft}>{"<"}</button>
      <div className={`video-wrapper ${direction}`}>
      <video key={videos[current]} src={videos[current]} autoPlay loop muted playsInline />
      </div>
      <button className="arrow right" onClick={handleRight}>{">"}</button>
      <div className="circles">
        {
            Array.from({ length: 6 }).map((_, index) => {
                return(
                    <div className={`circle ${current === index? "active": ""}`} key={index} onClick={() => handleClick(index)}>
                        <FaRegCircle />
                    </div>
                )
            })
        }
      </div>
      <div className="hero-text">
        <h2 className="brand-name">Noor-e-Chandani</h2>
        <p className="tagline">"Glow with grace, shine with Noor"</p>
      </div>
    </div>
  );
};

export default Banner;
