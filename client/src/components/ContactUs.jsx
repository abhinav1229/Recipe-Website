import React from "react";
import "../styles/contactus.css";

const ContactUs = () => {
  return (
    <div className="contactUs">
      <div className="inputContainer">
        <input placeholder="Full name" />
        <input placeholder="Email" />
        <textarea placeholder="Message" rows={7}></textarea>
        <button>Send</button>
      </div>
    </div>
  );
};

export default ContactUs;
