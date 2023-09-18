import styles from './OrdersPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const OrdersPage = props => {
    const { 
      setAddPerson,
      setAddNotification
      } = props;
    const [orders, setOrders] = useState([]);

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }
    useEffect(() => {
      const apiUrl = '/api/orders/getAll/'; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          let o = [];
          response.data.orders.forEach(order => {
            const myDate = new Date(order.created_at); 
            myDate.setDate(myDate.getDate() + parseInt(order.item.sellTime));
            const currentDate = new Date();
            const timeDifferenceMilliseconds = myDate - currentDate;

            const hoursDifference = Math.floor(timeDifferenceMilliseconds / (1000 * 60 * 60));
            const daysDifference = Math.floor(timeDifferenceMilliseconds / (1000 * 60 * 60 * 24));
            order.days = Math.max(0, daysDifference);
            order.hours = Math.max(0, hoursDifference);
            order.date = myDate;
            o.push(order);
          });
          setOrders([...o]);
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

    const complete = (id, e) => {
      const apiUrl = '/api/orders/adminComplete/' + id; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setAddNotification({
            type: "success",
            msg: "Order completed successfully",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
          let o = orders;
          o.forEach(order => {
            if(order.id == id) {
              order.status = "completed";
            }
          });
          setOrders([...o]);
          
        } else {
          setAddNotification({
            type: "danger",
            msg: "There is an error while completing the order please try again later.",
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

    const cancel = (id, e) => {
      const apiUrl = '/api/orders/adminCancel/' + id; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setAddNotification({
            type: "success",
            msg: "Order canceled successfully",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
          let o = orders;
          o.forEach(order => {
            if(order.id == id) {
              order.status = "cancelled";
            }
          });
          setOrders([...o]);
          
        } else {
          setAddNotification({
            type: "danger",
            msg: "There is an error while canceling the order please try again later.",
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
      <motion.div 
        className={styles.soldItemsPage}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={styles.block}>
          <h2 className={styles.title}>Ongoing Orders</h2>
          <div className={styles.content}>
            {
              orders?orders.map((order) => {
                if(!['refused', 'delivered'].includes(order.status)) {
                  return <div className={styles.item}>
                    <div className={styles.p}>
                      <div className={styles.img}><img src={"../../../assets/items/" + order.item?.images[0]?.image??"d.jpg"} /></div>
                      <div className={styles.con}>
                        <div className={styles.buyer}>
                          <span className={styles.label}>#{order.id}</span>
                        </div>
                        <div className={styles.title}>{order.item.name}</div>
                        <span className={`${styles.badge} ${styles[order.status]}`}>{order.status}</span>
                        <div className={styles.seller}>
                          <span className={styles.label}>Seller: </span>
                          <a href={"profile?id=" + order.item?.seller?.id} className={styles.l}>{ order.item?.seller?.name }</a>
                        </div>
                        <div className={styles.buyer}>
                          <span className={styles.label}>Buyer: </span>
                          <a href={"profile?id=" + order.client?.id} className={styles.l}>{ order.client?.name }</a>
                        </div>
                        <div className={styles.chat} onClick={() => {setAddPerson(order.client?.id + ',' + order.item?.seller?.id)}}>
                          <svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g id="Communication / Chat_Circle"><path id="Vector" d="M7.50977 19.8018C8.83126 20.5639 10.3645 21 11.9996 21C16.9702 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.6351 3.43604 15.1684 4.19819 16.4899L4.20114 16.495C4.27448 16.6221 4.31146 16.6863 4.32821 16.7469C4.34401 16.804 4.34842 16.8554 4.34437 16.9146C4.34003 16.9781 4.3186 17.044 4.27468 17.1758L3.50586 19.4823L3.50489 19.4853C3.34268 19.9719 3.26157 20.2152 3.31938 20.3774C3.36979 20.5187 3.48169 20.6303 3.62305 20.6807C3.78482 20.7384 4.02705 20.6577 4.51155 20.4962L4.51758 20.4939L6.82405 19.7251C6.95537 19.6813 7.02214 19.6591 7.08559 19.6548C7.14475 19.6507 7.19578 19.6561 7.25293 19.6719C7.31368 19.6887 7.37783 19.7257 7.50563 19.7994L7.50977 19.8018Z"/></g></svg>
                        </div>
                        {
                          (order.days==0 && order.hours==0)?
                          null:order.status=="ongoing"?
                          <div className={styles.expires}>
                            <span className={styles.label}>Expires in: </span>
                            <span className={styles.l}>{ order.days!=0?order.days + ' day':null }{order.days > 1?'s':''} { order.hours!=0?order.hours + ' hour':null }{order.hours > 1?'s':''}</span>
                          </div>:null
                        }
                        <div className={styles.seller}>
                          <span className={styles.label}>Ordered at: </span>
                          <span className={styles.l}>{ order.date.toDateString() }</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.p}>
                      <div className={styles.btns}>
                        {
                          order.status == "under-dispute"?<>
                            <button className={`${styles.btn} ${styles.success}`} onClick={complete.bind(this, order.id)}>Complete</button>
                            <button className={`${styles.btn} ${styles.danger}`} onClick={cancel.bind(this, order.id)}>Cancel</button>
                          </>:null
                        }
                      </div>
                    </div>
                  </div>
                }
              }):<div className={styles.pl}>There is no orders currently</div>
            }
          </div>
        </div>
        <div className={styles.block}>
          <h2 className={styles.title}>History</h2>
          <div className={styles.content}>
          {
              orders?orders.map((order) => {
                if(['refused', 'delivered'].includes(order.status)) {
                  return <div className={styles.item}>
                    <div className={styles.p}>
                      <div className={styles.img}><img src={"../../../assets/items/" + order.item?.images[0]?.image??"d.jpg"} /></div>
                      <div className={styles.title}>{order.item.name}</div>
                      <span className={`${styles.badge} ${styles[order.status]}`}>{order.status}</span>
                      <div className={styles.seller}>
                        <span className={styles.label}>by </span>
                        <a href={"profile?id=" + order.item?.seller?.id} className={styles.l}>{ order.item?.seller?.name }</a>
                      </div>
                    </div>
                  </div>
                }
              }):<div className={styles.pl}>There is no orders currently</div>
            }
          </div>
        </div>
      </motion.div>
);
  }
  
  export default OrdersPage;