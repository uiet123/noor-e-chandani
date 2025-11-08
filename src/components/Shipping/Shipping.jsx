import React from "react";
import "./Shipping.css";

const Shipping = () => {
  return (
    <div className="shipping-page">
      <header className="shipping-hero">
        <div className="hero-inner">
          <h1>Shipping & Delivery</h1>
          <p>
            We deliver Noor-e-Chandani candles across India with care. Below you'll find
            our shipping options, delivery estimates, tracking info and packaging details.
          </p>
        </div>
      </header>

      <main className="shipping-content">
        <section className="shipping-section">
          <h2>Domestic Shipping</h2>
          <p>
            We ship pan-India via trusted courier partners. Orders are processed within
            <strong> 1–2 business days</strong>, and delivery typically takes
            <strong> 3–7 business days</strong> depending on your location.
          </p>

          <div className="shipping-grid">
            <div className="shipping-card">
              <h3>Standard Delivery</h3>
              <p>Cost: <strong>₹150</strong> (Free on orders above ₹999)</p>
              <p>ETA: <strong>3–7 business days</strong></p>
              <p>Suitable for regular orders across most pincodes.</p>
            </div>

            

            <div className="shipping-card">
              <h3>Prepaid & COD</h3>
              <p>We currently <strong>do not accept Cash-on-Delivery (COD)</strong> orders.</p>
              <p>All payments are <strong>100% prepaid</strong> and processed securely via
    <strong> Razorpay</strong>.</p>
            </div>
          </div>
        </section>

        <section className="shipping-section">
          <h2>International Shipping</h2>
          <p>
            We ship internationally on request. For international orders, shipping cost
            and customs duties are calculated at checkout. Delivery time varies by destination.
          </p>
          <ul className="bullet-list">
            <li>Transit time: <strong>7–21 business days</strong></li>
            <li>Customs & duties: Customer is responsible for any local import charges</li>
            <li>Contact us for bulk/international quotes at <a href="mailto:noorechandani.info@gmail.com">noorechandani.info@gmail.com</a></li>
          </ul>
        </section>

        <section className="shipping-section">
          <h2>Tracking & Notifications</h2>
          <p>
            Once your order ships, you will receive a tracking number via email and SMS.
            Use the tracking link to follow the delivery. If you don't receive tracking info
            within 48 hours of order confirmation, contact our support.
          </p>

          <div className="tracking-box">
            <p><strong>Tip:</strong> Enter your order number on the <a href="https://www.shiprocket.in/shipment-tracking/">Orders</a> page to view status.</p>
          </div>
        </section>

        <section className="shipping-section">
          <h2>Packaging & Care</h2>
          <p>
            Our candles are packaged with protective materials and sturdy boxes to minimize
            transit damage. For fragile gift sets we add extra cushioning.
          </p>
          <ul className="bullet-list">
            <li>All packages are inspected before dispatch.</li>
            <li>If your order arrives damaged — keep photos and contact us within 48 hours.</li>
          </ul>
        </section>

    <section className="shipping-section">
  <h2>Returns & Refunds Related to Shipping</h2>
  <ul className="bullet-list">
  <li>
    We currently <strong>do not accept returns or exchanges</strong> once an order has been delivered.
  </li>
  <li>
    However, if your product arrives <strong>damaged, defective, or incorrect</strong>,
    please contact our support team within <strong>24 hours</strong> of delivery.
  </li>
  <li>
    Our team will review the issue and assist you with an appropriate resolution.
  </li>
  <li>
    You can reach us at <strong>noorechandani.info@gmail.com</strong> for support.
  </li>
  </ul>
</section>

        <section className="shipping-section faq-mini">
          <h2>Quick Questions</h2>
          <div className="mini-grid">
            <div>
              <h4>How do I change my shipping address?</h4>
              <p>If order is not shipped, contact support immediately at <a href="mailto:noorechandani.info@gmail.com">noorechandani.info@gmail.com</a>.</p>
            </div>
            <div>
              <h4>Can I combine orders for shipping?</h4>
              <p>Yes — contact support with both order numbers and we will advise if consolidation is possible.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="shipping-cta">
        <div className="cta-inner">
          <h3>Need help with shipping?</h3>
          <p>Contact our support at <a href="mailto:noorechandani.info@gmail.com">noorechandani.info@gmail.com</a> or call <a href="tel:+917973270451">+91 7973270451</a></p>
          <a className="btn-primary" href="/contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Shipping;
