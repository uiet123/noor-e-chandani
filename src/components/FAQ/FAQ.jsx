import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What makes Noor-e-Chandani candles unique?",
      answer:
        "Each candle is handcrafted with premium soy wax and natural essential oils, ensuring a clean burn, soothing aroma, and elegant design. We focus on eco-friendly and luxurious products made in India."
    },
    {
      question: "Do you offer custom candle gift sets?",
      answer:
        "Yes! We offer personalized gift boxes for weddings, birthdays, and corporate gifting. You can choose fragrances, packaging, and even custom messages."
    },
    {
      question: "How long do your candles burn?",
      answer:
        "Our candles typically burn between 30–50 hours depending on size, wick type, and usage conditions. Always trim the wick before each use for a longer, cleaner burn."
    },
    {
      question: "Do you ship all over India?",
      answer:
        "Yes, we ship pan-India via trusted courier partners. Delivery times vary between 3–7 business days depending on your location."
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us anytime at noorechandani.info@gmail.com or through the Contact page on our website. We usually respond within 24 hours."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions about our candles, gifts, and orders.</p>
      </div>

      <div className="faq-container">
        {faqs.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "index-active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
