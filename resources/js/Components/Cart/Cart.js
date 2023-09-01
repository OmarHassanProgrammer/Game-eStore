import styles from './Cart.module.css';
import React, { useState } from 'react';
import Right from "../../../assets/icons/arrowRight.svg";
import Cross from "../../../assets/icons/cross.svg";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCart from '../../Containers/AnimatedPage/AnimatedCart';
import AnimatedCard from '../../Containers/AnimatedPage/AnimatedCard';

const Cart = props => {
    const {
        cartAmount,
        cart,
        handleOpenCart,
        handleCloseCart,
        cartDisplayed,
        handleHover,
        hoverState,
        clearCart,
        handleRemoveFromCart,
        openGamePage
    } = props;

    const [total, setTotal] = useState(0);
    let newTotal = 0;
    cart.forEach((item, i) => {
        let priceAsNumber = parseFloat(item.price);
        let currentTotal = parseFloat(newTotal);
        newTotal = (priceAsNumber + currentTotal).toFixed(2);

        if (i === cart.length) {
            setTotal(newTotal);
        }
    })

    const variants = {
        initial: { x: 100 },
        animate: { x: 0, transition: {  x: { type: "spring", duration: 1.2, bounce: 0.4 }} },
        exit: { x: 100, transition: {  x: { type: "spring", duration: 1.2, bounce: 0.575 }} },
    }

    return (
        <div className={styles.cartWindow}>
                <div className={styles.back} onClick={handleCloseCart}>
    
                </div>
            <AnimatedCart>
                    <div 
                    className={styles.cart} 
                    style={{ backgroundColor: "#1A1A1A", height: "100vh" }}
                    >
                        <div className={styles.top}>
                            <div className={styles.topHeader}>
                                <h2>{cartAmount >= 1 ? cartAmount > 1 ? `${cartAmount} games` : "1 game" : "No games added"}</h2>
                                <h3 onClick={clearCart}>{cartAmount >= 1 ? "Clear" : ""}</h3>
                            </div>
            
                            <div className={styles.topGames}>
                                {cart.map((item, i) => {
                                    return <motion.div 
                                            className={styles.item} 
                                            key={i} 
                                            variants={variants} 
                                            initial="initial" 
                                            animate="animate" 
                                            exit="exit"
                                            >
                                            <h3 id={item.surname} onClick={() => {location.href = "game?id=" + item.id}}>{item.name}</h3>
                                            <div>
                                                ${item.price}
                                                <button id={item.id} onClick={handleRemoveFromCart.bind(this, item.id, i)} className={styles.removeButton} aria-label="Close">
                                                    <svg className={styles.cross} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 94.926 94.926" xmlSpace="preserve"><g><path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                                                </button>
                                            </div>
                                            </motion.div>
                                })}
                            </div>
                        </div>
            
                        <div 
                          className={styles.bottom}  
                          style={{ width: "87.5%" , display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                                <h3>Total: ${newTotal}</h3>
                                <button 
                                  id="24" 
                                  onMouseEnter={handleHover} 
                                  onMouseLeave={handleHover} 
                                  style={{ fill: "#fff"}} 
                                  aria-label="Checkout"
                                  onClick={() => { location.href = "checkout" }}
                                >
                                    Checkout
                                    <svg className={styles.right} style={{ fill: "#fff" }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"/></svg>
                                </button>
                        </div>
                    </div>
                    </AnimatedCart>
        </div>
    );
  }
  
  export default Cart;