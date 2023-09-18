import styles from './Notifications.module.css';
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import AnimatedChat from '../../Containers/AnimatedPage/AnimatedChat';
import AnimatedCard from '../../Containers/AnimatedPage/AnimatedCard';
import { useEffect } from 'react';
import axios from 'axios';

const Notifications = props => {
    const {
        addNotification
    } = props;
    const [notifications, setNotifications] = useState([]);
    const [f, setF] = useState(true);

    useEffect(() => {
        let n = localStorage.getItem("notifications");
        let ns = [];
        if(n) {
            n = n.split(',');
            n.forEach((notification, key) => {
                ns.push({
                    key: notification.split(';')[0],
                    type: notification.split(';')[1],
                    msg: notification.split(';')[2],
                    time: notification.split(';')[3]
                });
                if(notification.split(';')[3] != 0) {
                    setTimeout(() =>{ 
                        rmNotification(notification.split(';')[0]);
                    }, notification.split(';')[3]);
                }
            });
            setNotifications([...ns]);
            console.log(ns);
        }
        const apiUrl = '/api/user/getNewNotifications'; // Replace with your actual API endpoint
        axios.get(apiUrl)
        .then(response => {
            if(response.data.msg == "done") {
                response.data.notifications.forEach(notification => {
                    ns.push({
                        key: notification.id,
                        type: notification.status,
                        msg: notification.msg,
                        time: notification.time,
                    });
                    if(notification.time != 0) {
                        setTimeout(() =>{ 
                            rmNotification(notification.id);
                        }, notification.time);
                    }
                });
                setNotifications([...ns]);
                console.log(ns);
                let localSN = "";
                ns.forEach(n => {
                    localSN += n.key + ";" + n.type + ";" + n.msg + ";" +n.time + ",";
                });
                localStorage.setItem("notifications", localSN.slice(0, localSN.length - 1));
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

    useEffect(() => {
        console.log(addNotification);
        if(f) setF(false);
        else {
            let newNotifications = [...notifications, addNotification];
            setNotifications(newNotifications);

            let localSN = "";
            newNotifications.forEach(notification => {
                localSN += notification.key + ";" + notification.type + ";" + notification.msg + ";" +notification.time + ",";
            });
            localStorage.setItem("notifications", localSN.slice(0, localSN.length - 1));
            setTimeout(() =>{ 
                rmNotification(addNotification.key);
            }, addNotification.time);
        }
    }, [addNotification]);

    useEffect(() => {
        console.log(localStorage.getItem("notifications"));
    }, [localStorage]);

    const rmNotification = (key) => {
        let index = -1;
        let n = localStorage.getItem("notifications").split(',');
        let ns = [];
        if(n) {
            n.forEach((notification, key) => {
                ns.push({
                    key: notification.split(';')[0],
                    type: notification.split(';')[1],
                    msg: notification.split(';')[2],
                    time: notification.split(';')[3]
                });
            });
        }
        ns.forEach((notification, k) => {
            if(notification.key == key) index = k;
        });
        
        if(index != -1) {
            let newNotifications = ns;
            newNotifications.splice(index, 1);
            setNotifications([...newNotifications]);
            let localSN = "";
            newNotifications.forEach(notification => {
                localSN += notification.key + ";" + notification.type + ";" + notification.msg + ";" +notification.time + ",";
            });
            
            localStorage.setItem("notifications", localSN.slice(0, localSN.length - 1));
        }
    }

    // ++ 

    return (
        <AnimatedChat>
            <div className={styles.NotificationsWidget}>
                { notifications.map((notification, key) => {
                    return <div className={`${styles.notification} ${styles[notification.type]}`} key={key}>
                        <span className={styles.txt}>
                            { 
                                notification?.msg?.split("++").map((m, k) => {
                                    if(m.split("--")[1]) {
                                        return <a key={k} href={m.split("--")[1]} className={`${styles.p} ${styles.l}`}>{m.split("--")[0]}</a>
                                    } else {
                                        return <span key={k} className={styles.p}>{m.split("--")[0]}</span>
                                    }
                                })
                            }
                        </span>
                        <span className={styles.delete} onClick={rmNotification.bind(this, notification.key)}>
                            <span className={styles.icon}>x</span>
                        </span>
                    </div>
                }) }
            </div>
        </AnimatedChat>
    );
}

export default Notifications;