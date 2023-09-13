import styles from './Card.module.css';
import React from 'react';
import Like from "../../../assets/icons/like.svg";
import Add from "../../../assets/icons/add.svg";
import { motion } from "framer-motion";
import AddToCart from '../AddToCart/AddToCart';
import AddedToCart from '../AddedToCart/AddedToCart';
import AnimatedCard from '../../Containers/AnimatedPage/AnimatedCard';

const Card = props => {
    const { 
        game,
        handleAddToCart,
        handleHover,
        browseType,
        handleLike,
        handleHoverGame,
        handleSelectGame,
        smallFont,
        gameKey,
        close=false,
        closeFunc=()=>{}
      } = props;

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }


    return (
          <motion.div 
            className={styles.cardHome}
            onClick={handleSelectGame.bind(this, game.id)}
            id={game.id}
            style={{ margin: 0, textAlign: "center" }}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {close?<span className={styles.close} onClick={closeFunc.bind(this, game.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></span>:null}
            <img src={browseType != "/items"?'../../../assets' + browseType + '/' + game.id + '.' + game.imgType:("../../../assets/items/" + game.images[0]?.image??"d.jpg")} className={styles.img} alt="Game Cover Image" />
            { 
              browseType == "/items"?
              <div className={styles.price} style={{fontSize: smallFont? "0.9rem":""}}>
                      {game.inCart ? <AddedToCart /> : <AddToCart 
                                            game={game} 
                                            handleHoverGame={handleHoverGame} 
                                            handleAddToCart={handleAddToCart} 
                                            gameKey={gameKey}
                                          />
                      }
                  ${game.price}
              </div>:""
            }
                <h2 className={styles.name} style={
                    browseType == "/items"?{fontSize: smallFont? "1.3rem":"", padding: smallFont?"10px 0 0 0":""}:{paddingTop:"20px",paddingBottom:"20px", fontSize: smallFont? "1.3rem":"", padding: smallFont?"10px 0 0 0":""}
                  }
                  >{game.name}</h2>
            
            
            {
              browseType == "/items"?
                <button 
                  className={styles.like} 
                  id={game.id} 
                  onClick={handleLike.bind(this, game.id, gameKey)} 
                  aria-label="Like"
                >
                    <img
                      src={Like} 
                      style={{ filter: game.isLiked ? '' :  'invert(78%) brightness(10000%)' }}
                      className={styles.likeSVG}
                    />
                </button>:""
            }
          </motion.div>
    );
  }
  
  export default Card;