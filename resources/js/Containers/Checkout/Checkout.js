import styles from './Checkout.module.css';
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

const Checkout = props => {
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [addNotification, setAddNotification] = useState();

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
              let p = 0;
              response.data.cart.forEach(item => {
                p += parseFloat(item.price);
              });
              setTotalPrice(p);
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
    }, 500);
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

  
  const handleRemoveFromCart = (id, key, e) => {
    e.stopPropagation();
    const apiUrl = '/api/user/cart/remove/' + id; // Replace with your actual API endpoint
    axios.get(apiUrl)
      .then(response => {
        let c = cart.filter((cart_item) => {return cart_item.id != id});
        setCart([...c]);
        setCartAmount(cartAmount - 1);
        let p = 0;
        c.forEach(item => {
          p += parseFloat(item.price);
        });
        setTotalPrice(p);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const orderCart = () => {
    const api = axios.create({
      baseURL: '/api'
    });    
    api.post('/user/cart/order')
      .then(response => {
        if(response.data.msg = "done") {
          setCart([]);
          setCartAmount(0);
          //location.href = "/settings?page=purchase";
          location = response.data.payment.approvalUrl;
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <>
      <section className={styles.Checkout} style={{ maxHeight: cartDisplayed ? "100vh" : "1000vh", minHeight: "100vh" }}>
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
          handleOpenCart={() => {}}
          logout={logout}
          showCart={false}
        />
        <Chat addPerson={addPerson}/>
        <Notifications addNotification={addNotification} />
        <div className={styles.checkoutContent}>
          <div className={styles.left}>
            <div className={styles.cart}>
              {
                cart.map((item, key) => {
                  return <div className={styles.cartItem} onClick={() => {location.href = "game?id=" + item.id}} key={key}>
                      <div className={styles.left}>
                        <div className={styles.img}><img src={"../../../assets/items/" + item?.images[0]?.image??"d.jpg"} /></div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.title}>{ item.name }</div>
                        <div className={styles.price}>
                          <span className={styles.dollar}>$</span>{ item.price }</div>
                        <div className={styles.trader}>
                          <span className={styles.label}>By </span>
                          <a href={"profile?id=" + item?.seller?.id} className={styles.l}>{ item?.seller?.name }</a>
                        </div>
                        <button className={styles.rmbtn} onClick={handleRemoveFromCart.bind(this, item.id, key)}>remove</button>
                      </div>
                    </div>
                })
              }
            </div>
            <div className={styles.total}>
              Total ({cartAmount} item{cartAmount>1?'s':null}): <span className={styles.dollar}>$</span>{totalPrice}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.r}>
              <span className={styles.label}>Total price is </span>
              <span className={styles.dollar}>$</span>
              <span className={styles.price}>{totalPrice}</span>
            </div>
            <button className={styles.pay} onClick={orderCart}>Pay with PayPal</button>
          </div>
        </div>
        
        <Footer />
      </section>
    </>
  );
}

if (document.getElementById('checkout')) {
  ReactDOM.render(<Checkout />, document.getElementById('checkout'));
}