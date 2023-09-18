import React from "react";
import styles from "./Filters.module.css";
import Wishlist from "../../../assets/icons/wishlist.svg";
import Ratings from "../../../assets/icons/ratings.svg";
import { useState } from "react";
import { useEffect } from "react";
import categories from "../../utils/categories";
import axios from "axios";

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
        handleSelectGenre,
        setCurrentCategory,
        currentCategoryId,
        setCurrentCategoryId,
        handleSelectGameFilter,
        currentFilter,
        currentItemFilter,
        genres,
        activeGenre,
        handleSelectItemFilter,
        browseType
    } = props;

    const numElements = 9; // number of elements to pick
    const [randomGames, setRandomGames] = useState([]);
    useEffect(() => {
      let id = -1;
      if(window.location.search.indexOf('game=') != -1) {
        let q = window.location.search.slice(window.location.search.indexOf('game=') + 5);
        const i = q.indexOf("&");
        if(i != -1) {
          q = q.slice(0, i);
        }

        const apiUrl = '/api/games/get/' + q; // Replace with your actual API endpoint
        axios.get(apiUrl)
          .then(response => {
            if(response.data.game) {
              setCurrentGame(response.data.game);
              setCurrentGameId(response.data.game.id); 
            }
            else
              setCurrentGame({});
          })
          .catch(error => {
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
            console.error('Error fetching data:', error);
          });
      }

      if(window.location.search.indexOf('category=') != -1) {
        
        let q = window.location.search.slice(window.location.search.indexOf('category=') + 9);
        const i = q.indexOf("&");
        if(i != -1) {
          q = q.slice(0, i);
        }
        const apiUrl = '/api/categories/get/' + q; // Replace with your actual API endpoint
        axios.get(apiUrl)
          .then(response => {
            if(response.data.category) {
              setCurrentCategory(response.data.category);
              setCurrentCategoryId(response.data.category.id); 
            }
            else
              setCurrentCategory({});
          })
          .catch(error => {
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
            console.error('Error fetching data:', error);
          });
        
        }

    }, [window.location.search]);
    
    useEffect(() => {
      if(window.location.href != "/games") {
        const apiUrl = '/api/games/getRandom/5'; // Replace with your actual API endpoint
        axios.get(apiUrl)
          .then(response => {
              setRandomGames(response.data.games);
          })
          .catch(error => {
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
            console.error('Error fetching data:', error);
          });
      }

      if(window.location.pathname == "items") {
        if(window.location.search.indexOf('game=') == -1) { 
          window.location.href = "/games";
        } else if (window.location.search.indexOf('category=') == -1) {
          window.location.href = "/categories?game=" + currentGame;
        } else {
          
        }
      }
    }, []);

    
    return (
        <div className={styles.filters}>
          { (window.location.pathname + window.location.search) == "/games"?
            <div>
              <div className={styles.genreFilters}>
                <h2>Genres</h2>
                {
                  genres?
                  genres.map((genre, index) => {
                    return <div 
                      key={index}
                      className={styles.filterDiv} 
                      id={genre.id}
                      style={{backgroundColor: activeGenre.id == genre.id?"#333":"transparent"}}
                      onMouseEnter={handleHover} 
                      onMouseLeave={handleHover} 
                      onClick={handleSelectGenre.bind(this, genre)}
                    >
                        <button 
                          className={styles.filterBtn3} 
                          aria-label="Show action genre"
                        >
                            <img 
                              src={"../../assets/genres/" + genre.id + "." + genre.imgType} 
                              className={styles.filterSVG3}
                            />
                        </button>
                        {genre.name}
                    </div>
                  }):""
                }
              </div>
            </div>:
            (window.location.pathname) == "/categories"?
            <div>
              <h2 onClick={handleBrowse.bind(this, "games")}>Games</h2>

              <div className={styles.globalFilters}>
                {
                  randomGames.map((game, index) => {
                    return <div 
                            key={index}
                            className={styles.filterDiv} 
                            id={game.id}
                            onMouseEnter={handleHover} 
                            onMouseLeave={handleHover} 
                            onClick={currentGame.id == game.id?handleBrowse.bind(this, "game"):handleSelectGameFilter}
                            style={{fontSize: "0.9rem", backgroundColor: (currentGame.id == game.id)?"#333":"transparent"}}
                            aria-label={game.name}
                          >
                            <button 
                              className={styles.gameFilter} 
                              aria-label={game.name}
                            >
                                <img
                                    src={'../../../assets' + browseType + '/' + game.id + '.' + game.imgType} 
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
          </div>:
          <div>
            {
              currentGameId != -1?<>
              <h2 onClick={handleBrowse.bind(this, "games")}>Game</h2>
              <div>
                  <div 
                    className={styles.filterDiv} 
                    id={currentGameId}
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleHover} 
                    onClick={handleBrowse.bind(this, "games")}
                    style={{fontSize: "0.9rem"}}
                    aria-label={currentGame.name}
                  >
                    <button 
                      className={styles.gameFilter} 
                      aria-label={currentGame.name}
                    >
                        <img
                            src={'../../../assets/games/' + currentGame.id + '.' + currentGame.imgType} 
                            className={styles.gameFilterImg}
                        />
                    </button>
                    {
                      currentGame.name
                    }
                </div>
                  
              </div></>:""
            }
            {
              currentCategoryId != -1?<>
              <h2 onClick={handleBrowse.bind(this, "categories")}>Category</h2>
              <div>
                  <div 
                    className={styles.filterDiv} 
                    id={currentCategoryId}
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleHover} 
                    onClick={handleBrowse.bind(this, "categories")}
                    style={{fontSize: "0.9rem"}}
                    aria-label={currentCategory.name}
                  >
                    <button 
                      className={styles.gameFilter} 
                      aria-label={currentCategory.name}
                    >
                        <img
                            src={'../../../assets/categories/' + currentCategory.id + '.' + currentCategory.imgType} 
                            className={styles.gameFilterImg}
                        />
                    </button>
                    {
                      currentCategory.name
                    }
                </div>
                  
              </div></>:""
            }

            <h2>Filter</h2>
            <div className={styles.globalFilters}>
                  <div 
                    className={styles.filterDiv} 
                    id="8" 
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleHover} 
                    onClick={handleSelectItemFilter.bind(this, "Wishlist")}
                  >
                    <button 
                      className={styles.filterBtn} 
                      style={{ backgroundColor: (currentItemFilter == "Wishlist") ? "#fff" : "#2d2d2d" }}
                      aria-label="Open wishlist"
                    >
                        <img
                            src={Wishlist} 
                            style={{ filter: (currentItemFilter == "Wishlist") ? "" : "grayscale(100%) invert(1)" }} 
                            className={styles.Wishlist}
                        />
                    </button>
                    Wishlist
                  </div>
        
                  <div 
                    className={styles.filterDiv}
                    id="10" 
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleHover} 
                    onClick={handleSelectItemFilter.bind(this, "Price")}
                  >
                    <button 
                      className={`${styles.filterBtn3} ${styles.Reviews}`} 
                      style={{ backgroundColor: (currentItemFilter == "Price") ? "#fff" : "#2d2d2d" }}
                      aria-label="Sort after reviews"
                    >
                      <svg className={`${styles.filterSVG3} ${styles.Reviews}`} style={{ filter: (currentItemFilter == "Price") ? "" : "grayscale(100%) invert(1)" }}  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                      
                        <g>
                          <g>
                            <path d="m256,11c-135.1,0-245,109.9-245,245s109.9,245 245,245c135.1,0 245-109.9 245-245s-109.9-245-245-245zm0,449.2c-112.6,0-204.2-91.6-204.2-204.2 0-112.6 91.6-204.2 204.2-204.2 112.6,0 204.2,91.6 204.2,204.2 0,112.6-91.6,204.2-204.2,204.2z"/>
                            <path d="m268.8,224.8v-66.5c11,4.8 17.8,13.8 20.4,27.2l43-5.6c-2.9-17-9.8-30.6-20.4-40.7-10.7-10.2-25-16.3-43-18.5v-16.8h-24.7v16.8c-19.5,1.9-35.1,9.2-46.9,21.9-11.7,12.6-17.6,28.3-17.6,46.9 0,18.4 5.2,34 15.6,46.9 10.4,12.9 26.7,22.5 48.9,28.8v71.3c-6.1-2.9-11.7-7.7-16.7-14.3-5-6.6-8.4-14.4-10.2-23.5l-44.4,4.8c3.4,22.3 11.2,39.6 23.5,51.9s28.2,19.6 47.8,21.9v31h24.7v-31.8c22.1-3.2 39.4-11.8 51.8-25.9 12.4-14.1 18.6-31.4 18.6-51.9 0-18.4-4.9-33.4-14.8-45.2-9.9-11.8-28.4-21.3-55.6-28.7zm-24.7-8.2c-36.1-11.8-24.2-58.9 0-58.9v58.9zm24.7,122.2v-66.4c36.2,7 33.1,59.5 0,66.4z"/>
                          </g>
                        </g>
                      </svg>
                    </button>
                    Price
                  </div>
            </div>
          </div>
          }
        </div>
    )
}

export default Filters;