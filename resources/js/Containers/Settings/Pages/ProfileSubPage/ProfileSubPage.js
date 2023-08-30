import styles from './ProfileSubPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const ProfileSubPage = props => {
    const { 
        userProfile,
        setUserProfile,
        setUser,
        auth,
        setAuth
      } = props;

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [links, setLinks] = useState(["a", "b", "c", " "]);
    const [gameLinks, setGameLinks] = useState([{game: "Fortnite", value: "AFSEFE", cust: false}, {game: "", value: "", cust: false}]);
    const [availableGames, setAvailabelGames] = useState(['Fortnite', 'Minecraft', 'Roblox', 'LOL', 'COC', "other"]);
    const [dropDowns, setDropDowns] = useState([false, false]);
    const [img, setImg] = useState(false)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    useEffect(() => {
      setName(userProfile.name);
      setEmail(userProfile.email);
      setBio(userProfile.bio);

      let l = [];
      userProfile?.socialLinks?.forEach(link => {
        l.push(link.link);
      });
      l.push(" ");
      setLinks([...l]);
      
      l = [];
      userProfile?.gameLinks?.forEach(link => {
        l.push({game: link.game, value: link.link, cust: false});
      });
      l.push({game: "", value: "", cust: false});
      setGameLinks([...l]);
    }, [userProfile]);

    const changeSocial = (key, e) => {
      let prevLinks = links;
      console.log(key);
      console.log(e);
      prevLinks[key] = e.target.value;
      if(key == prevLinks.length - 1) {
        prevLinks.push(' ');
      }
      setLinks([...prevLinks]);
    }

    const refreshLinks = (key, e) => {
      console.log(key != links.length - 1);
      if(key != links.length - 1) {
        if(e.target.value == "") {
          let prevLinks = links;
          prevLinks.splice(key, 1);
          setLinks([...prevLinks]);
        }
      }
    }
    
    const changeGames = (key, e) => {
      let prevLinks = gameLinks;
      prevLinks[key].value = e.target.value;
      if(key == prevLinks.length - 1) {
        prevLinks.push({game: "", value: "", cust: false});
      }
      setGameLinks([...prevLinks]);
    }

    const refreshGames = (key, e) => {
      if(key != gameLinks.length - 1) {
        if(e.target.value == "") {
          let prevLinks = gameLinks;
          prevLinks.splice(key, 1);
          setGameLinks([...prevLinks]);
        }
      }
    }

    const drop = (key, e) => {
      let prevDrops = dropDowns;
      prevDrops[key] = !prevDrops[key];
      setDropDowns([...prevDrops]);
    }

    const changeGame = (key, gamekey, e) => {
      let prevGames = gameLinks;
      prevGames[key].game = availableGames[gamekey];
      if(availableGames[gamekey] == "other") {
        prevGames[key].cust = true;
      }
      setGameLinks([...prevGames]);
    }

    const changeManualGame = (key, e) => {
      let prevGames = gameLinks;
      prevGames[key].game = e.target.value;
      setGameLinks([...prevGames]);
    }

    const updateProfile = () => {
      let api = axios.create({
        baseURL: '/api'
      });
      
      let socialLinks = links;
      socialLinks.pop();
      let gLinks = gameLinks;
      gLinks.pop();
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('bio', bio);
      socialLinks.forEach(link => {
        data.append('socialLinks[]', link);
      });
      gLinks.forEach(link => {
        data.append('gameLinks[]', link);
      });
      data.append('img', img?.file);

      api.post('/user/updateProfile', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if(response.data.msg == "done") {
            setUserProfile(response.data.user);
            setUser({
              name: response.data.user.name,
              email: response.data.user.email,
              bio: response.data.user.bio,
            });
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        }); 
    }

    const updateProfileImg = (e) => {
      if(e.target.files[0]) {
        setImg({file: e.target.files[0], src: URL.createObjectURL(e.target.files[0])})
      } else {
        setImg(false);
      }
    }

    const changePassword = () => {
      let api = axios.create({
        baseURL: '/api'
      });
      
      if(oldPassword && newPassword) {
        api.post('/user/updatePassword', {
          oldPassword,
          newPassword
        })
          .then(response => {
            if(response.data.msg == "done") {
              setOldPassword("");
              setNewPassword("");
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          }); 
      }
    }

    return (
          <motion.div 
            className={styles.profileSubPage}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={styles.block}>
              <h3 className={styles.title}>
                Public Profile
              </h3>
              <div className={styles.content}>
                <div className={styles.top}>
                  <div className={styles.l}>
                    <div className={styles.row}>
                      <span className={styles.label}>Name</span>
                      <input className={styles.input} value={name} placeholder='Type your name here' onChange={(e) => {setName(e.target.value)}}  />
                    </div>
                    <div className={styles.row}>
                      <span className={styles.label}>Bio</span>
                      <textarea className={styles.input} value={bio??null} placeholder='Type your bio here' onChange={(e) => {setBio(e.target.value)}} ></textarea>
                    </div>
                  </div>
                  <div className={styles.r}>
                    <span className={styles.label}>Profile Picture</span>
                    <div className={styles.imgContainer}>
                      <img src={
                        img.src ?? (userProfile?.imgType != null?'../assets/users/' + userProfile?.id + '.' + userProfile?.imgType:'../images/profile2.svg')
                      } className={styles.img} />
                    </div>
                    <button className={styles.edit}>
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M807 920 c-14 -11 -29 -20 -34 -20 -4 0 -153 -145 -329 -322 l-321 -323 -33 -88 c-22 -60 -29 -92 -22 -99 7 -7 39 0 99 22 l88 33 323 321 c177 176 322 325 322 329 0 5 9 20 20 34 27 35 26 78 -5 108 -30 31 -73 32 -108 5z m81 -32 c17 -17 15 -43 -4 -58 -13 -11 -19 -9 -41 12 -16 16 -23 32 -20 42 7 19 48 21 65 4z m-75 -74 c20 -19 37 -38 37 -41 0 -4 -10 -17 -22 -30 l-22 -23 -43 42 -43 42 22 23 c12 13 24 23 27 23 3 0 23 -16 44 -36z m-78 -84 l39 -40 -254 -255 c-140 -140 -260 -255 -267 -255 -6 0 -13 12 -15 27 -2 22 -9 29 -31 31 -15 2 -27 9 -27 15 0 11 499 517 510 517 3 0 24 -18 45 -40z m-539 -534 c1 0 5 -11 8 -23 6 -19 2 -25 -19 -33 -54 -21 -66 -9 -45 45 8 21 14 25 33 19 12 -3 23 -7 23 -8z"/></g></svg>
                      <span>Edit</span>
                      <input type="file" className={styles.file} onChange={updateProfileImg}/>
                    </button>
                  </div>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Email</span>
                  <input className={styles.input} value={email} placeholder='Type your email here' onChange={(e) => {setEmail(e.target.value)}}  />
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Password</span>
                  <div className={styles.inputs}>
                    <input className={styles.input} placeholder='Old Password' type="password" onChange={(e) => {setOldPassword(e.target.value)}}  />
                    <input className={styles.input} placeholder='New Password'type="password" onChange={(e) => {setNewPassword(e.target.value)}}  />
                    <button className={`${styles.input} ${styles.btn}`} onClick={changePassword}>Change</button>
                  </div>
                </div>
                <div className={styles.l}>
                  <span className={styles.label}>Social Accounts</span>
                  <div className={styles.links}>
                    {
                      links?.map((link, key) => {
                        return <div className={styles.link} key={key}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="48"><path d="M450-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h170v60H280q-58.333 0-99.167 40.765-40.833 40.764-40.833 99Q140-422 180.833-381q40.834 41 99.167 41h170v60ZM325-450v-60h310v60H325Zm185 170v-60h170q58.333 0 99.167-40.765 40.833-40.764 40.833-99Q820-538 779.167-579 738.333-620 680-620H510v-60h170q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H510Z"/></svg>
                          <input className={styles.input} value={link} onChange={changeSocial.bind(this, key)} placeholder="Paste your social media account here" onBlur={refreshLinks.bind(this, key)}/>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className={styles.l}>
                  <span className={styles.label}>Game Accounts</span>
                  <div className={styles.links}>
                    {
                      gameLinks?.map((link, key) => {
                        return <div className={styles.link} key={key}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="48"><path d="M450-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h170v60H280q-58.333 0-99.167 40.765-40.833 40.764-40.833 99Q140-422 180.833-381q40.834 41 99.167 41h170v60ZM325-450v-60h310v60H325Zm185 170v-60h170q58.333 0 99.167-40.765 40.833-40.764 40.833-99Q820-538 779.167-579 738.333-620 680-620H510v-60h170q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H510Z"/></svg>
                        <div className={styles.select} onClick={drop.bind(this, key)}>
                          {
                            link.cust?
                            <input className={styles.i} value={gameLinks[key].game != "other"?gameLinks[key].game:""} placeholder='Type game name' onChange={changeManualGame.bind(this, key)}/>:
                            <div className={styles.shown}>{link.game ?? "Choose a game"}</div>
                          }
                          <div className={`${styles.dropdown} ` + (dropDowns[key] && !gameLinks[key].cust?`${styles.active}`: '')}>
                            {
                              availableGames.map((game, gamekey) => {
                                return <span className={`${styles.item} ` + (game == link.game?`${styles.active}`:"")} key={gamekey} placeHolder="Paste your game account ID here" onClick={changeGame.bind(this, key, gamekey)}>{game}</span>
                              })
                            }
                          </div>
                        </div>
                        <input className={styles.input} value={link.value} onChange={changeGames.bind(this, key)} onBlur={refreshGames.bind(this, key)}/>
                      </div>
                      })
                    }
                  </div>
                </div>
              </div>
              <button className={styles.btn} onClick={updateProfile}>Update Profile</button>
            </div>
          </motion.div>
    );
  }
  
  export default ProfileSubPage;