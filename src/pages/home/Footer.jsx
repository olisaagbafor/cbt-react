/* eslint-disable react/jsx-no-target-blank */
import React from "react";

// import location from "../../assets/images/location.svg";
// import sms from "../../assets/images/sms.svg";
// import call from "../../assets/images/call.svg";

import cbtLogoMain from "../../assets/images/cbtLogoMain.png";
const location = "";
const call = "";
const sms = "";
const Footer = () => {
  return (
    <footer className="footer margin-bottom-5">
      <div className="footer_content cbt-container">
        <div className="footer-top flex  gap u-justify-content-sb margin-bottom-5">
          <div className="footer-info margin-bottom-2">
            <div className="logo margin-bottom-2">
              <img src={cbtLogoMain} alt="" />
            </div>
            <div className="heading-secondary--2">
              <p className="def-line-height">
                Empowering Institutions and Organizations with the most proficient, user-friendly Computer-Based Testing Software for seamless and
                reliable assessments
              </p>
            </div>
          </div>
          <div className="footer-contact flex-row flex-wrap flex u-justify-content-sb u-align-center">
            <div className="contact flex gap u-align-center u-justify-content-sb">
              <img src={sms} alt="Email Message" />
              <p>info@examcentre.ng</p>
            </div>
            <div className="contact flex gap u-align-center u-justify-content-sb">
              <img src={location} alt="Location" />
              <p>12 Ajisafe Street, Ikeja GRA, Lagos.</p>
            </div>
            <div className="contact flex gap u-align-center u-justify-content-sb">
              <img src={call} alt="Call" />
              <p>+234-705-394-4592</p>
            </div>
          </div>
        </div>
        <div className="line margin-bottom-5"></div>
        <div className="footer-bottom flex flex-row u-align-center u-justify-content-sb">
          <div className="footer-links">
            <ul className="flex flex-row"></ul>
          </div>
          <div className="social-links flex-row">
            <a href="https://www.instagram.com/examcentre.ng/" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/examcentre.ng/" target="_blank" className="margin-left-1">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://twitter.com/ExamCentreNG" target="_blank" className="margin-left-1">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
