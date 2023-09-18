import styles from './Login.module.css';
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
import Cart from '../../Components/Cart/Cart';
import templateGame from '../../utils/templateGame';
import Notifications from '../../Components/Notifications/Notifications';
import axios from "axios";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addNotification, setAddNotification] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    
    const api = axios.create({
      baseURL: '/api'
    });
    
    api.get('/user/me')
      .then(response => {
        if(response.data.message != "Unauthenticated.") {
          location.href = "/games";
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {setCounter(counter+1)}, [])
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!email) {
      setAddNotification({
        type: "danger",
        msg: "Email is required",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
    } else if (!pattern.test(email)) {
      setAddNotification({
        type: "danger",
        msg: "Email is not valid",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
    } else if (!password) {
      setAddNotification({
        type: "danger",
        msg: "Password is required",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
    } else {
      const apiUrl = '/api/login'; // Replace with your actual API endpoint
      axios.post(apiUrl, {
        email,
        password
      })
        .then(response => {
          if(response.data.msg == "done") {
            location.href = "/games";
            setAddNotification({
              type: "success",
              msg: "You have logged in successfully",
              time: 5000,
              key: Math.floor(Math.random() * 10000)
            });
          } else if (response.data.msg == "authAlready") {
            location.href = "/games";
            setAddNotification({
              type: "normal",
              msg: "You are already logged in",
              time: 5000,
              key: Math.floor(Math.random() * 10000)
            });
          } else if (response.data.msg == "banned") {
            console.log("aaa");
            setAddNotification({
              type: "danger",
              msg: "You are banned. ++Contact us--/contactus++ if you think there is a problem.",
              time: 10000,
              key: Math.floor(Math.random() * 10000)
            });
            setEmail('');
            setPassword('');
          } else {
            setAddNotification({
              type: "danger",
              msg: "There is a problem. Check your credintals or try again later.",
              time: 5000,
              key: Math.floor(Math.random() * 10000)
            });
          }
        })
        .catch(error => {
          setAddNotification({
            type: "danger",
            msg: "There is a problem. Check your credintals or try again later.",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
          console.error('Error fetching data:', error);
        });
    }
    
  }

  return (
    <>
      <Notifications addNotification={addNotification} />
      <div className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <form>
          <input className={`${styles.input} ${styles.i}`} name="e" autoComplete={"off"} value={email} type="email" placeholder='Enter your email' onChange={handleEmailInput}/>
          <input className={`${styles.input} ${styles.i}`} name="p" autoComplete={"off"} value={password} type="password" placeholder='Enter the password' onChange={handlePasswordInput}/>
          <span className={styles.input}><input type="checkbox" onChange={handlePasswordInput}/> Remember me</span>
          <button className={styles.btn} onClick={submit}>Login</button>
        </form>
        <div className={styles.bottom}>
          <span className={styles.part}><span className={styles.label}>Don't have acount?</span><a className={styles.link} href="/signup">create new account</a></span>
          {false?<span className={styles.part}><span className={styles.label}>Forgot your password?</span><a className={styles.link} href="/reset-password">reset password</a></span>:null }
        </div>
      </div>
    </>
  );
}

if (document.getElementById('login')) {
  ReactDOM.render(<Login />, document.getElementById('login'));
}