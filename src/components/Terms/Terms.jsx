import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
      <div className="terms-inner">
        <h1 className="terms-title">Terms & Conditions</h1>

        <p className="terms-intro">
          Welcome to <strong>Noor-e-Chandani</strong>. By accessing or using our website, you agree
          to comply with and be bound by the following Terms and Conditions. Please read them carefully.
        </p>

        <section className="terms-section">
          <h2 className="terms-subtitle">1. General Information</h2>
          <p>
            Noor-e-Chandani is an Indian handcrafted candle brand offering products through our
            website. By purchasing from our store, you agree that you are at least 18 years old
            and capable of entering into a legally binding contract.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">2. Products & Availability</h2>
          <p>
            We strive to display accurate product information, but availability and descriptions
            may vary as all our candles are handcrafted. We reserve the right to modify or
            discontinue products at any time without notice.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">3. Pricing & Payments</h2>
          <p>
            All prices are listed in Indian Rupees (INR) and are subject to change without prior notice.
            Payments are processed securely through trusted payment gateways. Noor-e-Chandani
            does not store your complete payment details.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">4. Shipping & Delivery</h2>
          <p>
            Orders are shipped within the estimated time mentioned on the product page.
            Delivery times may vary based on your location and courier service. Noor-e-Chandani
            is not responsible for delays caused by third-party logistics.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">5. Returns & Refunds</h2>
          <p>
            As mentioned in our Returns Policy, we do not accept returns or exchanges once a product
            is delivered. Damaged or incorrect items must be reported within <strong>24 hours</strong> of
            delivery at{" "}
            <a href="mailto:noorechandani.info@gmail.com">
              noorechandani.info@gmail.com
            </a>.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">6. Intellectual Property</h2>
          <p>
            All content on this website — including images, text, designs, and branding — is the
            property of Noor-e-Chandani. Reproduction or redistribution without written consent
            is strictly prohibited.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">7. Limitation of Liability</h2>
          <p>
            Noor-e-Chandani shall not be held liable for any indirect, incidental, or consequential
            damages arising from the use of our products or website. All products are meant for
            domestic use only.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">8. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of
            India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Delhi, NCR.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-subtitle">9. Contact Us</h2>
          <p>
            For any queries related to these Terms, please contact us at{" "}
            <a href="mailto:noorechandani.info@gmail.com">
              noorechandani.info@gmail.com
            </a>{" "}
            or call <strong>+91 7973270451</strong>.
          </p>
        </section>

        <p className="terms-footer-note">
          Last updated: <strong>October 2025</strong>
        </p>
      </div>
    </div>
  );
};

export default Terms;
