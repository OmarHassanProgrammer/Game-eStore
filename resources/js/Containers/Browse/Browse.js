
import ReactDOM from 'react-dom';
import styles from './Browse.module.css';
import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { AnimatePresence } from "framer-motion";
import AnimatedPage from '../AnimatedPage/AnimatedPage';
import Grids from "../../../assets/icons/grid.svg";
import Columns from "../../../assets/icons/columns.svg";
import Filters from '../../Components/Filters/Filters';
import Grid from '../../Components/Grid/Grid';
//import games from '../../utils/games';
import categories from '../../utils/categories';
import Cart from '../../Components/Cart/Cart';
import Chat from '../../Components/Chat/Chat';
import Notifications from '../../Components/Notifications/Notifications';
import Footer from '../../Components/Footer/Footer';
import filterNames from '../../utils/filterNames';
import templateGame from '../../utils/templateGame';
import axios from 'axios';

export default function Browse (props) {
  
  const [currentFilter, setCurrentFilter] = useState("none");
  const [currentItemFilter, setCurrentItemFilter] = useState("none");
  const [allGames, setAllGames] = useState([]);
  const [shownCategories, setShownCategories] = useState(categories);
  const [shownItems, setShownItems] = useState([]);
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
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState({});
  const [user, setUser] = useState();
  const [isCart, setIsCart] = useState({});
  const [isFav, setIsFav] = useState({});
  const [addPerson, setAddPerson] = useState();
  const [addNotification, setAddNotification] = useState();
  const [onlyavailable, setOnlyavailable] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
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
    }
  ]);

useEffect(() => {
  const apiUrl = '/api/genres/getAll'; // Replace with your actual API endpoint
  axios.get(apiUrl)
    .then(response => {
      setGenres(response.data.genres);
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

    const api = axios.create({
      baseURL: '/api'
    });
    
    
    api.get('/user/me')
      .then(response => {
        if(response.data.message != "Unauthenticated.") {
          setUser(response.data.user);
          api.get('/user/cart/get')
          .then(response => {
            if(response.data.message != "Unauthenticated.") {
              setCart(response.data.cart);
              setCartAmount(response.data.cart.length);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }
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
}, []);

const logout = () => {
  const api = axios.create({
    baseURL: '/api'
  });
  
  
  api.post('/logout')
    .then(response => {
      if(response.data.msg = "done") {
        setUser(null);
        setAddNotification({
          type: "success",
          msg: "You have logout successfully",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        })
      }
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

if (window.location.href != "/" && window.location.href != "/browse" && selectedGame === false) {
  let id = window.location.href.substring(29);
  console.log("test");
  let currentGame = {};
  if(allGames)
  currentGame = allGames.find(game => game.id === id);
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
const handleSelectItemFilter = (filter, e) => {
  switch(filter) {
    case "Price":

    return;
  }
}

const handleSelectGenre  = (genre) => {
  setActiveGenre(genre);

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
      if (!globalFilter) {
        updatedFilter.splice(currentFilter.indexOf(filter), 1);
        if(filter == filterNames[e.target.id - 8]) {
          activated = true;
        }
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

const handleSelectGame = (id, e) => {
  if (e.target.tagName === "BUTTON") {
    return
  } else if (e.target.classList[0] != "AddToCart_addToCart__zbJPe") {
        
        if((window.location.pathname) == "/games") {
          if(currentCategoryId == -1) {
            window.location.href = `/categories` + '?game=' + id;
          } else
            window.location.href = `/items?category=` + currentCategoryId + "&game=" + id;
        } else if((window.location.pathname) == "/categories") {
          if(currentGameId == -1) {
            window.location.href = `/games?category=` + id;
          } else {
            window.location.href = `/items?category=` + id + "&game=" + currentGameId;
          }
        } else if((window.location.pathname) == "/items") {
          window.location.href = `/game?id=${id}`;
        }
  }
}

const clearCart = () => {
  const apiUrl = '/api/user/cart/clear/'; // Replace with your actual API endpoint
  axios.get(apiUrl)
  .then(response => {
    if(response.data.msg == "done") {
      setCart([]);
      setCartAmount(0);
      let s = shownGames;
      s.forEach(element => {
        if(element.inCart) {element.inCart = false; element.amount += 1; };
      });
      setShownGames([...s]);
      console.log(s);
      setAddNotification({
        type: "success",
        msg: "Cart is cleared successfully.",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
    }
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

const handleLike = (id, key, e) => {
  e.stopPropagation();
  const apiUrl = '/api/user/wishlist/toggle/' + id; // Replace with your actual API endpoint
  axios.post(apiUrl)
    .then(response => {
      if(response.data.msg == "done") {
        let s = shownGames;
        s[key].isLiked = response.data.fav;
        setShownGames([...s]);
        setAddNotification({
          type: "success",
          msg: response.data.fav?"Item was added to wishlist successfully":"Item was removed wishlist successfully",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        });
      } else {
        setAddNotification({
          type: "danger",
          msg: "There is some problem",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        });
      }
    })
    .catch(error => {
      setAddNotification({
        type: "danger",
        msg: "There is some problem",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
    });
}

const handleAddToCart = (id, key, e) => {
  e.stopPropagation();
  const apiUrl = '/api/user/cart/add/' + id; // Replace with your actual API endpoint
  axios.get(apiUrl)
    .then(response => {
      if(response.data.msg == "done") {
        setCart(response.data.cart);
        setCartAmount(response.data.cart.length);
        let s = shownGames;
        s[key].inCart = true;
        s[key].amount -= 1;
        setShownGames([...s]);
        setAddNotification({
          type: "success",
          msg: "Item was added to cart successfully",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        });
      } else if (response.data.msg == "finished") {
        setAddNotification({
          type: "danger",
          msg: "The item is sold out",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        })
      } else {
        setAddNotification({
          type: "danger",
          msg: "There is some problem",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        })
      }
    })
    .catch(error => {
      setAddNotification({
        type: "danger",
        msg: "There is some problem.",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
    });

}

const handleRemoveFromCart = (id, key, e) => {
  e.stopPropagation();
  const apiUrl = '/api/user/cart/remove/' + id; // Replace with your actual API endpoint
  axios.get(apiUrl)
    .then(response => {
      if(response.data.msg == "done") {
        setCart(response.data.cart);
        let c = cart.filter((cart_item) => {});
  
        setCartAmount(cartAmount - 1);
        let s = shownGames;
        s[key].inCart = false;
        s[key].amount += 1;
        setShownGames([...s]);
        setAddNotification({
          type: "success",
          msg: "Item was removed from the cart successfully.",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        });
      } else {
        setAddNotification({
          type: "danger",
          msg: "There is some problem",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        });
      }
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

const clearFilter = () => {
  setCurrentFilter("none");
  setActiveGenre({});
  setSearch("");
  setReviewDisplay(false);
}

const clearItemFilter = () => {
  setCurrentItemFilter("none");
  setActiveGenre({});
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

  const handleBrowse = (type) => {
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      let C = "";
      let G = "";
      if(type == "games") {
        window.location.href = "games";
      } 
      if(type == "categories") {
        window.location.href = "categories?" + (window.location.search.indexOf('game=') != -1?"game=" + currentGameId:"");
      } 
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
        if(browseType == "/games") {
          const apiUrl = '/api/games/getAll'; // Replace with your actual API endpoint
          axios.get(apiUrl)
            .then(response => {
              setAllGames(response.data.games);
              setShownGames(response.data.games);          
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
        } else if (browseType == "/categories") {
          if(currentGame.id != -1) {
            const apiUrl = '/api/games/getCategories/' + currentGame.id; // Replace with your actual API endpoint
            axios.get(apiUrl)
            .then(response => {
              setShownCategories(response.data.categories);
              setShownGames(response.data.categories);
              g = response.data.games;
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
          } else {
            const apiUrl = '/api/categories/getAll'; // Replace with your actual API endpoint
            axios.get(apiUrl)
            .then(response => {
              setShownCategories(response.data.categories);
              setShownGames(response.data.categories);
              g = response.data.games;
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
        } else if (browseType == "/items") {
          if(currentCategory.id != -1) {
            const apiUrl = '/api/items/getAll/' + currentCategory.id; // Replace with your actual API endpoint
              axios.get(apiUrl)
              .then(response => {
                setShownGames(response.data.items);
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
          } else {
            const apiUrl = '/api/items/getAll'; // Replace with your actual API endpoint
              axios.get(apiUrl)
              .then(response => {
                setShownGames(response.data.items);
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
        }

      } else{
        let Cgames = allGames;
        for(const filter of currentFilter) {
          
          if (filter === "Ratings") {
              let filteredShownGames = Cgames.slice(0);
              filteredShownGames = filteredShownGames.sort(function(a, b) {
                return b.rating - a.rating;
              });
            Cgames = filteredShownGames;
            g = Cgames;
            setShownGames(Cgames);
    
          } else if (filter === "Reviews") {
              setReviewDisplay(true);
    
          } else if (filter === "Wishlist") {
              let filteredShownGames = Cgames.filter(game => game.isLiked === true);
              Cgames = filteredShownGames;
              g = Cgames;
              setShownGames(Cgames);
          }

          if (filter != "Reviews") {
              setReviewDisplay(false);
          }
        }

        if(activeGenre != {}) {
          let fGames = [];
          Cgames.forEach(game => {
            if(game.genresIds.includes(activeGenre)) {
              fGames.push(game);
            }
          });
          setShownGames(fGames);
        }
      }
      
    }, [currentFilter, currentGame, currentCategory]);

    useEffect(() => {
      console.log('activeGenre: ' + activeGenre.name);
      if(activeGenre.id) {
        let fGames = [];
        allGames.forEach(game => {
          if(game.genresIds.includes(activeGenre.id)) {
            fGames.push(game);
          }
        });
        setShownGames(fGames);
      } else {
        console.log("aaaaaaaaaaaaaaaaaa");
        setShownGames(allGames);
      }
    }, [activeGenre]);

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
        <Chat addPerson={addPerson}/>
        <Notifications addNotification={addNotification} />
        <NavBar
          handleHover={handleHover}
          hoverState={hoverState}
          handleBrowse={handleBrowse}
          user={user}
          handleHome={handleHome}
          browsing={browsing}
          landingPage={landingPage}
          cartAmount={cartAmount}
          search={search}
          searching={searching}
          handleSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
          handleOpenCart={handleOpenCart}
          logout={logout}
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
                genres={genres}
                setGenres={setGenres}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
                handleBrowse={handleBrowse}
                handleSelect={handleSelect}
                handleSelectGenre={handleSelectGenre}
                handleSelectGameFilter={handleSelectGameFilter}
                currentFilter={currentFilter} 
                currentItemFilter={currentItemFilter} 
                handleSelectItemFilter={handleSelectItemFilter}
              />
              <div className={styles.list}>
                <h1>Trending and interesting</h1>
                <p>Based on player counts and ratings</p>

                <div className={styles.applied}>
                  <div className={styles.filterList}>
                    {
                      browseType == "/items"?
                      <>
                        <span className={styles.filterButton}>
                          Price from <input className={styles.filterInput} type="number" onChange={(e) => { setMinPrice(e.target.value) }} /> to <input className={styles.filterInput} type="number" onChange={(e) => { setMaxPrice(e.target.value) }} />
                        </span>
                        <button className={`${styles.filterButton} ` + (onlyavailable?styles.filterActice:null)} onClick={() => {setOnlyavailable(!onlyavailable)}}>
                          Only Available
                        </button>
                      </>:null
                    }
                    <button 
                      className={`${styles.filterButton} ${styles.notPhone}`} 
                      aria-label="Current Filter"
                    >
                      Filter by:
                      <span> 
                        {
                          browseType == "/games"? <>{currentFilter == "none"?"":currentFilter.map((filter, index) => {
                            return ((index != 0)?", ":"") + filter
                          })}{ activeGenre!={}?activeGenre.name:"" }{(currentFilter == "none" && activeGenre=={})?"none":""}</>:
                          browseType == "/categories"?
                            currentGame.name
                            :
                            browseType == "/items"? currentItemFilter:""
                        }
                        
                      </span>
                    </button>
                    <button 
                      className={`${styles.filterButton} ${styles.clearButton}  ${styles.notPhone}`}
                      onClick={browseType == "/items"?clearItemFilter:clearFilter} 
                      aria-label="Clear Filters"
                    >
                      Clear Filter
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
                      smallFont={false}
                      limit="0"
                      onlyAvailable={onlyavailable}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
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