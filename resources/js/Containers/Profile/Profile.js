import styles from './Profile.module.css';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import AnimatedGamePage from '../AnimatedPage/AnimatedGamePage';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import Slider from '../../Components/Slider/Slider';
import games from '../../utils/games';
import AnimatedText from '../AnimatedPage/AnimatedText';
import AddedToCartBig from '../../Components/AddedToCart/AddedToCartBig';
import Cart from '../../Components/Cart/Cart';
import templateGame from '../../utils/templateGame';
import Grid from '../../Components/Grid/Grid';
import axios from "axios";

const Profile = props => {
  const [auth, setAuth] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [reviewDisplay, setReviewDisplay] = useState(false);
  const [cartDisplayed, setCartDisplayed] = useState(false);
  const [user, setUser] = useState();
  const [overlap, setOverlap] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const [landingPage, setLandingPage] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [grid, setGrid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [stars, setStars] = useState([]);
  const [emptyStars, setEmptyStars] = useState([0,0,0,0,0]);
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

  });
  useEffect(() => {
    let api = axios.create({
      baseURL: '/api'
    });
    
    api.get('/user/me')
      .then(response => {
        if(response.data.msg == "done") {
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
        if(error.code == "ERR_BAD_REQUEST") {
          setAuth(false);
        }
        console.error('Error fetching data:', error);
      });    
  }, []);

  useEffect(() => {
    let api = axios.create({
      baseURL: '/api'
    });
    let q = 0;
    if(window.location.search.indexOf('id=') != -1) {
      q = window.location.search.slice(window.location.search.indexOf('id=') + 3);
      const i = q.indexOf("&");
      if(i != -1) {
        q = q.slice(0, i);
      }
    } else if (user) {
      q = user['id'];
    } else if(firstUpdate.current) {
      location.href = '/login';
    }
        
    if(q != 0) {
      api = axios.create({
        baseURL: '/api'
      });
      api.get('/user/get/' + q)
        .then(response => {
          if(response.data.msg == "done") {
            let l = Math.round(response.data.user.rate);
            let _l = 5 - Math.round(response.data.user.rate);
            setStars(new Array(l).fill(undefined));
            setEmptyStars(new Array(_l).fill(undefined));
            setUserProfile(response.data.user);
          }
        })
        .catch(error => {
          if(error.code == "ERR_BAD_REQUEST") {
            setAuth(false);
          }
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);

  
const clearCart = () => {
  const apiUrl = '/api/user/cart/clear/'; // Replace with your actual API endpoint
  axios.get(apiUrl)
  .then(response => {
    if(response.data.msg == "done") {
      setCart([]);
      setCartAmount(0);
      let s = shownGames;
      s.forEach(element => {
        if(element.inCart) element.inCart = false;
      });
      setShownGames([...s]);
      console.log(s);
    }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

const handleRemoveFromCart = (id, key, e) => {
  e.stopPropagation();
  const apiUrl = '/api/user/cart/remove/' + id; // Replace with your actual API endpoint
  axios.get(apiUrl)
    .then(response => {
      setCart(response.data.cart);
      let c = cart.filter((cart_item) => {});

      setCartAmount(cartAmount - 1);
      let s = shownGames;
      s[key].inCart = false;
      setShownGames([...s]);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

const openGamePage = (e) => {
  setCartDisplayed(false);
  let selectedGameSurname = e.target.id;
  window.location.href = `/game/${selectedGameSurname}`;
}
const handleCloseCart = () => {
  setCartDisplayed(false);
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
  
  const handleOpenCart = () => {
    setCartDisplayed(true);
  }
  
  const handleSelectItem = (id, e) => {
    window.location.href = `/game?id=${id}`;
  }
  
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


  function copyLink(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Make the textarea non-editable to avoid any issues
    textArea.setAttribute('readonly', '');

    // Hide the textarea from view
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';

    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    try {
        // Copy the text to the clipboard
        document.execCommand('copy');
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Unable to copy text to clipboard', err);
    }

    // Clean up: remove the textarea
    document.body.removeChild(textArea);
  } 

  return (
    <>
      <section className={styles.Profile} style={{ maxHeight: cartDisplayed ? "100vh" : "1000vh", minHeight: "100vh" }}>
        {cartDisplayed ? <Cart 
              cartDisplayed={cartDisplayed} 
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              cart={cart}
              cartAmount={cartAmount}
              clearCart={clearCart}
              handleRemoveFromCart={handleRemoveFromCart}
              openGamePage={openGamePage}
        /> : null}
        <NavBar
          handleBrowse={handleBrowse.bind(this, "games")}
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

        <div className={styles.profileContent}>
          <div className={styles.left}>
            <div className={styles.img}>
              <div className={styles.content}>
                <img src={userProfile.imgType != null?'../assets/users/' + userProfile.id + '.' + userProfile.imgType:'../images/profile2.svg'} />
              </div>
            </div>
            <div className={styles.name}>
              <h2 className={styles.n}>{userProfile.name}</h2> 
              <div className={styles.rate}>
                {
                  stars.map((star, key) => {
                    return <svg xmlns="http://www.w3.org/2000/svg" className={styles.star} key={key} viewBox="0 0 48 48" width="96px" height="96px"><linearGradient id="q0c2dLEp_4LHk~8cW2fATa" x1="9.009" x2="38.092" y1="6.36" y2="45.266" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffda1c"/><stop offset="1" stopColor="#feb705"/></linearGradient><path fill="url(#q0c2dLEp_4LHk~8cW2fATa)" d="M24.913,5.186l5.478,12.288l13.378,1.413c0.861,0.091,1.207,1.158,0.564,1.737l-9.993,9.005	l2.791,13.161c0.18,0.847-0.728,1.506-1.478,1.074L24,37.141l-11.653,6.722c-0.75,0.432-1.657-0.227-1.478-1.074l2.791-13.161	l-9.993-9.005c-0.643-0.579-0.296-1.646,0.564-1.737l13.378-1.413l5.478-12.288C23.439,4.395,24.561,4.395,24.913,5.186z"/></svg>
                  })
                }
                {
                  emptyStars.map((star, key) => {
                    return <svg xmlns="http://www.w3.org/2000/svg" className={styles.star} key={stars.length + key} viewBox="0 0 48 48" width="96px" height="96px"><linearGradient id="q0c2dLEp_4LHk~8cW2fATb" x1="9.009" x2="38.092" y1="6.36" y2="45.266" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fbe574"/><stop offset="1" stopColor="#ffdb80"/></linearGradient><path fill="url(#q0c2dLEp_4LHk~8cW2fATb)" d="M24.913,5.186l5.478,12.288l13.378,1.413c0.861,0.091,1.207,1.158,0.564,1.737l-9.993,9.005	l2.791,13.161c0.18,0.847-0.728,1.506-1.478,1.074L24,37.141l-11.653,6.722c-0.75,0.432-1.657-0.227-1.478-1.074l2.791-13.161	l-9.993-9.005c-0.643-0.579-0.296-1.646,0.564-1.737l13.378-1.413l5.478-12.288C23.439,4.395,24.561,4.395,24.913,5.186z"/></svg>
                  })
                }
              </div>
            </div>
            <div className={styles.accounts}>
              <div className={styles.games}>
                <span className={styles.account} onClick={copyLink.bind(this, 'roblox')}><img src='../images/roblox.png' /></span>
                <span className={styles.account} onClick={copyLink.bind(this, 'fortnite')}><img src='../images/fortnite.jpg' /></span>
                <span className={styles.account} onClick={copyLink.bind(this, 'fdsr')}><img src='../images/minecraft.svg' /></span>
              </div>
            </div>
            {
              user?.id == userProfile?.id?<button className={styles.edit} onClick={() => {location.href = '/settings?page=profile'}}>
                Edit Profile
              </button>:''
            }
          </div>
          <div className={styles.right}>
            <h3 className={styles.title}>Popular Sold Items</h3>
            <div className={styles.content}>
              <Grid 
                shownGames={userProfile.items??[]}
                reviewDisplay={reviewDisplay}
                handleLike={() => {}}
                handleHoverGame={() => {}}
                handleAddToCart={() => {}}
                grid={grid}
                browseType={'/items'}
                search={search}
                searching={searching}
                handleSelectGame={handleSelectItem}
                cartDisplayed={cartDisplayed}
                smallFont={false} 
                limit="0"
              />
            </div>
          </div>
        </div>
        
        <Footer />
      </section>
    </>
  );
}

if (document.getElementById('profile')) {
  ReactDOM.render(<Profile />, document.getElementById('profile'));
}