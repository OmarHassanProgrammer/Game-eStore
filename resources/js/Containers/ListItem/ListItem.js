import styles from './ListItem.module.css';
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
import Notifications from '../../Components/Notifications/Notifications';
import axios from "axios";

const ListItem = props => {
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
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedGame, setSelectedGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(1);
  const [sellTime, setSellTime] = useState(1);
  const [imgs, setImgs] = useState([]);
  const [addPerson, setAddPerson] = useState();
  const [addNotification, setAddNotification] = useState();
  const [refresher, setRefresher] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);

  useEffect(() => {

    const api = axios.create({
      baseURL: '/api'
    });
    
    api.get('/user/me')
      .then(response => {
        if(response.data.msg == "done") {
          setUser(response.data.user);
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
    
    api.get('/games/getAll')
      .then(response => {
        if(response.data.msg == "done") {
          setGames(response.data.games);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
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
  
  const logout = () => {
    const api = axios.create({
      baseURL: '/api'
    });
    
    
    api.post('/logout')
      .then(response => {
        if(response.data.msg == "done") {
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

  const handleSelectGame = (id) => {
    const game = games.filter((g) => {return g.id == id});
    setSelectedGame(game[0]);

    const api = axios.create({
      baseURL: '/api'
    });
    
    api.get('/games/getCategories/' + id)
      .then(response => {
        if(response.data.msg == "done") {
          setCategories(response.data.categories);
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
  
  const handleSelectCategory = (id) => {
    const category = categories.filter((c) => {return c.id == id});
    setSelectedCategory(category[0]);

  }

  const resetGame = () => {
    setSelectedGame(false);
    setSelectedCategory(false);
  }

  const resetCategory = () => {
    setSelectedCategory(false);
  }

  const updateName = (e) => {
    setName(e.target.value);
  }
  const updateDescription = (e) => {
    setDescription(e.target.value);
  }
  const updatePrice = (e) => {
    setPrice(e.target.value);
  }
  const updateAmount = (e) => {
    setAmount(e.target.value);
  }
  const updateSellTime = (e) => {
    setSellTime(e.target.value);
  }

  const addImg = (e) => {
    let newFiles = [];
    for(let i = 0; i < e.target.files.length; i++) {
      newFiles.push({file: e.target.files[i], url: URL.createObjectURL(e.target.files[i])});
    }
    setImgs([...imgs, ...newFiles]);
    
  }
  const deleteImg = (i) => {
    let newImgs = imgs;
    newImgs.splice(i, 1);
    setImgs(newImgs);
    console.log(newImgs);
    setRefresher(!refresher);
  }

  const submit = (e) => {
    e.preventDefault();

    if(name != "" && price != 0 && amount != 0 && imgs.length > 0) {
      const apiUrl = '/api/items/add'; // Replace with your actual API endpoint
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('amount', sellTime);
      formData.append('sellTime', sellTime);
      formData.append('sub_game_id', selectedCategory.id);
      for(let i = 0; i < imgs.length; i++) {
        formData.append('imgFiles[]', imgs[i].file);
      }
      axios.post(apiUrl, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
        .then(response => {
          if(response.data.msg == "done") {
            location.href = "/game?id=" + response.data.item.id;
            setAddNotification({
              type: "success",
              msg: "Item was listed successfully.",
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
    } else {
      setTriedSubmit(true);
    }
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
  
  return (
    <>
      <section className={styles.listPage} style={{ maxHeight: cartDisplayed ? "100vh" : "1000vh", minHeight: "100vh" }}>
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

        {
          auth?<div className={styles.listBody}>
            <h2 className={styles.title}><span>Sell an Item</span></h2>
            <div className={`${styles.right} ` + ((selectedGame != {} && selectedCategory != {})?"":styles.full)} style={{width: selectedGame != {} && selectedCategory != {}?'60%':'100%'}}>
              {
                selectedGame == false? <div className={styles.row}>Select The Game: </div>:<div className={styles.row}><span className={styles.label}>Game:</span>{selectedGame.name} <span className={styles.change} onClick={resetGame}>change</span></div>
              }
              {
                selectedGame != false?
                  selectedCategory == false?
                    <div className={`${styles.row} ${styles.cat}`}>Select The Category: </div>:<div className={styles.row}><span className={styles.label}>Category:</span>{selectedCategory.name} <span className={styles.change} onClick={resetCategory}>change</span></div>:
                    ""
              }
              {
                selectedGame == false?
                <div className={styles.list}><Grid 
                    columns={4}
                    shownGames={games}
                    reviewDisplay={reviewDisplay}
                    handleLike={() => {}}
                    handleHoverGame={false}
                    handleAddToCart={() => {}}
                    grid={grid}
                    browseType={'/games'}
                    search={search}
                    searching={searching}
                    handleSelectGame={handleSelectGame}
                    cartDisplayed={cartDisplayed}
                    smallFont={false}
                    limit="0"
                  /></div>:selectedCategory == false?
                  <div className={styles.list}><Grid 
                      columns={4}
                      shownGames={categories}
                      reviewDisplay={reviewDisplay}
                      handleLike={() => {}}
                      handleHoverGame={false}
                      handleAddToCart={() => {}}
                      grid={grid}
                      browseType={'/categories'}
                      search={search}
                      searching={searching}
                      handleSelectGame={handleSelectCategory}
                      cartDisplayed={cartDisplayed}
                      smallFont={false} 
                      limit="0"
                    /></div>:<div className={styles.form}>
                      <div className={styles.row}>
                        <span className={styles.label}>Name: </span>
                        <input className={`${styles.input} ` + ((triedSubmit && name=="")?`${styles.err}`:'')} onChange={updateName} />
                      </div>
                      <div className={styles.row}>
                        <span className={styles.label}>Description: </span>
                        <textarea className={styles.input} onChange={updateDescription} ></textarea>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.label}>Price: </span>
                        <input className={`${styles.input} ${styles.p} ` + ((triedSubmit && price==0)?`${styles.err}`:'')} onChange={updatePrice} type="number"/>
                        <span className={styles.trailer}>You will get {0.95 * price}$</span>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.label}>Amount: </span>
                        <input className={`${styles.input} ` + ((triedSubmit && amount==0)?`${styles.err}`:'')} type="number" onChange={updateAmount} defaultValue={1}/>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.label}>Sells in: </span>
                        <input className={styles.input} type="number" onChange={updateSellTime} defaultValue={1}/>
                        <span className={styles.trailer}>day/s</span>
                      </div>
                    </div>
              }
              
            </div>
            {(selectedGame != false && selectedCategory != false)?<div className={styles.left}>
              {
                imgs.map((img, key) => {
                  return <div className={`${styles.img} ${styles.block}`} key={key}>
                    <img src={img.url} />
                    <span className={styles.del} onClick={deleteImg.bind(this, key)}>delete</span>
                  </div>
                })
              }
              <div className={`${styles.block} ${styles.add} ` + (triedSubmit && imgs.length == 0?`${styles.err}`:'')}>
                <span className={styles.l}><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 30 30"><path d="M 14.970703 2.9726562 A 2.0002 2.0002 0 0 0 13 5 L 13 13 L 5 13 A 2.0002 2.0002 0 1 0 5 17 L 13 17 L 13 25 A 2.0002 2.0002 0 1 0 17 25 L 17 17 L 25 17 A 2.0002 2.0002 0 1 0 25 13 L 17 13 L 17 5 A 2.0002 2.0002 0 0 0 14.970703 2.9726562 z"/></svg></span>
                <input className={styles.i} onChange={addImg} multiple type="file" />
              </div>
            </div>:""}
          </div>:<div className={styles.mustAuth}>
            You must <a href="/login">Login</a> or <a href="/signup">Register</a> to sell an item.
          </div>
        }
        {
          selectedCategory? <div className={styles.submit}>
            <button onClick={submit}>Sell</button>
          </div>:null
        }
        <Footer />
      </section>
    </>
  );
}

if (document.getElementById('listItem')) {
  ReactDOM.render(<ListItem />, document.getElementById('listItem'));
}