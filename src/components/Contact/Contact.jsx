import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

// Replace these with your actual values (you already have them)
const EMAILJS_SERVICE_ID = "service_lnqbynv";
const EMAILJS_TEMPLATE_ID = "template_cxu2v7d";
const EMAILJS_PUBLIC_KEY = "7-mwCS0vxW3TI72A_";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [formState, setFormState] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const { user_name, user_email, subject, message } = formState;
    if (!user_name.trim() || !user_email.trim() || !subject.trim() || !message.trim()) {
      setStatus({ type: "error", msg: "Please fill all fields." });
      return false;
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(user_email)) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    if (!validate()) return;

    setStatus({ type: "info", msg: "Sending message..." });

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      // success
      console.log("EmailJS success:", result.text);
      setStatus({ type: "success", msg: "Message sent! We'll reach out soon." });
      setFormState({ user_name: "", user_email: "", subject: "", message: "" });
      // reset native form fields
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ type: "error", msg: "Failed to send. Please try again." });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p className="lead">
            Have a question or custom order? Send us a message — we’d love to hear from you.
          </p>
        </div>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label>
              Name
              <input
                name="user_name"
                value={formState.user_name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Email
              <input
                name="user_email"
                type="email"
                value={formState.user_email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>
          </div>

          <label className="full-width">
            Subject
            <input
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              placeholder="Short summary"
              required
            />
          </label>

          <label className="full-width">
            Message
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={6}
              required
            />
          </label>

          <div className="actions">
            <button type="submit" className="btn-primary">Send Message</button>
            <div className={`status ${status.type}`}>{status.msg}</div>
          </div>

          <p className="note">
            We will respond to inquiries at <strong className="emailId">noorechandani.info@gmail.com</strong>. For order issues,
            please include your order number in the message.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
