import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-inner">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p className="privacy-lead">
          Your privacy matters to <strong>Noor-e-Chandani</strong>. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or make a purchase.
        </p>

        <section className="privacy-section">
          <h2 className="privacy-subtitle">1. Information We Collect</h2>
          <p>
            We may collect personal information you provide directly (name, email, shipping address, phone number) when you place an order or create an account. We also collect payment information through our payment processor — we do not store full card details on our servers.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-subtitle">2. How We Use Your Information</h2>
          <p>
            We use your information to process orders, communicate about your purchases, provide customer support, and improve our services. With your consent we may also send promotional emails — you can opt out at any time.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-subtitle">3. Cookies & Tracking</h2>
          <p>
            We use cookies and similar technologies to provide essential site functionality, remember preferences, and analyze site usage. You can control cookies via your browser settings; disabling some cookies may affect site functionality.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-subtitle">4. Third-Party Services</h2>
          <p>
            We may share information with trusted third parties who help us run the site (payment processors, shipping partners, analytics). These parties are required to protect your data and may have their own privacy policies.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-subtitle">5. Data Security</h2>
          <p>
            We take reasonable measures to protect your data using industry-standard tools and practices. However, no online transmission is completely secure — if you suspect a security issue, contact us immediately.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-subtitle">6. Your Rights</h2>
          <p>
            You have the right to view, update, or delete your personal information. For account-related requests or to unsubscribe from communications, contact us at the address below.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-subtitle">7. Contact Us</h2>
          <p>
            For questions about this policy or your data, email us at{" "}
            <a href="mailto:noorechandani.info@gmail.com">noorechandani.info@gmail.com</a> or call <strong>+91 7973270451</strong>.
          </p>
        </section>

        <p className="privacy-note">
          This policy may be updated occasionally. Last updated: <strong>October 2025</strong>.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
