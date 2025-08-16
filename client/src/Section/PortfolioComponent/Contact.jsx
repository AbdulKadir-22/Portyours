import React from 'react';
import '../Styles/Contact.css'
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <section className="contact-section">
      <h2>Let’s Create Something Amazing Together</h2>
      <p>Reach out to collaborate, discuss ideas, or just say hi 👋</p>

      <form
        className="contact-form"
        action="https://formspree.io/f/your_form_id"
        method="POST"
      >
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="_replyto" placeholder="Your Email" required />
        <textarea name="message" rows="5" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>

    </section>
  );
}

export default Contact;
