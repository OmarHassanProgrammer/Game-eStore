import styles from './Contactus.module.css';
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

const Contactus = props => {
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
  const [addPerson, setAddPerson] = useState();
  const [addNotification, setAddNotification] = useState();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
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

  const send = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const api = axios.create({
      baseURL: '/api'
    });
    api.post('/contact/send', {
      name, email, msg
    })
      .then(response => {
        if(response.data.msg = "done") {
          setName("");
          setEmail("");
          setMsg("");
          setAddNotification({
            type: "success",
            msg: "The message was sent successfully. We will respond to you as soon as possible",
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

        <div className={styles.contactus}>
          <div className={styles.contactusContent}>
            <h2 className={styles.title}>Contact Us</h2>
            <form className={styles.form}>
              <input className={styles.input} placeholder='name' value={name} onChange={(e) => {setName(e.target.value)}}/>
              <input className={styles.input} placeholder='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
              <textarea className={styles.input} placeholder='message' value={msg} onChange={(e) => {setMsg(e.target.value)}}>{msg}</textarea>
              <button className={styles.btn} onClick={send}>Send</button>
            </form>
          </div>
        </div>
        
        <Footer />
      </section>
    </>
  );
}

if (document.getElementById('contactus')) {
  ReactDOM.render(<Contactus />, document.getElementById('contactus'));
}