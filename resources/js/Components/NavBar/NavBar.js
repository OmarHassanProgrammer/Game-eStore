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
        handleCloseCart,
        user,
        logout
    } = props;

    const [toggleUser, setToggleUser] = useState(false);
    
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
              onClick={handleHome}
            >
                <img src={Logo} className={styles.svg}  style={{ filter: 'invert(78%) brightness(10000%)' }} />
                <h3>Game Store</h3>
            </div>
    
            <div className={styles.pathdiv} id="1"
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
              onClick={() => {location.href="/list"}}
            >
                <svg className={styles.svg2} xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 30 30" width="60px" height="60px"><path d="M 13 4 A 1.0001 1.0001 0 1 0 13 6 L 13 14 C 13 14.552 13.448 15 14 15 L 26 15 C 26.552 15 27 14.552 27 14 L 27 6 A 1.0001 1.0001 0 1 0 27 4 L 13 4 z M 18 6 L 22 6 C 22.552 6 23 6.448 23 7 C 23 7.552 22.552 8 22 8 L 18 8 C 17.448 8 17 7.552 17 7 C 17 6.448 17.448 6 18 6 z M 8 15 A 3 3 0 0 0 6.8828125 15.216797 L 2 17 L 2 25 L 6.2207031 23.166016 C 6.7187031 22.950016 7.2821563 22.942438 7.7851562 23.148438 L 16.849609 26.851562 C 16.849609 26.851562 16.853494 26.851563 16.853516 26.851562 A 1.5 1.5 0 0 0 17.5 27 A 1.5 1.5 0 0 0 18.238281 26.802734 C 18.238413 26.802691 18.244057 26.802776 18.244141 26.802734 L 27.230469 21.810547 L 27.228516 21.808594 A 1.5 1.5 0 0 0 28 20.5 A 1.5 1.5 0 0 0 26.5 19 A 1.5 1.5 0 0 0 25.863281 19.144531 L 25.863281 19.142578 L 19 22 L 17.5 22 A 1.5 1.5 0 0 0 19 20.5 A 1.5 1.5 0 0 0 17.964844 19.074219 L 17.964844 19.072266 L 9.2714844 15.28125 L 9.2597656 15.28125 A 3 3 0 0 0 8 15 z"/></svg>
                <h3 onClick={() => {location.href="/list"}}>Sell An Item</h3>
            </div>

            {
              user?<div className={styles.dropboxContainer}>
                <div 
                  className={styles.cartdiv}
                  onClick={() => {setToggleUser(!toggleUser)}}
                >
                  <svg className={styles.svg2} xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 50 50" width="100px" height="100px"><path d="M 25 2.0078125 C 12.309296 2.0078125 2.0000002 12.317108 2 25.007812 C 2 37.112262 11.38131 47.043195 23.259766 47.935547 C 23.283185 47.93745 23.306613 47.939576 23.330078 47.941406 C 23.882405 47.981205 24.437631 48.007812 25 48.007812 C 25.562369 48.007812 26.117595 47.981205 26.669922 47.941406 C 26.693387 47.939576 26.716815 47.93745 26.740234 47.935547 C 38.61869 47.043195 48 37.112262 48 25.007812 C 48 12.317108 37.690704 2.0078125 25 2.0078125 z M 25 4.0078125 C 36.609824 4.0078125 46 13.397988 46 25.007812 C 46 30.739515 43.704813 35.924072 39.990234 39.710938 C 38.401074 38.55372 36.437194 37.863387 34.677734 37.246094 C 32.593734 36.516094 30.622172 35.824094 30.076172 34.621094 C 29.990172 33.594094 29.997859 32.792094 30.005859 31.871094 L 30.007812 31.480469 C 30.895813 30.635469 32.012531 28.852078 32.394531 27.205078 C 33.054531 26.853078 33.861516 26.009281 34.103516 23.988281 C 34.224516 22.985281 33.939062 22.2085 33.539062 21.6875 C 34.079062 19.8325 35.153484 15.136469 33.271484 12.105469 C 32.475484 10.824469 31.274313 10.016266 29.695312 9.6972656 C 28.808312 8.5992656 27.134484 8 24.896484 8 C 21.495484 8.063 19.002234 9.1047031 17.490234 11.095703 C 15.707234 13.445703 15.370328 16.996297 16.486328 21.654297 C 16.073328 22.175297 15.775438 22.963328 15.898438 23.986328 C 16.141438 26.007328 16.945469 26.851125 17.605469 27.203125 C 17.987469 28.852125 19.103188 30.635469 19.992188 31.480469 L 19.994141 31.861328 C 20.002141 32.786328 20.009828 33.590094 19.923828 34.621094 C 19.375828 35.827094 17.394781 36.526625 15.300781 37.265625 C 13.551886 37.88319 11.599631 38.574586 10.013672 39.716797 C 6.2962191 35.929504 4 30.742023 4 25.007812 C 4.0000002 13.397989 13.390176 4.0078125 25 4.0078125 z"/></svg>
                  <h3>{user.name}</h3>
                </div>
                {
                  toggleUser?<div className={styles.userDropbox}>
                    <div className={styles.item} onClick={() => {location.href = "/profile"; setToggleUser(false);}}>Profile</div>
                    <div className={styles.item} onClick={() => {location.href = "/settings?page=profile"; setToggleUser(false);}}>Dashboard</div>
                    <div className={styles.item}>Balance</div>
                    <div className={styles.item} onClick={() => {logout(); setToggleUser(false);}}>Logout</div>
                  </div>:""
                }
              </div>:
              <div 
                className={styles.cartdiv} 
                onClick={() => {window.location.href = "login"}}
              >
                  <svg className={styles.svg2} fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="100px" height="100px"><path d="M 25.017578 1.9824219 C 15.436898 1.9824219 7.2123268 7.8663695 3.7636719 16.220703 A 2.0002 2.0002 0 1 0 7.4609375 17.746094 C 10.308283 10.848427 17.072259 5.9824219 25.017578 5.9824219 C 35.534702 5.9824219 44.017578 14.465298 44.017578 24.982422 C 44.017578 35.499546 35.534702 43.982422 25.017578 43.982422 C 17.073352 43.982422 10.308226 39.118231 7.4609375 32.220703 A 2.0002 2.0002 0 1 0 3.7636719 33.746094 C 7.2123838 42.100566 15.437804 47.982422 25.017578 47.982422 C 37.696454 47.982422 48.017578 37.661298 48.017578 24.982422 C 48.017578 12.303546 37.696454 1.9824219 25.017578 1.9824219 z M 26.962891 15.962891 A 2.0002 2.0002 0 0 0 25.568359 19.396484 L 29.154297 22.982422 L 3.9824219 22.982422 A 2.0002 2.0002 0 1 0 3.9824219 26.982422 L 29.154297 26.982422 L 25.568359 30.568359 A 2.0002 2.0002 0 1 0 28.396484 33.396484 L 35.396484 26.396484 A 2.0002 2.0002 0 0 0 35.396484 23.568359 L 28.396484 16.568359 A 2.0002 2.0002 0 0 0 26.962891 15.962891 z"/></svg>
                  <h3 onClick={handleOpenCart}>Login / Signup</h3>
              </div>
            }
            

            <div 
              className={styles.cartdiv} 
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

