import React, { useEffect, useRef } from "react";
import "./About.css";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(aboutRef.current, {
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top+=80",  
          end: "+=400",
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      });
    }, aboutRef);

    return () => ctx.revert(); // 🔥 cleanup
  }, []);
  return (
    <section ref={aboutRef} className="about">
      <div className="about-content">
        <h2>About Noor-e-Chandani</h2>
        <p>
          Noor-e-Chandani is more than just candles – it is an experience of
          elegance, serenity, and warmth. Each candle is hand-crafted with love,
          designed to light up your spaces and your soul.
        </p>
        <p className="highlight">
          From premium wax to carefully chosen fragrances, every detail speaks
          of luxury and care. Whether it’s a quiet evening, a festive gathering,
          or a gift to someone you love – Noor-e-Chandani is here to make your
          moments glow brighter.
        </p>
      </div>
    </section>
  );
};

export default About;
