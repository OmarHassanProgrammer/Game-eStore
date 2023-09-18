import styles from './GamePage.module.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import AnimatedGamePage from '../AnimatedPage/AnimatedGamePage';
import NavBar from '../../Components/NavBar/NavBar';
import Slider from '../../Components/Slider/Slider';
import games from '../../utils/games';
import AnimatedText from '../AnimatedPage/AnimatedText';
import AddedToCartBig from '../../Components/AddedToCart/AddedToCartBig';
import Chat from '../../Components/Chat/Chat';
import Cart from '../../Components/Cart/Cart';
import templateGame from '../../utils/templateGame';
import Notifications from '../../Components/Notifications/Notifications';
import axios from "axios";

const GamePage = props => {
  
  const [currentFilter, setCurrentFilter] = useState("none");
  const [currentItemFilter, setCurrentItemFilter] = useState("none");
  const [allGames, setAllGames] = useState([]);
  const [user, setUser] = useState();
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
  const [isCart, setIsCart] = useState({});
  const [addPerson, setAddPerson] = useState();
  const [isFav, setIsFav] = useState({});
  const [addNotification, setAddNotification] = useState();
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

  const logout = () => {
    const api = axios.create({
      baseURL: '/api'
    });
    
    
    api.post('/logout')
      .then(response => {
        if(response.data.msg = "done") {
          setUser(null);
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

  useEffect(() => {
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
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
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
  
useEffect(() => {
  let id = window.location.search.slice(window.location.search.indexOf('id=') + 3);
  const apiUrl = '/api/items/get/' + id; // Replace with your actual API endpoint
  axios.get(apiUrl)
    .then(response => {
      setSelectedGame(response.data.item);
      setIsCart(response.data.isCart);
      setIsFav(response.data.isFav);
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



const clearCart = () => {
  const apiUrl = '/api/user/cart/clear/'; // Replace with your actual API endpoint
  axios.get(apiUrl)
  .then(response => {
    if(response.data.msg == "done") {
      setCart([]);
      setCartAmount(0);
      setIsCart(false);
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

const handleLike = (id, e) => {
  e.stopPropagation();
  const apiUrl = '/api/user/wishlist/toggle/' + id; // Replace with your actual API endpoint
  axios.post(apiUrl)
    .then(response => {
      if(response.data.msg == "done") {
        setIsFav(response.data.fav);
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
        setIsCart(true);
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
        msg: "There is some problem",
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
        setIsCart(false);
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


const openGamePage = (e) => {
  setCartDisplayed(false);
  let selectedGameSurname = e.target.id;
  window.location.href += `/game/${selectedGameSurname}`;
}




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
}, [cartDisplayed]);


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

  let { gameId } = useParams();
  const [carouselState, setCarouselState] = useState(0);

  const incrementCarousel = (e) => {
    if (carouselState === 3) {
      setCarouselState(0);
    } else {
      setCarouselState(carouselState + 1);
    }
  }

  const decrementCarousel = (e) => {
    if (carouselState === 0) {
      setCarouselState(3);
    } else {
      setCarouselState(carouselState - 1);
    }
  }

  const extendText = () => {
    setTextExtended(!textExtended);
  }

  const handleExtend = (e) => {
    if (document.getElementById("20").innerHTML === "More") {
      document.getElementById("20").className="aboutBottom";
    } else if (document.getElementById("20").innerHTML === "Hide") {
        document.getElementById("20").className="aboutBottomClosed";
    }
    setExtended(!extended);
    if (textExtended === false) {
      setTimeout(extendText, 500);
    } else {
        setTextExtended(!textExtended);
    }
  }
  
  return (
    <>
        <div className={styles.gamepage}>
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
              handleBrowse={handleBrowse.bind(this, "games")}
              handleHover={handleHover}
              user={user}
              hoverState={hoverState}
              handleHome={handleHome}
              browsing={browsing}
              landingPage={landingPage}
              cartAmount={cartAmount}
              search={search}
              searching={searching}
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              logout={logout}
            />

            <AnimatedGamePage>
              <div className={styles.gamepageContent}>
                <header>
                    <button 
                      style={{ color: hoverState[19].hovered ? "#92f" : "#cccccc" }} 
                      className={styles.goBack}
                      onMouseEnter={handleHover}
                      onMouseLeave={handleHover}
                      onClick={handleBrowse}
                      id="19"
                      aria-label='Back'
                    >
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" className={styles.arrow}  xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="493.578px" height="493.578px" viewBox="0 0 493.578 493.578"  xmlSpace="preserve"><g><path d="M487.267,225.981c0-17.365-13.999-31.518-31.518-31.518H194.501L305.35,83.615c12.24-12.24,12.24-32.207,0-44.676 L275.592,9.18c-12.24-12.24-32.207-12.24-44.676,0L15.568,224.527c-6.12,6.12-9.256,14.153-9.256,22.262 c0,8.032,3.136,16.142,9.256,22.262l215.348,215.348c12.24,12.239,32.207,12.239,44.676,0l29.758-29.759 c12.24-12.24,12.24-32.207,0-44.676L194.501,299.498h261.094c17.366,0,31.519-14.153,31.519-31.519L487.267,225.981z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                        Store
                    </button>

                    <h1>{selectedGame ? selectedGame.name : templateGame.name}</h1>
                </header>

                <section className={styles.game}>
                  {<Slider 
                    selectedGame={selectedGame}
                    setSelectedGame={setSelectedGame}
                    allGames={allGames}
                    incrementCarousel={incrementCarousel}
                    decrementCarousel={decrementCarousel}
                    carouselState={carouselState}
                    setCarouselState={setCarouselState}
                    hoverState={hoverState}
                    handleHover={handleHover}
                  />}
                  <div className={styles.gameInfo}>
                    <div className={styles.about}>
                      <div className={styles.aboutTop}>
                        <h2>About</h2>
                        <p>{selectedGame ? selectedGame.description : templateGame.desc}</p>
                      </div>
                      <div 
                        className={extended ? `${styles.conditionalOpen} ${styles.aboutBottom}` : `${styles.conditionalClose} ${styles.aboutBottomClosed}`} 
                        id="about"
                      >
                      <AnimatedText>
                            <div className={textExtended ? styles.open : styles.closed}>
                                <h4>Game: {selectedGame ? selectedGame.subgame.game.name : templateGame.release}</h4>
                                <h4>Category: {selectedGame ? selectedGame.subgame.name : templateGame.platforms}</h4>
                                <h4>Sells in: {selectedGame ? selectedGame.sellTime + " days" : templateGame.genre}</h4>
                                <h4>Seller: {selectedGame ? selectedGame.seller.name : templateGame.developers}</h4>
                            </div>
                        </AnimatedText>

                        <button 
                          id="20" 
                          onClick={handleExtend} 
                          onMouseEnter={handleHover} 
                          onMouseLeave={handleHover} 
                          className={hoverState[20].hovered ? styles.buttonHovered : styles.buttonNotHovered} 
                          aria-label="Extend"
                        >
                          {extended ? "Hide" : "More"}
                          {extended ? <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path className={styles.up} style={{ fill: hoverState[20].hovered ? "#fff" : "#cccccc" }} fillRule="evenodd" clipRule="evenodd" d="M5.46967 14.5303C5.17678 14.2374 5.17678 13.7626 5.46967 13.4697L11.4697 7.46967C11.7626 7.17678 12.2374 7.17678 12.5303 7.46967L18.5303 13.4697C18.8232 13.7626 18.8232 14.2374 18.5303 14.5303C18.2374 14.8232 17.7626 14.8232 17.4697 14.5303L12 9.06066L6.53033 14.5303C6.23744 14.8232 5.76256 14.8232 5.46967 14.5303Z" /></svg> : 
                            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path className={styles.down} style={{ fill: hoverState[20].hovered ? "#fff" : "#cccccc" }} fillRule="evenodd" clipRule="evenodd" d="M5.46967 14.5303C5.17678 14.2374 5.17678 13.7626 5.46967 13.4697L11.4697 7.46967C11.7626 7.17678 12.2374 7.17678 12.5303 7.46967L18.5303 13.4697C18.8232 13.7626 18.8232 14.2374 18.5303 14.5303C18.2374 14.8232 17.7626 14.8232 17.4697 14.5303L12 9.06066L6.53033 14.5303C6.23744 14.8232 5.76256 14.8232 5.46967 14.5303Z" /></svg>}
                        </button>
                      </div>
                    </div>

                    <div className={styles.addToCart}>
                      <div className={styles.infos}>
                          <h3>${selectedGame ? selectedGame.price : templateGame.price}</h3>
                          <button id={selectedGame ? selectedGame.id : templateGame.id} onClick={handleLike.bind(this, selectedGame ? selectedGame.id:0)} aria-label="Like">
                          <svg className={selectedGame ? isFav ? styles.liked : styles.like : styles.like} version="1.1" id="Capa_1" fill="red" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 230 230" xmlSpace="preserve">
                          <path d="M213.588,120.982L115,213.445l-98.588-92.463C-6.537,96.466-5.26,57.99,19.248,35.047l2.227-2.083
                            c24.51-22.942,62.984-21.674,85.934,2.842L115,43.709l7.592-7.903c22.949-24.516,61.424-25.784,85.936-2.842l2.227,2.083
                            C235.26,57.99,236.537,96.466,213.588,120.982z"/>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          </svg>
                        </button>
                      </div>
                      {selectedGame ? isCart ? <AddedToCartBig /> : 
                      <button 
                        id="21" 
                        onMouseEnter={handleHover} 
                        onMouseLeave={handleHover} 
                        className={styles.addToCartButton}
                        style={{ color: hoverState[21].hovered ? "#92f" : "#999999" }} 
                        onClick={handleAddToCart.bind(this, selectedGame.id)} 
                        aria-label="Add"
                      >
                        Add to cart
                        <svg className={styles.add} 
                          style={{ fill: hoverState[21].hovered ? "#92f" : "#999999" }} version="1.1" id="Capa_1" fill="#92f" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 60.364 60.364" xmlSpace="preserve">
                        <g>
                          <path d="M54.454,23.18l-18.609-0.002L35.844,5.91C35.845,2.646,33.198,0,29.934,0c-3.263,0-5.909,2.646-5.909,5.91v17.269
                            L5.91,23.178C2.646,23.179,0,25.825,0,29.088c0.002,3.264,2.646,5.909,5.91,5.909h18.115v19.457c0,3.267,2.646,5.91,5.91,5.91
                            c3.264,0,5.909-2.646,5.91-5.908V34.997h18.611c3.262,0,5.908-2.645,5.908-5.907C60.367,25.824,57.718,23.178,54.454,23.18z"/>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        </svg>

                      </button> : 

                      <button 
                        id="21" 
                        onMouseEnter={handleHover} 
                        onMouseLeave={handleHover} 
                        style={{ color: hoverState[21].hovered ? "#D2042D" : "#999999" }} 
                        onClick={handleAddToCart} 
                        aria-label="Add"
                      >
                        Not available
                        <svg className={styles.add} 
                          style={{ fill: hoverState[21].hovered ? "#D2042D" : "#999999" }} version="1.1" id="Capa_1" fill="#92f" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 60.364 60.364" xmlSpace="preserve">
                        <g>
                          <path d="M54.454,23.18l-18.609-0.002L35.844,5.91C35.845,2.646,33.198,0,29.934,0c-3.263,0-5.909,2.646-5.909,5.91v17.269
                            L5.91,23.178C2.646,23.179,0,25.825,0,29.088c0.002,3.264,2.646,5.909,5.91,5.909h18.115v19.457c0,3.267,2.646,5.91,5.91,5.91
                            c3.264,0,5.909-2.646,5.91-5.908V34.997h18.611c3.262,0,5.908-2.645,5.908-5.907C60.367,25.824,57.718,23.178,54.454,23.18z"/>
                        </g><g></g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g></g><g></g><g></g></svg>
                      </button>}
                    </div>
                  </div>
                </section>
              </div>
            </AnimatedGamePage>
        </div>
    </>
  );
}

export default GamePage;

if (document.getElementById('game')) {
  ReactDOM.render(<GamePage />, document.getElementById('game'));
}