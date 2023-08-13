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
import axios from "axios";

const Signup = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    const apiUrl = '/api/register'; // Replace with your actual API endpoint
    axios.post(apiUrl, {
      name,
      email,
      password,
      password_confirmation: confirmPassword
    })
      .then(response => {
        if(response.data.msg == "done") {
          localStorage.setItem("token", response.data.api_token);
        } 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <>
      <div className={styles.form}>
        <h2 className={styles.title}>Rgeister</h2>
        <form>
          <input className={`${styles.input} ${styles.i}`} name="e" autoComplete={"off"} value={name} type="text" placeholder='Enter your name:' onChange={handleNameInput}/>
          <input className={`${styles.input} ${styles.i}`} name="e" autoComplete={"off"} value={email} type="text" placeholder='Enter email:' onChange={handleEmailInput}/>
          <input className={`${styles.input} ${styles.i}`} name="p" autoComplete={"off"} value={password} type="password" placeholder='Enter password:' onChange={handlePasswordInput}/>
          <input className={`${styles.input} ${styles.i}`} name="cp" autoComplete={"off"} value={confirmPassword} type="password" placeholder='Confirm the password' onChange={handleConfirmPasswordInput}/>
          <button className={styles.btn} onClick={submit}>Sign Up</button>
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