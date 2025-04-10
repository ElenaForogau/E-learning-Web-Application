import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Your message has been sent successfully!");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            <strong>Email:</strong> contact@elearning.com
          </p>
          <p>
            <strong>Phone:</strong> +40 123 456 789
          </p>
          <p>
            <strong>Address:</strong> Strada Sperantei, Nr. 10, București
          </p>
        </div>

        <div className="contact-form">
          <h3>Send us a message</h3>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
