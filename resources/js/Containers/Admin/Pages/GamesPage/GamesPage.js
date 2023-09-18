import styles from './GamesPage.module.css';
import React, { useEffect, useState } from 'react';
import Grid from '../../../../Components/Grid/Grid';
import { motion } from "framer-motion";
import axios from 'axios';

const GamesPage = props => {
    const { 
      cartDisplayed,
      setAddNotification
    } = props;
    const [selectedGame, setSelectedGame] = useState(false);
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [add, setAdd] = useState("");
    const [img, setImg] = useState();
    const [name, setName] = useState("");
    const [close, setClose] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [genres, setGenres] = useState();
    const [selectedGenres, setSelectedGenres] = useState();
    const [sending, setSending] = useState(false);
    
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
    
    api.get('/games/getAll')
      .then(response => {
        if(response.data.msg == "done") {
          setGames(response.data.games);
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
    
    const addGame = () => {
      setSending(true);
      const api = axios.create({
        baseURL: '/api'
      });
      const data = new FormData();
      data.append('name', name);
      data.append('img', img?.file);
      console.log("Agd");
      selectedGenres.forEach(genre => {
        data.append('genres[]', genre?.id);
      });
      api.post('/games/add/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if(response.data.msg == "done") {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "The game was added successfully",
              time: 3000,
              type: "success"
            });
            setGames([...games, response.data.game]);
            setAdd("");
            setSending(false);
          } else if (response.data.msg == "nogame") {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "You have to upload the game image",
              time: 3000,
              type: "error"
            });
            setSending(false);
          } else {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "There is some problem while adding the game please try again later.",
              time: 3000,
              type: "error"
            });            
            setSending(false);
          }
        })
        .catch(error => {
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
            setSending(false);
          console.error('Error fetching data:', error);
        });
    }
    
    const addCategory = () => {
      setSending(true);
      const api = axios.create({
        baseURL: '/api'
      });
      const data = new FormData();
      data.append('name', name);
      data.append('img', img?.file);
      data.append('game', selectedGame.id);
      
      api.post('/categories/add/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if(response.data.msg == "done") {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "The category was added successfully",
              time: 3000,
              type: "success"
            });
            setCategories([...categories, response.data.category]);
            setAdd("");
            setSending(false);
          } else if (response.data.msg == "nocategory") {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "You have to upload the game image",
              time: 3000,
              type: "error"
            });
            setSending(false);
          } else {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "There is some problem while adding the category please try again later.",
              time: 3000,
              type: "error"
            });   
            setSending(false);
          }
        })
        .catch(error => {
          setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
          setSending(false);
          console.error('Error fetching data:', error);
        });
    }

    const deleteGame = () => {
      setSending(true);
      const api = axios.create({
        baseURL: '/api'
      });
      
      api.post('/games/delete/' + deleteId, {}, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if(response.data.msg == "done") {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "The game was deleted successfully",
              time: 3000,
              type: "success"
            });
            let g = games.filter((game) => {return game.id != deleteId});
            setGames([...g]);
            setDeleteId();
            setClose("");
            setSending(false);
          } else {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "There is some problem while deleting the game please try again later.",
              time: 3000,
              type: "error"
            });   
            setSending(false);
          }
        })
        .catch(error => {
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
            setSending(false);
            console.error('Error fetching data:', error);
        });
    }

    const deleteCategory = () => {
      const api = axios.create({
        baseURL: '/api'
      });
      setSending(true);
      api.post('/categories/delete/' + deleteId, {}, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if(response.data.msg == "done") {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "The game was deleted successfully",
              time: 3000,
              type: "success"
            });
            let g = categories.filter((category) => {return category.id != deleteId});
            setCategories([...g]);
            setDeleteId();
            setClose("");
            setSending(false);
          } else {
            setAddNotification({
              key: Math.floor(Math.random() * 10000),
              msg: "There is some problem while deleting the category please try again later.",
              time: 3000,
              type: "error"
            });   
            setSending(false);
          }
        })
        .catch(error => {
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
          setSending(false);
          console.error('Error fetching data:', error);
        });
    }

    const handleGenres = (e) => {
      let genre = genres.filter((g) => { return g.id == e.target.value });
      genre[0].color = ['#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#c0392b', '#d35400'][Math.floor(Math.random() * 7)];
      console.log(genre);
      if(genre) {
        if(selectedGenres) {
          console.log("aaa");
          setSelectedGenres([...selectedGenres, ...genre]);
        } else {
          console.log("bbb");
          setSelectedGenres([...genre]);
        }
      }
    }

    const deleteGenre = (id, e) => {
      let g = selectedGenres.filter((genre) => { return genre.id != id });
      setSelectedGenres([...g]);
    }

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    return (
          <motion.div 
            className={styles.gamesPage}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {
              selectedGame? <div className={styles.row}><span className={styles.label}>Game:</span>{selectedGame.name} <span className={styles.change} onClick={() => {setSelectedGame(false)}}>change</span></div>:null
            }
            {
              selectedGame == false?
              <div className={styles.list}><Grid 
                  shownGames={games}
                  reviewDisplay={false}
                  handleLike={() => {}}
                  handleHoverGame={false}
                  handleAddToCart={() => {}}
                  grid={true}
                  browseType={'/games'}
                  search={""}
                  searching={false}
                  handleSelectGame={handleSelectGame}
                  cartDisplayed={cartDisplayed}
                  smallFont={false}
                  limit="0"
                  add={true}
                  addFunc={()=>{setAdd("game")}}
                  close={true}
                  closeFunc={(id, e)=>{e.stopPropagation(); setClose("game"); setDeleteId(id)}}
                /></div>:<div className={styles.list}><Grid 
                    shownGames={categories}
                    reviewDisplay={false}
                    handleLike={() => {}}
                    handleHoverGame={false}
                    handleAddToCart={() => {}}
                    grid={true}
                    browseType={'/categories'}
                    search={""}
                    searching={false}
                    handleSelectGame={() => {}}
                    cartDisplayed={cartDisplayed}
                    smallFont={false} 
                    limit="0"
                    add={true}
                    addFunc={()=>{setAdd("category")}}
                    close={true}
                    closeFunc={(id, e)=>{e.stopPropagation(); setClose("category"); setDeleteId(id)}}
                  /></div>
            }
            {
              add?add=="game"?
              <div className={styles.popOver} onClick={(e) => {setAdd("")}}>
                  <div className={styles.pop} onClick={(e) => {e.stopPropagation();}}>
                      <h3 className={styles.title}>Add a game</h3>
                      <div className={styles.form}>
                          <div className={styles.row}>
                              <label className={styles.label}>Name: </label>
                              <input className={styles.input} onChange={(e) => {setName(e.target.value)}} />
                          </div>
                          <div className={`${styles.row} ${styles.genresRow}`} >
                              <label className={styles.label}>Genres: </label>
                              <div className={styles.genres}>
                                {
                                  selectedGenres?.map((genre, key) => {
                                    return <span key={key} className={styles.genre} style={{backgroundColor: genre.color}}>
                                      {genre.name}
                                      <span className={styles.delete} onClick={deleteGenre.bind(this, genre.id)}>x</span>
                                    </span>
                                  })
                                }
                              </div>
                              <select id="mySelect" name="genres" onChange={handleGenres}>
                                {
                                  genres?.map((genre, key) => {
                                    return <option value={genre.id} key={key}>{ genre.name }</option>
                                  })
                                }
                              </select>
                          </div>
                          <div className={`${styles.row} ${styles.i}`}>
                              {
                              img?
                              <div className={styles.imgContainer}><img src={img.src} className={styles.img} /></div>:null
                              }
                              <div className={styles.f}>
                                <label className={styles.filel}>{ img?"Change Img":"Upload Img" }</label>
                                <input className={styles.file} onChange={(e) => {setImg({file: e.target.files[0], src: URL.createObjectURL(e.target.files[0])})}} type="file" />
                              </div>
                          </div>
                          <button className={styles.save} onClick={addGame} disabled={sending}>Save</button>
                      </div>
                  </div>
              </div>:add=="category"?
              <div className={styles.popOver} onClick={(e) => {setAdd("")}}>
                <div className={styles.pop} onClick={(e) => {e.stopPropagation();}}>
                  <h3 className={styles.title}>Add a category for {selectedGame.name}</h3>
                  <div className={styles.form}>
                      <div className={styles.row}>
                          <label className={styles.label}>Name: </label>
                          <input className={styles.input} onChange={(e) => {setName(e.target.value)}} />
                      </div>
                      <div className={`${styles.row} ${styles.i}`}>
                          {
                          img?
                          <div className={styles.imgContainer}><img src={img.src} className={styles.img} /></div>:null
                          }
                          <div className={styles.f}>
                            <label className={styles.filel}>{ img?"Change Img":"Upload Img" }</label>
                            <input className={styles.file} onChange={(e) => {setImg({file: e.target.files[0], src: URL.createObjectURL(e.target.files[0])})}} type="file" />
                          </div>
                      </div>
                      <button className={styles.save} onClick={addCategory} disabled={sending}>Save</button>
                  </div>
              </div>
              </div>:null:null
          }
          {
            close?close=="game"?<div className={styles.popOver} onClick={(e) => {setClose("")}}>
                <div className={styles.pop} onClick={(e) => {e.stopPropagation();}}>
                    <h3 className={styles.title}>Are you sure you want to delete this game?</h3>
                    <div className={styles.form}>
                        <button className={styles.del} onClick={deleteGame} disabled={sending}>delete</button>
                    </div>
                </div>
            </div>:close=="category"?<div className={styles.popOver} onClick={(e) => {setClose("")}}>
                <div className={styles.pop} onClick={(e) => {e.stopPropagation();}}>
                    <h3 className={styles.title}>Are you sure you want to delete this category?</h3>
                    <div className={styles.form}>
                        <button className={styles.del} onClick={deleteCategory} disabled={sending}>delete</button>
                    </div>
                </div>
            </div>:null:null
          }
          </motion.div>
    );
  }
  
  export default GamesPage;