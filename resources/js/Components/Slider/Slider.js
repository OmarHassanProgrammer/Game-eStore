import styles from './Slider.module.css';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import templateGame from '../../utils/templateGame';

const Slider = props => {
  const {
    selectedGame,
    setSelectedGame,
    allGames,
    incrementCarousel,
    decrementCarousel,
    carouselState,
    setCarouselState,
    hoverState,
    handleHover
  } = props;

  const [footageIndex, setFootageIndex] = useState(0);
  const slideRef = React.createRef();

  useEffect(() => {
    const selectedGameIndex = allGames.findIndex(game => "/react-ecommerce-store/games/" + game.surname === location.pathname);
    setSelectedGame(allGames[selectedGameIndex]);
  }, []);

  const properties = {
    duration: 6000,
    autoplay: false,
    transitionDuration: 800,
    arrows: false,
    infinite: true,
    easing: "ease"
  };

  const slideImages = selectedGame?.images;

  const templateImages = [
    templateGame.footage[0],
    templateGame.footage[1],
    templateGame.footage[2],
    templateGame.footage[3]
  ]

  const back = () => {
    if (carouselState > 0) {
      setCarouselState(carouselState - 1);
    } else {
      setCarouselState(slideImages.length - 1);
    }
    slideRef.current.goBack();
  }

  const next = () => {
    if (carouselState < slideImages.length - 1) {
      setCarouselState(carouselState + 1);
    } else {
      setCarouselState(0);
    }
    slideRef.current.goNext();
  }

  const jumpToIndex = (e) => {
    console.log(e.target.id);
    let index = parseInt(e.target.id);
    console.log(index);
    setCarouselState(index);
    slideRef.current.goTo(index);
  }

  return (
        <div className={styles.slider}>
          <Slide ref={slideRef} {...properties}>
            {selectedGame ? slideImages.map((each, index) => (
              <div 
                key={index} 
                className={styles.slide}
              >
                <img 
                  className={styles.currentImg} 
                  src={"../assets/items/" + each.image} 
                  alt="sample" 
                />
              </div>
            )) : templateImages.map((each, index) => (
              <div 
                key={index} 
                className={styles.slide}
              >
                <img 
                  className={styles.currentImg} 
                  src={each} 
                  alt="sample" 
                />
              </div>
            ))}
          </Slide>
    
            <button 
              className={styles.backwards} 
              onClick={back} 
              id="22" 
              onMouseEnter={handleHover} 
              onMouseLeave={handleHover} 
              aria-label="Previous Picture"
            >
                <svg className={styles.left} 
                  style={{ fill: hoverState[22].hovered ? "#fff" : "#ccc" }} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z"/></svg>
            </button>
    
            <button 
              className={styles.forward} 
              onClick={next} id="23" 
              onMouseEnter={handleHover} 
              onMouseLeave={handleHover} 
              aria-label="Next Picture"
            >
                <svg className={styles.right} 
                  style={{ fill: hoverState[23].hovered ? "#fff" : "#ccc" }} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"/></svg>
            </button>
            <div className={styles.selectorContainer}>
              {
                slideImages?slideImages.map(image => {
                  <button 
                    id={image.id}
                    onClick={jumpToIndex} 
                    className={carouselState === image.id ? styles.buttonSelected : styles.button} 
                    aria-label="Jump to picture"
                  >
                  </button>
                }):""
              }
            </div>
        </div>
  );
}

export default Slider;