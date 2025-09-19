import React from 'react';
import '../Styles/Contact.css';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

// ✨ This component now accepts and uses the 'data' prop
function Contact({ data }) {
    const contactData = data?.contact;

    return (
        <section className="contact-section" id="contact">
            <h2>Get In Touch</h2>
            <p>
                Feel free to reach out. I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your visions.
            </p>
            
            {/* ✨ Displaying dynamic email */}
            <a href={`mailto:${contactData?.email}`} className="email-link">
                <FaEnvelope /> {contactData?.email || 'your-email@example.com'}
            </a>

            {/* ✨ Displaying dynamic social links */}
            <div className="social-links">
                {contactData?.linkedin && <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                {contactData?.github && <a href={contactData.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
                {contactData?.twitter && <a href={contactData.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
                {contactData?.facebook && <a href={contactData.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>}
                {contactData?.instagram && <a href={contactData.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
            </div>
        </section>
    );
}

export default Contact;