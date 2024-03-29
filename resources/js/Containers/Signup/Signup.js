import styles from './Signup.module.css';
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

const Signup = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addNotification, setAddNotification] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sending, setSending] = useState(false);

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

  const handleNameInput = (e) => {
    setName(e.target.value);
  }
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }
  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!email) {
      setAddNotification({
        type: "danger",
        msg: "Email is required",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
      setSending(false);
    } else if (!pattern.test(email)) {
      setAddNotification({
        type: "danger",
        msg: "Email is not valid",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
      setSending(false);
    } else if (!name) {
      setAddNotification({
        type: "danger",
        msg: "Name is required",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
      setSending(false);
    } else if (!password) {
      setAddNotification({
        type: "danger",
        msg: "Password is required",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
      setSending(false);
    } else if (password.length < 8) {
      setAddNotification({
        type: "danger",
        msg: "Password must be atleast 8 charachters",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
      setSending(false);
    } else if (password !== confirmPassword) {
      setAddNotification({
        type: "danger",
        msg: "Password doesn't match confirm password",
        time: 5000,
        key: Math.floor(Math.random() * 10000)
      });
      setSending(false);
    } else {
      const apiUrl = '/api/register'; // Replace with your actual API endpoint
      axios.post(apiUrl, {
        name,
        email,
        password,
        password_confirmation: confirmPassword
      })
        .then(response => {
          if(response.data.msg == "done") {
            location.href = "/games";
            setAddNotification({
              type: "success",
              msg: "You have registered successfully.",
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
          } else {
            setAddNotification({
              type: "danger",
              msg: "There was a problem while signing up. Please try again",
              time: 5000,
              key: Math.floor(Math.random() * 10000)
            });
            setPassword("");
            setConfirmPassword("");
            setSending(false);
          }
        })
        .catch(error => {
          if(error.response.status == 422) {
            setAddNotification({
              type: "danger",
              msg: "Email already exist. Login with it or register with new email.",
              time: 5000,
              key: Math.floor(Math.random() * 10000)
            });
            setName("");
            setEmail("");
          } else {
            setAddNotification({
              type: "danger",
              msg: "There was a problem while signing up. Please try again",
              time: 5000,
              key: Math.floor(Math.random() * 10000)
            });
          }
          setPassword("");
          setConfirmPassword("");
          setSending(false);
          console.error('Error fetching data:', error);
        });
      }
  }

  return (
    <>
      <Notifications addNotification={addNotification} />
      <div className={styles.form}>
        <h2 className={styles.title}>Rgeister</h2>
        <form>
          <input className={`${styles.input} ${styles.i}`} name="e" autoComplete={"off"} value={name} type="text" placeholder='Enter your name:' onChange={handleNameInput}/>
          <input className={`${styles.input} ${styles.i}`} name="e" autoComplete={"off"} value={email} type="text" placeholder='Enter email:' onChange={handleEmailInput}/>
          <input className={`${styles.input} ${styles.i}`} name="p" autoComplete={"off"} value={password} type="password" placeholder='Enter password:' onChange={handlePasswordInput}/>
          <input className={`${styles.input} ${styles.i}`} name="cp" autoComplete={"off"} value={confirmPassword} type="password" placeholder='Confirm the password' onChange={handleConfirmPasswordInput}/>
          <button className={styles.btn} onClick={submit} disabled={sending}>Sign Up</button>
        </form>
        <div className={styles.bottom}>
          <span className={styles.part}><span className={styles.label}>Already have an acount?</span><a className={styles.link} href="/login">Login</a></span>
        </div>
      </div>
    </>
  );
}

if (document.getElementById('signup')) {
  ReactDOM.render(<Signup />, document.getElementById('signup'));
}