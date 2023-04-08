import React, { useState } from 'react';
import styles from './NavBar.module.css';
import Logo from "../../../assets/images/logo.svg";
import Browse from "../../../assets/images/browse.svg";
import Cart from "../../../assets/images/cart.svg";
import GitHub from "../../../assets/images/github.svg";
import Search from "../../../assets/images/search.svg";
import { motion } from "framer-motion";

const NavBar = props => { 
    const {
        handleHover,
        hoverState,
        handleHome,
        handleBrowse,
        browsing,
        landingPage,
        cart,
        cartAmount,
        search,
        searching,
        handleSearch,
        handleSearchSubmit,
        handleOpenCart,
        handleCloseCart
    } = props;
    
    const variants = {
        hidden: { opacity: 1, y: 15 },
        visible: { opacity: 1, y: 0 },
    }

    const searchVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

  return (
    <>
      <motion.div 
        className={styles.navbar}
        animate="visible"
        initial={ landingPage ? "hidden" : "visible"}
        variants={variants}
        transition={{ y: { type: "spring" }, duration: 0.01 }}
      >
        <div className={styles.navbar_left}>
            <div className={styles.logodiv} id="0"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              onClick={handleHome}
            >
                <img src={Logo} className={styles.svg}  style={{ filter: 'invert(78%) brightness(10000%)' }} />
                <h3>Game Store</h3>
            </div>
    
            <div className={styles.pathdiv} id="1"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
                {browsing ? 
                  <>
                    <motion.div 
                      animate="visible"
                      initial={/*location.pathname === "/react-ecommerce-store/browse" ? "hidden" : "visible"*/"hidden"}
                      variants={searchVariants}
                      transition={{ opacity: { type: "spring" }, duration: 0.01, delay: 0.25 }}
                      className={styles.searchdiv}
                    >
                      <form onSubmit={handleSearchSubmit}>
                        <input 
                          placeholder="Search games..."
                          value={search}
                          onChange={handleSearch}
                        >

                        </input>
                        <input 
                          type="submit" 
                          hidden 
                          className={styles.submit} 
                        />
                        <button type="submit">
                            <img src={Search }
                              className={styles.svg}
                               style={{ filter: 'invert(78%) brightness(10000%)' }} 
                              onMouseEnter={handleHover}
                              onMouseLeave={handleHover}
                              id="7"
                              aria-label='Search'
                            />
                        </button>
                      </form>
                    </motion.div>
                  </>
                  
                  :
                  
                  <div className={styles.browsediv}>
                    <img src={Browse}
                      className={styles.svg} 
                       style={{ filter: 'invert(78%) brightness(10000%)' }} />
                    <h3 onClick={handleBrowse}>Browse Store</h3>
                  </div>
                }
            </div>
        </div>

        <div className={styles.navbar_right}>
            <div 
              className={styles.githubdiv} 
              id="2"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
                <img src={GitHub} className={styles.gh} style={{ filter: 'invert(78%) brightness(10000%)' }} />
                <h3>gianlucajahn</h3>
            </div>

            <div 
              className={styles.cartdiv} 
              id="3"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              onClick={handleOpenCart}
            >
                <img src={Cart} 
                  onClick={handleOpenCart} 
                  className={styles.svg2} 
                  style={{ filter: cartAmount ? 'brightness(100%) saturate(100%) invert(78%) sepia(99%) saturate(1103%) hue-rotate(72deg) brightness(100%) contrast(100%)' : 'invert(78%) brightness(10000%)' , stroke: cartAmount ? "" : "#fff", strokeWidth: "34px" }}
                />
                <h3 onClick={handleOpenCart}>Cart: {cartAmount}</h3>
            </div>
        </div>
      </motion.div>
    </>
  );
}

export default NavBar;