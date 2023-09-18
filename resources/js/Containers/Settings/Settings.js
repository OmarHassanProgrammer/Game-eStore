import styles from './Settings.module.css';
import React, { useEffect, useState } from 'react';
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
import ProfileSubPage from './Pages/ProfileSubPage/ProfileSubPage';
import SoldItemsPage from './Pages/SoldItemsPage/SoldItemsPage';
import PurchasedItemsPage from './Pages/PurchasedItemsPage/PurchasedItemsPage';
import BalancePage from './Pages/BalancePage/BalancePage';
import Notifications from '../../Components/Notifications/Notifications';
import axios from "axios";

const Settings = props => {
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
  const [addPerson, setAddPerson] = useState();
  const [userProfile, setUserProfile] = useState({});
  const [stars, setStars] = useState([]);
  const [emptyStars, setEmptyStars] = useState([0,0,0,0,0]);
  const [addNotification, setAddNotification] = useState();
  const [page, setPage] = useState('profile');

  useEffect(() => {
    let api = axios.create({
      baseURL: '/api'
    });
    
    api.get('/user/me')
      .then(response => {
        if(response.data.msg == "done") {
          setUser(response.data.user);

          api.get('/user/get/' + response.data.user.id)
          .then(response => {
            if(response.data.msg == "done") {
              setUserProfile(response.data.user);
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
            } else if (response.data.message == "Unauthenticated.") {
              setAuth(false);
            }
          })
          .catch(error => {
            if(error.code == "ERR_BAD_REQUEST") {
              setAuth(false);
            }
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
    let q = 0;
    if(window.location.search.indexOf('page=') != -1) {
      q = window.location.search.slice(window.location.search.indexOf('page=') + 5);
      const i = q.indexOf("&");
      if(i != -1) {
        q = q.slice(0, i);
      }
      setPage(q);
    }
    
  }, [window.location.search]);

  useEffect(() => {
    if(!auth) {
      location = '/login';
    }
  }, [auth]);
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
  
const handleCloseCart = () => {
  setCartDisplayed(false);
}


const openGamePage = (e) => {
  setCartDisplayed(false);
  let selectedGameSurname = e.target.id;
  window.location.href = `/game/${selectedGameSurname}`;
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
          location.href = "/games";
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

  return (
    <>
      <section className={styles.Settings} style={{ maxHeight: cartDisplayed ? "100vh" : "1000vh", minHeight: "100vh" }}>
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
        <Chat addPerson={addPerson} setAddPerson={setAddPerson} setAddNotification={setAddNotification} />
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

        <div className={styles.settingsContent}>
          <div className={styles.header}>
            <div className={styles.left}>
              <img src={userProfile?.imgType != null?'../assets/users/' + userProfile?.id + '.' + userProfile?.imgType + "?r=" + (Math.random() * 1000):'../images/profile2.svg'} className={styles.img} />
              <div className={styles.name}>
                <h2 className={styles.h}>{user?.name}</h2>
                <span className={styles.s}>Your personal account</span>
              </div>
            </div>
            <div className={styles.right}>
              <button className={styles.pro} onClick={() => {location.href = '/profile'}}>
                See your personal profile
              </button>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.left}>
              <div className={styles.block}>
                <div className={`${styles.link} ` + (page == "profile"?`${styles.active}`:'')} onClick={() => {window.location.search = '?page=profile'}}>
                  <svg className={styles.icon} viewBox="0 0 24 24" fill="#eee" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#aaa"/></svg>
                  <span className={styles.label}>Profile and account</span>
                </div>
                <div className={`${styles.link} ` + (page == "balance"?`${styles.active}`:'')} onClick={() => {window.location.search = '?page=balance'}}>
                  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="#aaa" viewBox="0 0 50 50"><path d="M 23.6875 2.03125 C 23.019531 2.011719 22.375 2.261719 21.84375 2.65625 C 21.3125 3.050781 20.835938 3.570313 20.375 4.21875 C 20.023438 4.714844 19.675781 4.925781 19.0625 5.0625 C 18.449219 5.199219 17.59375 5.1875 16.59375 5.1875 C 15.476563 5.1875 14.667969 5.285156 14 5.53125 C 13.464844 5.726563 12.976563 6.109375 12.71875 6.59375 C 12.707031 6.625 12.695313 6.65625 12.6875 6.6875 C 12.675781 6.710938 12.664063 6.726563 12.65625 6.75 C 12.644531 6.769531 12.632813 6.792969 12.625 6.8125 C 12.605469 6.867188 12.574219 6.914063 12.5625 6.96875 C 12.402344 7.640625 12.628906 8.207031 12.90625 8.65625 C 13.179688 9.097656 13.542969 9.476563 13.90625 9.8125 C 14.324219 10.230469 15.210938 10.988281 16.0625 12.34375 C 16.832031 13.566406 17.390625 15.230469 17.34375 17.21875 C 14.03125 18.230469 10.867188 20.640625 8.4375 23.71875 C 5.800781 27.058594 4 31.132813 4 35.09375 C 4 39.980469 5.53125 43.460938 9 45.4375 C 12.46875 47.414063 17.59375 48 25 48 C 32.40625 48 37.53125 47.414063 41 45.4375 C 44.46875 43.460938 46 39.980469 46 35.09375 C 46 27.53125 40.074219 20.609375 33.25 17.59375 C 33.730469 17.53125 34.226563 17.484375 34.75 17.5 C 36.433594 17.542969 38.230469 18.050781 39.78125 19.6875 C 40.015625 19.988281 40.402344 20.132813 40.777344 20.054688 C 41.148438 19.976563 41.449219 19.691406 41.542969 19.320313 C 41.636719 18.953125 41.511719 18.558594 41.21875 18.3125 C 39.40625 16.394531 37.210938 15.667969 35.25 15.53125 C 36.890625 14.84375 38.777344 14.636719 41.03125 15.875 C 41.347656 16.097656 41.761719 16.117188 42.101563 15.929688 C 42.4375 15.738281 42.632813 15.371094 42.605469 14.984375 C 42.578125 14.597656 42.328125 14.265625 41.96875 14.125 C 40.5625 13.351563 39.226563 13.039063 37.96875 13.03125 C 35.136719 13.015625 32.753906 14.523438 31.1875 15.59375 C 30.960938 11.949219 33.023438 9.042969 33.28125 8.71875 L 33.3125 8.6875 L 33.34375 8.625 C 33.691406 8.078125 34.234375 7.300781 34.46875 6.375 C 34.585938 5.914063 34.652344 5.304688 34.25 4.75 C 33.847656 4.195313 33.167969 4 32.5 4 C 31.25 4 30.121094 4.425781 29.21875 4.59375 C 28.316406 4.761719 27.859375 4.734375 27.40625 4.28125 L 27.40625 4.3125 C 27.398438 4.304688 27.382813 4.320313 27.375 4.3125 C 26.074219 2.960938 25.019531 2.070313 23.6875 2.03125 Z M 23.625 4.03125 C 23.988281 4.042969 24.777344 4.449219 25.96875 5.6875 L 26 5.6875 L 26 5.71875 C 27.046875 6.765625 28.472656 6.738281 29.59375 6.53125 C 30.441406 6.375 31.246094 6.164063 31.90625 6.0625 C 31.917969 6.136719 31.933594 6.140625 31.84375 6.28125 C 31.753906 6.421875 31.546875 6.660156 31.21875 6.9375 C 30.5625 7.492188 29.46875 8.199219 28.3125 9.25 C 27.839844 9.683594 27.277344 9.976563 26.84375 10.03125 C 26.410156 10.085938 26.160156 10 25.875 9.65625 L 25.84375 9.65625 C 25.335938 9.023438 24.878906 8.542969 24.34375 8.21875 C 23.796875 7.886719 23.152344 7.71875 22.5625 7.8125 C 21.394531 7.996094 20.652344 8.835938 19.75 9.6875 L 19.71875 9.6875 L 19.71875 9.65625 C 19.203125 10.140625 18.589844 10.300781 17.65625 9.90625 C 16.867188 9.574219 15.894531 8.742188 14.96875 7.375 C 15.3125 7.28125 15.8125 7.1875 16.59375 7.1875 C 17.59375 7.1875 18.5625 7.210938 19.5 7 C 20.4375 6.789063 21.351563 6.28125 22 5.375 L 22.03125 5.375 C 22.421875 4.824219 22.761719 4.449219 23.03125 4.25 C 23.300781 4.050781 23.445313 4.027344 23.625 4.03125 Z M 22.875 9.8125 C 23 9.792969 23.078125 9.765625 23.3125 9.90625 C 23.546875 10.046875 23.878906 10.359375 24.3125 10.90625 L 24.3125 10.9375 L 24.34375 10.9375 C 25.058594 11.792969 26.128906 12.121094 27.09375 12 C 28.058594 11.878906 28.957031 11.417969 29.6875 10.75 C 29.792969 10.652344 29.894531 10.59375 30 10.5 C 29.328125 12.125 28.796875 14.296875 29.21875 16.78125 C 24.59375 19.027344 20.890625 17.839844 19.46875 17.1875 C 19.507813 15.148438 18.917969 13.398438 18.1875 12.03125 C 19.265625 12.136719 20.324219 11.847656 21.09375 11.125 C 21.984375 10.285156 22.625 9.851563 22.875 9.8125 Z M 30.25 18.5 C 37.164063 20.523438 44 27.84375 44 35.09375 C 44 39.605469 42.886719 42.09375 40.03125 43.71875 C 37.175781 45.34375 32.292969 46 25 46 C 17.707031 46 12.824219 45.34375 9.96875 43.71875 C 7.113281 42.09375 6 39.605469 6 35.09375 C 6 31.753906 7.585938 27.996094 10 24.9375 C 12.382813 21.921875 15.554688 19.617188 18.5 18.90625 C 20.175781 19.660156 24.800781 21.203125 30.25 18.5 Z M 25.6875 25 C 21.136719 25 19.789063 29.261719 19.4375 31.0625 L 18.25 31.0625 L 17.65625 32.375 L 19.28125 32.375 C 19.265625 32.476563 19.25 32.601563 19.25 32.71875 L 19.25 33.3125 C 19.25 33.386719 19.265625 33.457031 19.28125 33.53125 L 18.25 33.53125 L 17.65625 34.875 L 19.375 34.875 C 19.992188 39.140625 22.066406 41.28125 25.65625 41.28125 C 26.933594 41.28125 28.082031 40.941406 29.0625 40.3125 L 29.0625 38.03125 C 28.445313 38.601563 27.507813 39.59375 25.65625 39.59375 C 23.355469 39.59375 21.984375 38.027344 21.5 34.875 L 26.28125 34.875 L 26.84375 33.53125 L 21.375 33.53125 C 21.359375 33.457031 21.375 33.386719 21.375 33.3125 L 21.375 32.75 C 21.375 32.632813 21.359375 32.492188 21.375 32.375 L 27.15625 32.375 L 27.75 31.0625 L 21.53125 31.0625 C 21.78125 29.847656 22.65625 26.6875 25.5 26.6875 C 26.570313 26.6875 27.597656 27.207031 28.625 28.21875 L 29.65625 26.375 C 28.335938 25.449219 27.019531 25 25.6875 25 Z"/></svg>
                  <span className={styles.label}>Balance</span>
                </div>
                <div className={`${styles.link} ` + (page == "purchase"?`${styles.active}`:'')} onClick={() => {window.location.search = '?page=purchase'}}>
                  <svg className={styles.icon} fill="#aaa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 11 1 L 11 6 L 8 6 L 12 10 L 16 6 L 13 6 L 13 1 L 11 1 z M 4.4140625 1.9960938 L 1.0039062 2.0136719 L 1.0136719 4.0136719 L 3.0839844 4.0039062 L 6.3789062 11.908203 L 5.1816406 13.824219 C 4.7816406 14.464219 4.7609531 15.272641 5.1269531 15.931641 C 5.4929531 16.590641 6.1874063 17 6.9414062 17 L 19 17 L 19 15 L 6.9414062 15 L 6.8769531 14.882812 L 8.0527344 13 L 15.521484 13 C 16.248484 13 16.917531 12.606656 17.269531 11.972656 L 21.382812 4.5664062 L 19.634766 3.5957031 L 15.521484 11 L 8.1660156 11 L 4.4140625 1.9960938 z M 7 18 A 2 2 0 0 0 5 20 A 2 2 0 0 0 7 22 A 2 2 0 0 0 9 20 A 2 2 0 0 0 7 18 z M 17 18 A 2 2 0 0 0 15 20 A 2 2 0 0 0 17 22 A 2 2 0 0 0 19 20 A 2 2 0 0 0 17 18 z"/></svg>
                  <span className={styles.label}>Purchasing Orders</span>
                </div>
                <div className={`${styles.link} ` + (page == "selling"?`${styles.active}`:'')} onClick={() => {window.location.search = '?page=selling'}}>
                  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="#aaa" viewBox="0 0 30 30"><path d="M 13 4 A 1.0001 1.0001 0 1 0 13 6 L 13 14 C 13 14.552 13.448 15 14 15 L 26 15 C 26.552 15 27 14.552 27 14 L 27 6 A 1.0001 1.0001 0 1 0 27 4 L 13 4 z M 18 6 L 22 6 C 22.552 6 23 6.448 23 7 C 23 7.552 22.552 8 22 8 L 18 8 C 17.448 8 17 7.552 17 7 C 17 6.448 17.448 6 18 6 z M 8 15 A 3 3 0 0 0 6.8828125 15.216797 L 2 17 L 2 25 L 6.2207031 23.166016 C 6.7187031 22.950016 7.2821563 22.942438 7.7851562 23.148438 L 16.849609 26.851562 C 16.849609 26.851562 16.853494 26.851563 16.853516 26.851562 A 1.5 1.5 0 0 0 17.5 27 A 1.5 1.5 0 0 0 18.238281 26.802734 C 18.238413 26.802691 18.244057 26.802776 18.244141 26.802734 L 27.230469 21.810547 L 27.228516 21.808594 A 1.5 1.5 0 0 0 28 20.5 A 1.5 1.5 0 0 0 26.5 19 A 1.5 1.5 0 0 0 25.863281 19.144531 L 25.863281 19.142578 L 19 22 L 17.5 22 A 1.5 1.5 0 0 0 19 20.5 A 1.5 1.5 0 0 0 17.964844 19.074219 L 17.964844 19.072266 L 9.2714844 15.28125 L 9.2597656 15.28125 A 3 3 0 0 0 8 15 z"/></svg>
                  <span className={styles.label}>Ongoing Selling Orders</span>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              {(() => {
                switch(page) {
                  case 'profile':
                    return <ProfileSubPage 
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                      auth={auth}
                      setAuth={setAuth}
                      setUser={setUser}
                      setAddNotification={setAddNotification}
                    />
                  case 'selling':
                    return <SoldItemsPage setAddNotification={setAddNotification} />
                  case 'purchase':
                    return <PurchasedItemsPage setAddNotification={setAddNotification} />
                  case 'balance':
                    return <BalancePage 
                      addNotification={setAddNotification}
                    />
                  default:
                    return null
                }
              })()}
            </div>
          </div>
        </div>
        
        <Footer />
      </section>
    </>
  );
}

if (document.getElementById('settings')) {
  ReactDOM.render(<Settings />, document.getElementById('settings'));
}