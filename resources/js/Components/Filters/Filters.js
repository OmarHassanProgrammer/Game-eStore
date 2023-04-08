import React from "react";
import styles from "./Filters.module.css";
import Wishlist from "../../../assets/images/wishlist.svg";
import Ratings from "../../../assets/images/ratings.svg";
import Reviews from "../../../assets/images/reviews.svg";
import Action from "../../../assets/images/action.svg";
import Strategy from "../../../assets/images/strategy.svg";
import RPG from "../../../assets/images/RPG.svg";
import Shooter from "../../../assets/images/shooter.svg";
import Adventure from "../../../assets/images/adventure.svg";
import Puzzle from "../../../assets/images/puzzle.svg";
import Racing from "../../../assets/images/racing.svg";
import Sports from "../../../assets/images/sports.svg";
import { useState } from "react";
import { useEffect } from "react";
import games from "../../utils/games";
import categories from "../../utils/categories";

const Filters = props => {
    const {
        hoverState,
        handleHover,
        handleSelect,
        handleBrowse,
        currentGame,
        setCurrentGame,
        currentGameId,
        setCurrentGameId,
        currentCategory,
        setCurrentCategory,
        currentCategoryId,
        setCurrentCategoryId,
        handleSelectGameFilter,
        currentFilter
    } = props;

    const numElements = 9; // number of elements to pick
    const [randomGames, setRandomGames] = useState([]);
    useEffect(() => {
      let found = false;

      let id = -1;
      const G = games.filter((game) => {
            
          if(!found)  {
            let q = window.location.search.slice(window.location.search.indexOf('game=') + 5);
            const i = q.indexOf("&");
            if(i != -1) {
              q = q.slice(0, i);
            }
            if(game.id == q) {
              id = game.id;
              found = true;
              return game;
            }
          }
      })[0];
      if(found)
        setCurrentGame(G);
      setCurrentGameId(id);

      let Cfound = false;

      let Cid = -1;
      const C = categories.filter((category) => {
            
          if(!Cfound)  {
            let q = window.location.search.slice(window.location.search.indexOf('category=') + 9);
            const i = q.indexOf("&");
            if(i != -1) {
              q = q.slice(0, i);
            }
            if(category.id == q) {
              Cid = category.id;
              Cfound = true;
              return category;
            }
          }
      })[0];
      if(Cfound)
        setCurrentCategory(C);
      setCurrentCategoryId(Cid);
    }, [window.location.search]);
    
    useEffect(() => {
      if(window.location.href != "/games") {
        const randomIndices = new Set(); // set to store the unique indices

        while (randomIndices.size < numElements) {
          const randomIndex = Math.floor(Math.random() * games.length);
          randomIndices.add(randomIndex);
        }
        const r = Array.from(randomIndices).map(index => games[index]);
        
      let found = false;
      let id = -1;

      let g = games.filter((game) => {

        if(!found)  {
          let q = window.location.search.slice(window.location.search.indexOf('game=') + 5);
          const i = q.indexOf("&");
          if(i != -1) {
            q = q.slice(0, i);
          }
          if(game.id == q) {
            found = true;
            return game;
          }
        }
        })[0];
        setCurrentGameId(id);
        if(found) {
          r.splice(r.indexOf(g), 1);
          setRandomGames([g, ...r]);
        } else {
          setRandomGames([...r]);
        }

        console.log(r);
    
      }
    }, []);

    
    return (
        <div className={styles.filters}>
          {currentCategoryId} game {currentGameId}
          { (window.location.pathname + window.location.search) == "/games"?
            <div>
              <h2>Filters</h2>

              <div className={styles.globalFilters}>
                  <div 
                    className={styles.filterDiv} 
                    id="8" 
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleHover} 
                    onClick={handleSelect}
                  >
                    <button 
                      className={styles.filterBtn} 
                      style={{ backgroundColor: (hoverState[8].hovered || currentFilter.includes("Wishlist")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Open wishlist"
                    >
                        <img
                            src={Wishlist} 
                            style={{ filter: (hoverState[8].hovered || currentFilter.includes("Wishlist")) ? "" : "grayscale(100%) invert(1)" }} 
                            className={styles.Wishlist}
                        />
                    </button>
                    Wishlist
                  </div>
        
                  <div 
                    className={styles.filterDiv} 
                    id="9" 
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleHover} 
                    onClick={handleSelect}
                  >
                    <button 
                      className={`${styles.filterBtn2} ${styles.Ratings}`} 
                      style={{ backgroundColor: (hoverState[9].hovered || currentFilter.includes("Ratings")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Sort after ratings"
                    >
                        <img 
                          src={Ratings}
                          className={`${styles.filterSVG2} ${styles.Ratings}`} 
                          style={{ filter: (hoverState[9].hovered || currentFilter.includes("Ratings")) ? "" : "grayscale(100%) invert(1)" }} 
                        />
                    </button>
                    Ratings
                  </div>
        
                  <div 
                    className={styles.filterDiv}
                    id="10" 
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleHover} 
                    onClick={handleSelect}
                  >
                    <button 
                      className={`${styles.filterBtn3} ${styles.Reviews}`} 
                      style={{ backgroundColor: (hoverState[10].hovered || currentFilter.includes("Reviews")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Sort after reviews"
                    >
                        <img
                            src={Reviews}
                          className={`${styles.filterSVG3} ${styles.Reviews}`} 
                          viewBox="0 0 48 48" 
                          style={{ filter: (hoverState[10].hovered || currentFilter.includes("Reviews")) ? "" : "grayscale(100%) invert(1)" }} 
                        />
                    </button>
                    Reviews
                  </div>
              </div>

              <div className={styles.genreFilters}>
                <h2>Genres</h2>

                <div 
                  className={styles.filterDiv} 
                  id="11" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn3} 
                      style={{ backgroundColor: (hoverState[11].hovered || currentFilter.includes("Action")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show action genre"
                    >
                        <img 
                          src={Action} 
                          className={styles.filterSVG3}
                          style={{ filter: (hoverState[11].hovered || currentFilter.includes("Action")) ? "" : "grayscale(100%) invert(1)" }} 
                        />
                    </button>
                    Action
                </div>

                <div 
                  className={styles.filterDiv} 
                  id="12" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn2} 
                      style={{ backgroundColor: (hoverState[12].hovered || currentFilter.includes("Strategy")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show Strategy genre"
                    >
                        <img
                          src={Strategy} 
                          className={styles.filterSVG2} 
                          style={{ filter: (hoverState[12].hovered || currentFilter.includes("Strategy")) ? "" : "grayscale(100%) invert(1)" }} 
                        />
                    </button>
                    Strategy
                </div>

                <div 
                  className={styles.filterDiv} 
                  id="13" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn3} 
                      style={{ backgroundColor: (hoverState[13].hovered || currentFilter.includes("RPG")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show RPG genre"
                    >
                        <img 
                            src={RPG} 
                          className={styles.filterSVG3} 
                          style={{ filter: (hoverState[13].hovered || currentFilter.includes("RPG")) ? "" : "grayscale(100%) invert(1)" }} 
                          />
                    </button>
                    RPG
                </div>

                <div 
                  className={styles.filterDiv} 
                  id="14" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn2} 
                      style={{ backgroundColor: (hoverState[14].hovered || currentFilter.includes("Shooter")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show Shooter genre"
                    >
                        <img
                            src={Strategy} 
                          className={styles.filterSVG2} 
                          style={{ filter: (hoverState[14].hovered || currentFilter.includes("Shooter")) ? "" : "grayscale(100%) invert(1)" }} 
                          />
                    </button>
                    Shooter
                </div>

                <div 
                  className={styles.filterDiv} 
                  id="15" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn2} 
                      style={{ backgroundColor: (hoverState[15].hovered || currentFilter.includes("Adventure")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show Adventure genre"
                    >
                        <img
                            src={Adventure} 
                          className={styles.filterSVG2} 
                          style={{ filter: (hoverState[15].hovered || currentFilter.includes("Adventure")) ? "" : "grayscale(100%) invert(1)" }} 
                          />
                    </button>
                    Adventure
                </div>

                <div 
                  className={styles.filterDiv} 
                  id="16" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn4} 
                      style={{ backgroundColor: (hoverState[16].hovered || currentFilter.includes("Puzzle")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show Puzzle genre"
                      >
                        <img
                            src={Puzzle} 
                          className={styles.filterSVG2} 
                          style={{ filter: (hoverState[16].hovered || currentFilter.includes("Puzzle")) ? "" : "grayscale(100%) invert(1)" }} 
                          />
                    </button>
                    Puzzle
                </div>

                <div 
                  className={styles.filterDiv} 
                  id="17" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn3} 
                      style={{ backgroundColor: (hoverState[17].hovered || currentFilter.includes("Racing")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show Racing genre"
                    >
                        <img
                            src={Racing} 
                          className={styles.filterSVG3} 
                          style={{ filter: (hoverState[17].hovered || currentFilter.includes("Racing")) ? "" : "grayscale(100%) invert(1)" }} 
                          />
                    </button>
                    Racing
                </div>

                <div 
                  className={styles.filterDiv} 
                  id="18" 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleHover} 
                  onClick={handleSelect}
                >
                    <button 
                      className={styles.filterBtn4} 
                      style={{ backgroundColor: (hoverState[18].hovered || currentFilter.includes("Sports")) ? "#fff" : "#2d2d2d" }}
                      aria-label="Show Sports genre"
                    >
                        <img
                            src={Sports} 
                          className={styles.filterSVG3} 
                          style={{ filter: (hoverState[18].hovered || currentFilter.includes("Sports")) ? "" : "grayscale(100%) invert(1)" }} 
                          />
                    </button>
                    Sports
                </div>
              </div>
            </div>:
            <div>
              <h2 onClick={handleBrowse}>Games</h2>

              <div className={styles.globalFilters}>
                {
                  randomGames.map((game, index) => {
                    return <div 
                            key={index}
                            className={styles.filterDiv} 
                            id={game.id}
                            onMouseEnter={handleHover} 
                            onMouseLeave={handleHover} 
                            onClick={handleSelectGameFilter}
                            style={{fontSize: "0.9rem", backgroundColor: (currentGame.id == game.id)?"#333":"transparent"}}
                            aria-label={game.name}
                          >
                            <button 
                              className={styles.gameFilter} 
                              aria-label={game.name}
                            >
                                <img
                                    src={game.cover} 
                                    className={styles.gameFilterImg}
                                />
                            </button>
                            {
                              game.name
                            }
                        </div>
                  })
                }
                
            </div>
          </div>
          }
        </div>
    )
}

export default Filters;