import styles from './AddToCart.module.css';
import React from 'react';
import Add from "../../../assets/images/add.svg";
import AnimatedCardNoInit from '../../Containers/AnimatedPage/AnimatedCardNoInit';

const AddToCart = props => {
    const {
        game,
        handleHoverGame,
        handleAddToCart
    } = props;

    return (
          <div className={styles.addToCart} onMouseEnter={handleHoverGame} onMouseLeave={handleHoverGame} id={game.id} onClick={handleAddToCart}>
            <h4 style={{ color: game.isHovered ? "#92f" : "#999" }}>Add to cart</h4>
            <img src={Add} className={styles.add} style={{ filter: game.isHovered ? "" : "grayscale(100%)" }} />
          </div>
    );
  }
  
  export default AddToCart;