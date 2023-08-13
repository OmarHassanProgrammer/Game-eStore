import React, { useState } from 'react';
import styles from './NavBar.module.css';
import Logo from "../../../assets/icons/logo.svg";
import Browse from "../../../assets/icons/browse.svg";
import Cart from "../../../assets/icons/cart.svg";
import GitHub from "../../../assets/icons/github.svg";
import Search from "../../../assets/icons/search.svg";
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
              className={styles.cartdiv} 
              id="3"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              onClick={() => {window.location.href = "login"}}
            >
                <svg className={styles.svg2} fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="100px" height="100px"><path d="M 25.017578 1.9824219 C 15.436898 1.9824219 7.2123268 7.8663695 3.7636719 16.220703 A 2.0002 2.0002 0 1 0 7.4609375 17.746094 C 10.308283 10.848427 17.072259 5.9824219 25.017578 5.9824219 C 35.534702 5.9824219 44.017578 14.465298 44.017578 24.982422 C 44.017578 35.499546 35.534702 43.982422 25.017578 43.982422 C 17.073352 43.982422 10.308226 39.118231 7.4609375 32.220703 A 2.0002 2.0002 0 1 0 3.7636719 33.746094 C 7.2123838 42.100566 15.437804 47.982422 25.017578 47.982422 C 37.696454 47.982422 48.017578 37.661298 48.017578 24.982422 C 48.017578 12.303546 37.696454 1.9824219 25.017578 1.9824219 z M 26.962891 15.962891 A 2.0002 2.0002 0 0 0 25.568359 19.396484 L 29.154297 22.982422 L 3.9824219 22.982422 A 2.0002 2.0002 0 1 0 3.9824219 26.982422 L 29.154297 26.982422 L 25.568359 30.568359 A 2.0002 2.0002 0 1 0 28.396484 33.396484 L 35.396484 26.396484 A 2.0002 2.0002 0 0 0 35.396484 23.568359 L 28.396484 16.568359 A 2.0002 2.0002 0 0 0 26.962891 15.962891 z"/></svg>
                <h3 onClick={handleOpenCart}>Login / Signup</h3>
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