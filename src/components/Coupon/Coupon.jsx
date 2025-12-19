import React from "react";
import { motion } from "framer-motion";
import "./Coupon.css";

const Coupon = () => {
  return (
    <div className="coupon-banner">
      <motion.div
        className="coupon-text"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
      >
        🎉 Use code <b>NOOR10</b> to get <b>10% OFF</b> on your first order! 🎉
      </motion.div>
    </div>
  );
};

export default Coupon;
