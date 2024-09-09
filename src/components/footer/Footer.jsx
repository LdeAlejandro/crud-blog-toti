"use client"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.iconsContainer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
        </a>
      </div>
      <div className={styles.textContainer}>
        <p>&copy; 2024 Group 1 Toti Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
