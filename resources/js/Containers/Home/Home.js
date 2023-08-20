import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Home.module.css';
import NavBar from '../../Components/NavBar/NavBar';
import GitHubLogo from "../../../assets/icons/githublogo.svg";
import Enter from "../../../assets/icons/enter.svg";
import Dice from "../../../assets/icons/dice.svg";
import LinkedIn from "../../../assets/icons/linkedin.svg";
import Game from "../../../assets/icons/game.svg";
import NotFound from "../../../assets/icons/notfound.svg";
import NotFoundQuery from "../../../assets/icons/notfoundquery.svg";
import CartSVG from "../../../assets/icons/cart.svg";
import Git from "../../../assets/icons/git.svg";
import Performance from "../../../assets/icons/performance.svg";
import Sources from "../../../assets/icons/sources.svg";
import pyke from "../../../assets/icons/pyke.mp4"
import { motion, AnimatePresence, m } from "framer-motion";
import Cart from '../../Components/Cart/Cart';
import AnimatedScroll from '../AnimatedPage/AnimatedScroll';
import games from '../../utils/games';
import templateGame from '../../utils/templateGame';
import axios from 'axios';

export default function Home (props) {
  
  const [currentFilter, setCurrentFilter] = useState("none");
  const [allGames, setAllGames] = useState(games);
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
  const [user, setUser] = useState();
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


  useEffect(() => {
    const api = axios.create({
      baseURL: '/api'
    });
    
    
    api.get('/user/me')
      .then(response => {
        if(response.data.message != "Unauthenticated.") {
          setUser(response.data.user);
        }
      })
      .catch(error => {
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
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

if (window.location.href != "/" && window.location.href != "/games" && selectedGame === false) {
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
  setCurrentFilter(filterNames[e.target.id - 8]);
}

const handleSelectGame = (e) => {
  if (e.target.tagName === "BUTTON") {
    return
  } else if (e.target.classList[0] != "AddToCart_addToCart__zbJPe") {
        setSelectedGame(games[e.target.parentNode.id]);
        window.location.href = `/game/${games[e.target.parentNode.id].surname}`;
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
  window.location.href = `/game/${selectedGameSurname}`;
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
  let handledAddedGame = allGames.map((game, i) => {
    if ((window.location.pathname + window.location.search) === "/games") {
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

  } else if ((window.location.pathname + window.location.search) === "/games") {
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
  const [landingPage, setLandingPage] = useState(true);


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
      window.location.href = `/game/${randomSurname}`;
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

  return (
    <div className={styles.main}>
      {overlap ? 
          <motion.div 
            className={styles.overlap}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
    
          </motion.div> 
      : null}

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
        <div className={styles.home}>

                <video autoPlay muted loop className={styles.video}>
                  <source src={pyke} type="video/mp4" />
                </video>

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
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.splash}>
                          <h1>Game Store</h1>
                          <p className={styles.intro}>The best destination to buy new games to competitive prices. 24 hour support, "best price" guarantee and a flawless UX. Wish for more? Tell us <span className={styles.here}>below</span> — or check out our <span className={styles.careers}>careers.</span></p>
                        </div>
    
                        <div className={styles.buttons}>
                              <button className={`${styles.cta} ${styles.browseBtn}`} onClick={handleBrowse} aria-label="Browse">
                                <img src={Enter} className={styles.ctaSVG} />
                                Browse
                              </button>
                              {
                                user?<button 
                                    className={`${styles.cta}`}
                                    onClick={() => {location.href = "/profile"}}
                                  >
                                    <svg className={styles.ctaSVG} xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 50 50" width="100px" height="100px"><path d="M 25 2.0078125 C 12.309296 2.0078125 2.0000002 12.317108 2 25.007812 C 2 37.112262 11.38131 47.043195 23.259766 47.935547 C 23.283185 47.93745 23.306613 47.939576 23.330078 47.941406 C 23.882405 47.981205 24.437631 48.007812 25 48.007812 C 25.562369 48.007812 26.117595 47.981205 26.669922 47.941406 C 26.693387 47.939576 26.716815 47.93745 26.740234 47.935547 C 38.61869 47.043195 48 37.112262 48 25.007812 C 48 12.317108 37.690704 2.0078125 25 2.0078125 z M 25 4.0078125 C 36.609824 4.0078125 46 13.397988 46 25.007812 C 46 30.739515 43.704813 35.924072 39.990234 39.710938 C 38.401074 38.55372 36.437194 37.863387 34.677734 37.246094 C 32.593734 36.516094 30.622172 35.824094 30.076172 34.621094 C 29.990172 33.594094 29.997859 32.792094 30.005859 31.871094 L 30.007812 31.480469 C 30.895813 30.635469 32.012531 28.852078 32.394531 27.205078 C 33.054531 26.853078 33.861516 26.009281 34.103516 23.988281 C 34.224516 22.985281 33.939062 22.2085 33.539062 21.6875 C 34.079062 19.8325 35.153484 15.136469 33.271484 12.105469 C 32.475484 10.824469 31.274313 10.016266 29.695312 9.6972656 C 28.808312 8.5992656 27.134484 8 24.896484 8 C 21.495484 8.063 19.002234 9.1047031 17.490234 11.095703 C 15.707234 13.445703 15.370328 16.996297 16.486328 21.654297 C 16.073328 22.175297 15.775438 22.963328 15.898438 23.986328 C 16.141438 26.007328 16.945469 26.851125 17.605469 27.203125 C 17.987469 28.852125 19.103188 30.635469 19.992188 31.480469 L 19.994141 31.861328 C 20.002141 32.786328 20.009828 33.590094 19.923828 34.621094 C 19.375828 35.827094 17.394781 36.526625 15.300781 37.265625 C 13.551886 37.88319 11.599631 38.574586 10.013672 39.716797 C 6.2962191 35.929504 4 30.742023 4 25.007812 C 4.0000002 13.397989 13.390176 4.0078125 25 4.0078125 z"/></svg>
                                    {user.name}
                                  </button>:<button 
                                    className={`${styles.cta}`}
                                    onClick={() => {window.location.href = "login"}}
                                  >
                                    <svg className={styles.ctaSVG} fill="#000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="100px" height="100px"><path d="M 25.017578 1.9824219 C 15.436898 1.9824219 7.2123268 7.8663695 3.7636719 16.220703 A 2.0002 2.0002 0 1 0 7.4609375 17.746094 C 10.308283 10.848427 17.072259 5.9824219 25.017578 5.9824219 C 35.534702 5.9824219 44.017578 14.465298 44.017578 24.982422 C 44.017578 35.499546 35.534702 43.982422 25.017578 43.982422 C 17.073352 43.982422 10.308226 39.118231 7.4609375 32.220703 A 2.0002 2.0002 0 1 0 3.7636719 33.746094 C 7.2123838 42.100566 15.437804 47.982422 25.017578 47.982422 C 37.696454 47.982422 48.017578 37.661298 48.017578 24.982422 C 48.017578 12.303546 37.696454 1.9824219 25.017578 1.9824219 z M 26.962891 15.962891 A 2.0002 2.0002 0 0 0 25.568359 19.396484 L 29.154297 22.982422 L 3.9824219 22.982422 A 2.0002 2.0002 0 1 0 3.9824219 26.982422 L 29.154297 26.982422 L 25.568359 30.568359 A 2.0002 2.0002 0 1 0 28.396484 33.396484 L 35.396484 26.396484 A 2.0002 2.0002 0 0 0 35.396484 23.568359 L 28.396484 16.568359 A 2.0002 2.0002 0 0 0 26.962891 15.962891 z"/></svg>
                                    <h3 onClick={handleOpenCart}>Login</h3>
                                </button>
                              }
                        </div>
                    </div>
    
                    <div className={styles.right}>
                        <div className={styles.buttonsRight}>
                            <h2>Quick Navigation</h2>
                            <button className={styles.cta} onClick={handleNavGamePage} aria-label="Open a game page">
                              <img src={Game} className={styles.ctaSVG} />
                              Games 
                            </button>
                            <button className={styles.cta} onClick={handleNavNotFoundPage} aria-label="Open 404 page">
                              <svg xmlns="http://www.w3.org/2000/svg"  className={styles.ctaSVG} viewBox="0 0 576 512"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"/></svg>
                              Categories
                            </button>
                            <button className={`${styles.cta} ${styles.lastChild}`} onClick={handleNavNotFoundQuery} aria-label="open 404 query page">
                              <svg xmlns="http://www.w3.org/2000/svg"  className={`${styles.ctaSVG}`} fill="#000000" height="800px" width="800px" viewBox="0 0 57 57" >
                               <path d="M57,0h-8.837L18.171,29.992l-4.076-4.076l-1.345-4.034c-0.22-0.663-0.857-1.065-1.55-0.98  c-0.693,0.085-1.214,0.63-1.268,1.327l-0.572,7.438l5.982,5.982L4.992,46H2.274C1.02,46,0,47.02,0,48.274v6.452  C0,55.98,1.02,57,2.274,57h6.452C9.98,57,11,55.98,11,54.726v-3.421l10-10l6.021,6.021l6.866-1.145  c0.685-0.113,1.182-0.677,1.21-1.37c0.028-0.693-0.422-1.295-1.096-1.464l-3.297-0.824l-4.043-4.043L57,8.489V0z M9,54.726  C9,54.877,8.877,55,8.726,55H2.274C2.123,55,2,54.877,2,54.726v-6.452C2,48.123,2.123,48,2.274,48h0.718h5.734  C8.877,48,9,48.123,9,48.274v5.031V54.726z M11,48.477v-0.203C11,47.02,9.98,46,8.726,46H7.82l8.938-8.938l1.417,1.417l1.411,1.411  L11,48.477z M30.942,44.645l-3.235,0.54l-5.293-5.293l0,0l-2.833-2.833l-8.155-8.155l0.292-3.796l0.63,1.89l4.41,4.41l0,0  l4.225,4.225l8.699,8.699L30.942,44.645z M25.247,37.066l-2.822-2.822l-2.839-2.839L48.991,2h4.243L23.829,31.406  c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293L55,3.062v4.592L25.247,37.066z"/>
                              </svg>
                              Items
                            </button>
                            <a href='https://github.com/gianlucajahn/react-ecommerce-store/commits/main' target="_blank"><button className={styles.cta} aria-label="Open commit log">
                              <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.ctaSVG}`} viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                              Favourites
                            </button></a>
                            <a href="https://github.com/gianlucajahn/react-ecommerce-store/blob/main/README.md#performance" target="_blank"><button className={`${styles.cta} ${styles.lastChild}`} aria-label="Open performance test results">
                              <img src={CartSVG} className={`${styles.ctaSVG}`} />
                              Cart
                            </button></a>
                            <a href="https://github.com/gianlucajahn/react-ecommerce-store/blob/main/README.md#technologies-used" target="_blank"><button className={`${styles.cta} ${styles.lastChild}`} aria-label="View technologies used"> 
                              <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.ctaSVG}`}  viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                              Saved For Later
                            </button></a>
                            <a href="https://github.com/gianlucajahn/react-ecommerce-store/blob/main/README.md#sources" target="_blank"><button className={`${styles.cta} ${styles.lastChild}`} aria-label="View Sources">
                              <img src={Sources} className={`${styles.ctaSVG}`} />
                              About us
                            </button></a>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
}

if (document.getElementById('home')) {
  ReactDOM.render(<Home />, document.getElementById('home'));
}