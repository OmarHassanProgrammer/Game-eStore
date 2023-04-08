
import ReactDOM from 'react-dom';
import styles from './Browse.module.css';
import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { AnimatePresence } from "framer-motion";
import AnimatedPage from '../AnimatedPage/AnimatedPage';
import Grids from "../../../assets/images/grid.svg";
import Columns from "../../../assets/images/columns.svg";
import Filters from '../../Components/Filters/Filters';
import Grid from '../../Components/Grid/Grid';
import games from '../../utils/games';
import categories from '../../utils/categories';
import Cart from '../../Components/Cart/Cart';
import Footer from '../../Components/Footer/Footer';
import filterNames from '../../utils/filterNames';
import templateGame from '../../utils/templateGame';
export default function Browse (props) {
  
  const [currentFilter, setCurrentFilter] = useState("none");
  const [allGames, setAllGames] = useState(games);
  const [shownCategories, setShownCategories] = useState(categories);
  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [shownGames, setShownGames] = useState(allGames);
  const [reviewDisplay, setReviewDisplay] = useState(false);
  const [cartDisplayed, setCartDisplayed] = useState(false);
  const [search, setSearch] = useState("");
  const [overlap, setOverlap] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedGame, setSelectedGame] = useState(false);
  const [extended, setExtended] = useState(false);
  const [textExtended, setTextExtended] = useState(false);
  const browsePages = ['/games', '/categories', '/items'];
  const [browseType, setBrowseType] = useState(window.location.pathname);
  const [currentGame, setCurrentGame] = useState({});
  const [currentGameId, setCurrentGameId] = useState(-1);
  const [currentCategory, setCurrentCategory] = useState({});
  const [currentCategoryId, setCurrentCategoryId] = useState(-1);
  const [hoverState, setHoverState] = useState([
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
        hovered: false,
        selected: false
    },
    {
      hovered: false,
      selected: false
    },
    {
      hovered: false,
      selected: false
    },
    {
      hovered: false,
      selected: false
    },
    {
      hovered: false,
      selected: false
    },
    {
      hovered: false,
      selected: false
    },
    {
      hovered: false,
      selected: false
    }
  ]);

if (window.location.href != "/" && window.location.href != "/browse" && selectedGame === false) {
  let surname = window.location.href.substring(29);
  console.log("test");
  let currentGame = games.find(game => game.surname === surname);
  if (currentGame != undefined) {
    setSelectedGame(currentGame);
  } else {
    setSelectedGame(templateGame);
  }
}

const handleSearch = (e) => {
  setSearch(e.target.value);
  setSearching(false);
}

const handleSearchSubmit = (e) => {
  setCurrentFilter("none");
  e.preventDefault();
  setSearching(true);

  if (window.location.href != "/games") {
    window.location.href = '/games';
  }
}

const handleSelect = (e) => {
  const globalFilter = e.target.id < 11;

  let activated = false;

  let updatedFilter;

  if(currentFilter == "none"){
    updatedFilter = [];
  }
  
  
  if(currentFilter != "none"){
    updatedFilter = [...currentFilter];

    for(const filter of currentFilter) {
      if((filter == "Ratings" || filter == "Reviews" || filter == "Wishlist") && globalFilter) {
        updatedFilter.splice(currentFilter.indexOf(filter), 1);
        
        if(filter == filterNames[e.target.id - 8]) {
          activated = true;
        }
      } else if ((filter != "Ratings" && filter != "Reviews" && filter != "Wishlist") && !globalFilter) {
        updatedFilter.splice(currentFilter.indexOf(filter), 1);
        if(filter == filterNames[e.target.id - 8]) {
          activated = true;
        }
        console.log("Ss");
      }
    }
  }
  if(!activated) {
    setCurrentFilter([filterNames[e.target.id - 8], ...updatedFilter]);
  } else {
    if(updatedFilter.length == 0) {
      setCurrentFilter("none");
    } else {
      setCurrentFilter(updatedFilter);
    }
  }
  
}

const handleSelectGameFilter = (e) => {
  
  window.location.search = 'game=' + e.target.id;
}

const handleSelectGame = (e) => {
  if (e.target.tagName === "BUTTON") {
    return
  } else if (e.target.classList[0] != "AddToCart_addToCart__zbJPe") {
        setSelectedGame(games[e.target.parentNode.id]);
        if((window.location.pathname) == "/games") {
          if(currentCategoryId == -1) {
            window.location.href = `/categories` + '?game=' + e.target.parentNode.id;
          } else
            window.location.href = `/items?category=` + e.target.parentNode.id + "&game=" + currentGameId;
        } else if((window.location.pathname) == "/categories") {
          if(currentGameId == -1) {
            window.location.href = `/games?category=` + e.target.parentNode.id;
          } else {
            window.location.href = `/items?category=` + e.target.parentNode.id + "&game=" + currentGameId;
          }
        } else if((window.location.pathname + window.location.search) == "/items") {
          window.location.href = `/game/${games[e.target.parentNode.id].surname}`;
        }
  }
}

const handleLike = (e) => {
  let handledLike = allGames.map((game, i) => {
    if (e.target.id == i) {
      game.isLiked = !game.isLiked
      return game
    } else {
      return game;
    }
  });

  setAllGames(handledLike);
}

const clearFilter = () => {
  setCurrentFilter("none");
  setSearch("");
  setReviewDisplay(false);
}

const openGamePage = (e) => {
  setCartDisplayed(false);
  let selectedGameSurname = e.target.id;
  window.location.href += `/game/${selectedGameSurname}`;
}


const handleHoverGame = (e) => {
  let handledHoveredGame = allGames.map((game, i) => {
    if (e.target.id == i) {
      game.isHovered = !game.isHovered
      return game
    } else {
      return game;
    }
  });

  setAllGames(handledHoveredGame);
}

const handleAddToCart = (e) => {
  e.stopPropagation();
  console.log(window.location.href);
  let handledAddedGame = allGames.map((game, i) => {
    if (browsePages.includes(window.location.href)) {
      if (e.target.id == i) {
        game.inCart = true
        let newCart = cart;
        newCart.push(game);
        setCart(newCart);
        setCartAmount(cartAmount + 1);
        return game
      } else {
        return game;
      }
    } else {
        if (selectedGame.id == i) {
          game.inCart = true
          let newCart = cart;
          newCart.push(game);
          setCart(newCart);
          setCartAmount(cartAmount + 1);
          return game
        } else {
          return game;
        }
    }
  });

  setAllGames(handledAddedGame);
}

const clearCart = () => {
  setCart([]);
  setCartAmount(0);
  const defaultGames = allGames.map((game, i) => {
    game.inCart = false;
    game.isHovered = false;
    return game;
  });
  setAllGames(defaultGames);
  let newHoverState = hoverState[21];
  newHoverState.hovered = false;
  setHoverState([
    ...hoverState, hoverState[21] = newHoverState
  ]);
}

const handleRemoveFromCart = (e) => {
  let removedIndex = cart.findIndex(game => game.id == e.target.id);
  let newAllGames = allGames.map((game, i) => {
    if (game.id == e.target.id) {
      game.inCart = false;
      game.isHovered = false;
      return game;
    } else {
      return game;
    }
  });
  setAllGames(newAllGames);
  let firstHalf = cart.slice(0, removedIndex);
  let secondHalf = cart.slice(removedIndex + 1);
  let addedUp = firstHalf.concat(secondHalf);
  setCart(addedUp);
  setCartAmount(cartAmount - 1)
  setHoverState([...hoverState, hoverState[21].hovered = false]);
}

useEffect(() => {
  setOverlap(false);

  if ((window.location.pathname + window.location.search) === "/") {
    setBrowsing(false);
  } else {
    setBrowsing(true);
  }

  if (window.location.href != "/games") {
    document.body.style.overflow = "hidden";

  } else if (browsePages.includes(window.location.href)) {
    document.body.style.overflow = "scroll";
  }
}, [window.location.href])

const handleOpenCart = () => {
  setCartDisplayed(true);
}

const handleCloseCart = () => {
  setCartDisplayed(false);
}

useEffect(() => {
  console.log(selectedGame);
}, [selectedGame])

useEffect(() => {
  if (cartDisplayed) {
    document.body.style.overflow = "hidden !important";   
  } else {
    document.body.style.overflow = "scroll !important";
  }
}, [cartDisplayed])


  const [browsing, setBrowsing] = useState(false);

  const handleHover = (e) => {
    let newHoverState = hoverState[e.target.id];
    newHoverState.hovered = !newHoverState.hovered;

    setHoverState([
        ...hoverState, hoverState[e.target.id] = newHoverState
    ]);
  }

  const handleBrowse = () => {
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      window.location.href = '/games';
    }, 1500);
  }

  const handleHome = () => {
    setBrowsing(false);
    window.location.href = '/';
  }

  const handleNavGamePage = () => {
    setHoverState([...hoverState, hoverState[21].hovered = false]);
    window.location.href = '/game/riseofthetombraider';
  }
  
  const handleNavNotFoundPage = () => {
    window.location.href = '/this-page';
  }
  
  const handleNavNotFoundQuery = () => {
    window.location.href = '/game/404';
  }
  

  const handlePlayDice = () => {
    let randomIndex = Math.floor(Math.random() * 32);
    let randomSurname = games[randomIndex].surname;
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      window.location.href += `/games/${randomSurname}`;
    }, 1500);
  }

  const variants = {
    hidden: { opacity: 1, x: -150 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 150 },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 900 },
    visible: { opacity: 1, y: 0, transition: {  y: { type: "tween", duration: 1.5, bounce: 0.3 }} },
  }
  
    const [landingPage, setLandingPage] = useState(false);
    const [grid, setGrid] = useState(true);

    const handleLayoutSwitch = (e) => {
      if (e.target.id == "grid") {
        setGrid(true);
      } else {
        setGrid(false);
      }
    }

    useEffect(() => {
      if (currentFilter == "none") {
        if(browseType == "/games") 
          setShownGames(allGames);
        else if (browseType == "/categories")
          setShownGames(shownCategories);

      } else{
        let Cgames = allGames;
        
        for(const filter of currentFilter) {
          if (filter != "Ratings" && filter != "Reviews" && filter != "Wishlist" && (filter[0] + filter[1]) != "g-") {
            let filteredShownGames = Cgames.filter(game => game.genre === filter);
            Cgames = filteredShownGames;
            setShownGames(Cgames);
  
          } else if (filter === "Ratings") {
              let filteredShownGames = Cgames.slice(0);
              filteredShownGames = filteredShownGames.sort(function(a, b) {
                return b.rating - a.rating;
              });
            Cgames = filteredShownGames;

            setShownGames(Cgames);
    
          } else if (filter === "Reviews") {
              setReviewDisplay(true);
    
          } else if (filter === "Wishlist") {
              let filteredShownGames = Cgames.filter(game => game.isLiked === true);
              Cgames = filteredShownGames;
              setShownGames(Cgames);
          } else if ((filter[0] + filter[1]) == "g-") {
            setShownGames(shownCategories);
          }
    
          if (filter != "Reviews") {
              setReviewDisplay(false);
          }
        }

      } 
    }, [currentFilter])

    useEffect(() => {
      if (cartDisplayed) {
        document.body.style.overflow = "hidden";   
      } else {
        document.body.style.overflow = "scroll";
      }
    }, [cartDisplayed])

    useEffect(() => {
      let unhoveredState = hoverState.map((element, i) => {
        if (i >= 25) {
          return
        } else {
            element.hovered = false;
            return element;
        }
      });

      setHoverState(unhoveredState);

      /*** */

      if((window.location.pathname + window.location.search) == "/games") {
        setShownGames(allGames);
      } else if ((window.location.pathname + window.location.search) == "/categories") {
        setShownGames(shownCategories);
      }
    }, []);


    useEffect(() => {
      console.log(shownGames);      
    }, [shownGames]);

    return (
      <section className={styles.Browse} style={{ maxHeight: cartDisplayed ? "100vh" : "1000vh", minHeight: "100vh" }}>
        {cartDisplayed ? <Cart 
              cartDisplayed={cartDisplayed} 
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              cart={cart}
              cartAmount={cartAmount}
              handleHover={handleHover}
              hoverState={hoverState}
              clearCart={clearCart}
              handleRemoveFromCart={handleRemoveFromCart}
              openGamePage={openGamePage}
        /> : null}
        <NavBar
          handleHover={handleHover}
          hoverState={hoverState}
          handleBrowse={handleBrowse}
          handleHome={handleHome}
          browsing={browsing}
          landingPage={landingPage}
          cartAmount={cartAmount}
          search={search}
          searching={searching}
          handleSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
          handleOpenCart={handleOpenCart}
        />

        <AnimatedPage exitBeforeEnter>
            <div className={styles.browseContent}>
              <Filters 
                hoverState={hoverState}
                currentGame={currentGame}
                setCurrentGame={setCurrentGame}
                currentGameId={currentGameId}
                setCurrentGameId={setCurrentGameId}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                currentCategoryId={currentCategoryId}
                setCurrentCategoryId={setCurrentCategoryId}
                browseType={browseType}
                handleHover={handleHover}
                handleBrowse={handleBrowse}
                handleSelect={handleSelect}
                handleSelectGameFilter={handleSelectGameFilter}
                currentFilter={currentFilter} 
              />

              <div className={styles.list}>
                <h1>Trending and interesting</h1>
                <p>Based on player counts and ratings</p>

                <div className={styles.applied}>
                  <div className={styles.filterList}>
                    <button 
                      className={styles.filterButton} 
                      aria-label="Current Filter"
                    >
                      Filter by:
                      <span> 
                        {
                          browseType == "/games"? currentFilter == "none"?"none":currentFilter.map((filter, index) => {
                            return ((index != 0)?", ":"") + filter
                          }):
                          browseType == "/categories"?
                            currentGame.name
                            :""
                      }</span>
                    </button>
                    <button 
                      className={`${styles.filterButton} ${styles.clearButton}`}
                      onClick={clearFilter} 
                      aria-label="Clear Filters"
                    >
                      Clear Filter
                    </button>
                  </div>
                  
                  <div className={styles.displayStyle}>
                    <p>Display options:</p>
                    <button 
                      className={styles.displayBtn} 
                      onClick={handleLayoutSwitch} 
                      id="grid" 
                      aria-label='Display grids'
                    >
                      <img
                        src={Grids}
                        className={styles.displayItem} 
                        style={{ filter: grid ? 'invert(78%) brightness(10000%)' : 'brightness(10000%) saturate(100%) invert(78%) sepia(99%) saturate(1066%) hue-rotate(183deg) brightness(50%) contrast(100%)' }}
                      />
                    </button>

                    <button 
                      className={styles.displayBtn} 
                      onClick={handleLayoutSwitch} 
                      id="columns" 
                      aria-label='Display columns'
                    > 
                      <img
                        src={Columns} 
                        className={styles.displayItem} 
                        style={{ filter: grid ? 'brightness(10000%) saturate(100%) invert(78%) sepia(99%) saturate(1066%) hue-rotate(183deg) brightness(50%) contrast(100%)' : 'invert(78%) brightness(10000%)' }}
                      />
                    </button>
                  </div>
                </div>
              
                    <Grid 
                      
                      shownGames={shownGames}
                      reviewDisplay={reviewDisplay}
                      handleLike={handleLike}
                      handleHoverGame={browseType == "/games"? handleHoverGame:() => {return false}}
                      handleAddToCart={handleAddToCart}
                      grid={grid}
                      browseType={browseType}
                      search={search}
                      searching={searching}
                      handleSelectGame={handleSelectGame}
                      cartDisplayed={cartDisplayed}
                      hoverState={hoverState}
                    />
              </div>
            </div>
        </AnimatedPage>
        <Footer />
      </section>
    );
  }

  if (document.getElementById('games')) {
    ReactDOM.render(<Browse />, document.getElementById('games'));
  }
  
  if (document.getElementById('categories')) {
    ReactDOM.render(<Browse />, document.getElementById('categories'));
  }
  
  if (document.getElementById('items')) {
    ReactDOM.render(<Browse />, document.getElementById('items'));
  }