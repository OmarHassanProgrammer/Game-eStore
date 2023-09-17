import styles from './Footer.module.css';
import React from 'react';
import Logo from "../../../assets/icons/logo.svg";
import AppStore from "../../../assets/icons/appstorebadge.svg";

const Footer = props => {
    const {
        
    } = props;

    return (
        <div className={styles.footer}>
            <div className={styles.footerTop}>
                <img src={Logo} className={styles.logo} style={{filter: "grayScale(100%) invert(1)"}}/>
                <h2>Game Store</h2>
            </div>
            <div className={styles.sections}>
              <div className={`${styles.section} ${styles.section3}`}>
                <p>This is a Game Store where you can sell and/or buy any gaming-related product like accounts, items, skins, coins and others.</p>
              </div>
              <div className={`${styles.section} ${styles.section1}`}>
                <h3 className={ styles.first}>Site Map</h3>
                <h3><a href="/games">Games</a></h3>
                <h3><a href="/checkout">Checkout</a></h3>
                <h3><a href="/profile">Profile</a></h3>
                <h3><a href="/settings?page=profile">Dashboard</a></h3>
              </div>
              <div className={`${styles.section} ${styles.section2}`}>
                <h3 className={styles.first}>Contact Us</h3>
                <h3><a href="/contactus">Website</a></h3>
                <h3><a href="/contactus">Facebook</a></h3>
                <h3><a href="/contactus">Instagram</a></h3>
                <h3><a href="/contactus">Twitter</a></h3>
              </div>
            </div>
    

        </div>
    );
  }
  
  export default Footer;