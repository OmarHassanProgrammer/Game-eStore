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
import Chat from '../../Components/Chat/Chat';
import Cart from '../../Components/Cart/Cart';
import templateGame from '../../utils/templateGame';
import Grid from '../../Components/Grid/Grid';
import Notifications from '../../Components/Notifications/Notifications';
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
  const [addPerson, setAddPerson] = useState();
  const [addNotification, setAddNotification] = useState();
  const [emptyStars, setEmptyStars] = useState([0,0,0,0,0]);
  const [shownGames, setShownGames] = useState([]);
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
            setShownGames(response.data.user.items ?? []);
          }
        })
        .catch(error => {
          setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
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
        if(response.data.msg == "done") {
          setUser(null);
          setAddNotification({
            type: "success",
            msg: "You have logout successfully",
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
        setAddNotification({
          type: "success",
          msg: "Game code copied!",
          time: 5000,
          key: Math.floor(Math.random() * 10000)
        });
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
        <Chat addPerson={addPerson} setAddPerson={setAddPerson}/>
        <Notifications addNotification={addNotification} />
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
                <span className={styles.c} onClick={() => {setAddPerson(userProfile.id)}}>
                  <svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g id="Communication / Chat_Circle"><path id="Vector" d="M7.50977 19.8018C8.83126 20.5639 10.3645 21 11.9996 21C16.9702 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.6351 3.43604 15.1684 4.19819 16.4899L4.20114 16.495C4.27448 16.6221 4.31146 16.6863 4.32821 16.7469C4.34401 16.804 4.34842 16.8554 4.34437 16.9146C4.34003 16.9781 4.3186 17.044 4.27468 17.1758L3.50586 19.4823L3.50489 19.4853C3.34268 19.9719 3.26157 20.2152 3.31938 20.3774C3.36979 20.5187 3.48169 20.6303 3.62305 20.6807C3.78482 20.7384 4.02705 20.6577 4.51155 20.4962L4.51758 20.4939L6.82405 19.7251C6.95537 19.6813 7.02214 19.6591 7.08559 19.6548C7.14475 19.6507 7.19578 19.6561 7.25293 19.6719C7.31368 19.6887 7.37783 19.7257 7.50563 19.7994L7.50977 19.8018Z"/></g></svg>
                </span>
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
                {
                  userProfile?.game_links?.map((link, key) => {
                    return <span key={key} className={styles.account} onClick={copyLink.bind(this, link.value)}>
                      {
                        ['LOL', 'COC', 'Minecraft', 'Fortnite', 'Roblox'].includes(link.game)?
                          <img src={'../images/' + link.game + '.png'} />:
                          <span className={styles.letter} style={{backgroundColor: ['#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#c0392b', '#d35400'][Math.floor(Math.random() * 7)]}}>{link.game[0]}</span>
                      }
                    </span>
                  })
                }
              </div>
              <div className={styles.games}>
                {
                  userProfile?.social_links?.map((link, key) => {
                    return <a target="_blank" href={link.link} key={key} className={styles.account} onClick={copyLink.bind(this, link.value)}>
                      {
                        (() => {
                          let type = "";
                          ['facebook', 'instagram', 'linkedin', 'twitter', 'snapchat'].forEach(element => {
                            if(link.link.includes(element)) {
                              type = element;
                            }
                          });
                          if(type != "") {
                            return <img src={'../images/' + type + '.png'} />
                          } else {
                            <span className={styles.letter} style={{backgroundColor: ['#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#c0392b', '#d35400'][Math.floor(Math.random() * 7)]}}>{link.link[link.link.indexOf("www.") + 4]}</span>
                          }
                        })()
                      }
                    </a>
                  })
                }
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
                shownGames={shownGames}
                reviewDisplay={reviewDisplay}
                handleLike={handleLike}
                handleHoverGame={() => {}}
                handleAddToCart={handleAddToCart}
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