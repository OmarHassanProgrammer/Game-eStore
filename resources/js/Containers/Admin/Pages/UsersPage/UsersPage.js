import styles from './UsersPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const ItemsPage = props => {
    const { 
      setAddNotification
      } = props;
      const [users, setUsers] = useState([]);

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    useEffect(() => {
      const apiUrl = '/api/user/getAll/'; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setUsers(response.data.users);
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

    const ban = (id, e) => {
      e.stopPropagation();
      const apiUrl = '/api/user/ban/' + id; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          let p = users;
          p.forEach(person => {
            if(person.id == id) {
              person.banned = 1;
            }
          });
          setUsers([...p]);
          setAddNotification({
            type: "success",
            time: 5000,
            msg: "The user has been banned successfully",
            key: Math.floor(Math.random() * 10000)
          });
        } else {
          setAddNotification({
            type: "danger",
            time: 5000,
            msg: "There was a problem while banning this user. Please try again later.",
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
    
    const unban = (id, e) => {
      e.stopPropagation();
      const apiUrl = '/api/user/unban/' + id; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          let p = users;
          p.forEach(person => {
            if(person.id == id) {
              person.banned = 0;
            }
          });
          setUsers([...p]);
          setAddNotification({
            type: "success",
            time: 5000,
            msg: "The user has been unbanned successfully",
            key: Math.floor(Math.random() * 10000)
          });
        } else {
          setAddNotification({
            type: "danger",
            time: 5000,
            msg: "There was a problem while unbanning this user. Please try again later.",
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
          <motion.div 
            className={styles.usersPage}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <table className={styles.table}>
              <tr>
                <th>User's Name</th>
                <th>Email</th>
                <th>Listed Items</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
              {users?users.map((user) => {
                return <tr onClick={() => {location.href = "/profile?id=" + user.id}}>
                  <td>{ user.name }</td>
                  <td>{ user.email }</td>
                  <td>{ user.items?.length }</td>
                  <td>{ user.balance }</td>
                  {
                    user.banned?
                    <td><button className={`${styles.btn} ${styles.unban}`} onClick={unban.bind(this, user.id)}>Unban</button></td>:
                    <td><button className={`${styles.btn} ${styles.ban}`} onClick={ban.bind(this, user.id)}>Ban</button></td>
                  }
                </tr>;
              }):null
              }
            </table>
          </motion.div>
    );
  }
  
  export default ItemsPage;