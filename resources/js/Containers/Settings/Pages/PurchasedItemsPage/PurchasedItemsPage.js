import styles from './PurchasedItemsPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const PurchasedItemsPage = props => {
    const { 
      setAddNotification
      } = props;
      const [orders, setOrders] = useState([]);

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    useEffect(() => {
      const apiUrl = '/api/user/getPurchasedOrders/'; // Replace with your actual API endpoint
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
          console.error('Error fetching data:', error);
        });
    }, []);

    const complete = (id, e) => {
      const apiUrl = '/api/orders/buyerComplete/' + id; // Replace with your actual API endpoint
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
          console.error('Error fetching data:', error);
        });
    }

    const cancel = (id, e) => {
      const apiUrl = '/api/orders/buyerCancel/' + id; // Replace with your actual API endpoint
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
          console.error('Error fetching data:', error);
        });
    }

    
    const dispute = (id, e) => {
      const apiUrl = '/api/orders/buyerRefuse/' + id; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setAddNotification({
            type: "success",
            msg: "The argument was issued successfully. Wait untill the admin solve it.",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
          let o = orders;
          o.forEach(order => {
            if(order.id == id) {
              order.status = "under-dispute";
            }
          });
          setOrders([...o]);
          
        } else {
          setAddNotification({
            type: "danger",
            msg: "There is a problem while issuing the problem. Please try again later.",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
        }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    return (
          <motion.div 
            className={styles.purchasedItemsPage}
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
                    if(!['cancelled', 'completed'].includes(order.status)) {
                      return <div className={styles.item}>
                        <div className={styles.p}>
                          <div className={styles.img}><img src={"../../../assets/items/" + order.item?.images[0]?.image??"d.jpg"} /></div>
                          <div className={styles.con}>
                            <div className={styles.title}>{order.item.name}</div>
                            <span className={`${styles.badge} ${styles[order.status]}`}>{order.status}</span>
                            <div className={styles.seller}>
                              <span className={styles.label}>by </span>
                              <a href={"profile?id=" + order.item?.seller?.id} className={styles.l}>{ order.item?.seller?.name }</a>
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
                            { (() => {
                                switch(order.status) {
                                  case 'shipped':
                                    return <>
                                      <button className={`${styles.btn} ${styles.success}`} onClick={complete.bind(this, order.id)}>Complete</button>
                                      <button className={`${styles.btn} ${styles.danger}`} onClick={dispute.bind(this, order.id)}>Didn't recieve</button>
                                    </>
                                  case 'expired':
                                    return <>
                                      <button className={`${styles.btn} ${styles.danger}`} onClick={cancel.bind(this, order.id)}>Cancel</button>
                                    </>
                                  default:
                                    return null
                                }
                              })()
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
                    if(['cancelled', 'completed'].includes(order.status)) {
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
  
  export default PurchasedItemsPage;