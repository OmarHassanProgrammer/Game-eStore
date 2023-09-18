import styles from './PurchasedItemsPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const PurchasedItemsPage = props => {
    const { 
      setAddNotification
      } = props;
      const [orders, setOrders] = useState([]);
      const [completeOrder, setCompleteOrder] = useState();
      const [stars, setStars] = useState(0);

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
      const apiUrl = '/api/orders/buyerComplete/' + id + '/' + stars; // Replace with your actual API endpoint
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
          setCompleteOrder();
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
setAddNotification({
            type: "danger",
            msg: "There is some problem",
            time: 5000,
            key: Math.floor(Math.random() * 10000)
          });
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
            className={styles.purchasedItemsPage}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {
              completeOrder?<div className={styles.popOver} onClick={(e) => {setCompleteOrder()}}>
                <div className={styles.pop} onClick={(e) => {e.stopPropagation();}}>
                    <h3 className={styles.title}>What is your rating for this service?</h3>
                    <div className={styles.stars}>
                      {
                        Array.from({ length: 5 }, () => undefined).map((value, i) => {
                          return i <= stars?
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.star} onClick={() => {setStars(i)}} key={i} viewBox="0 0 48 48" width="96px" height="96px"><linearGradient id="q0c2dLEp_4LHk~8cW2fATa" x1="9.009" x2="38.092" y1="6.36" y2="45.266" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffda1c"/><stop offset="1" stopColor="#feb705"/></linearGradient><path fill="url(#q0c2dLEp_4LHk~8cW2fATa)" d="M24.913,5.186l5.478,12.288l13.378,1.413c0.861,0.091,1.207,1.158,0.564,1.737l-9.993,9.005	l2.791,13.161c0.18,0.847-0.728,1.506-1.478,1.074L24,37.141l-11.653,6.722c-0.75,0.432-1.657-0.227-1.478-1.074l2.791-13.161	l-9.993-9.005c-0.643-0.579-0.296-1.646,0.564-1.737l13.378-1.413l5.478-12.288C23.439,4.395,24.561,4.395,24.913,5.186z"/></svg>:
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.star} onClick={() => {setStars(i)}} key={i} viewBox="0 0 48 48" width="96px" height="96px"><linearGradient id="q0c2dLEp_4LHk~8cW2fATb" x1="9.009" x2="38.092" y1="6.36" y2="45.266" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fbe574"/><stop offset="1" stopColor="#ffdb80"/></linearGradient><path fill="url(#q0c2dLEp_4LHk~8cW2fATb)" d="M24.913,5.186l5.478,12.288l13.378,1.413c0.861,0.091,1.207,1.158,0.564,1.737l-9.993,9.005	l2.791,13.161c0.18,0.847-0.728,1.506-1.478,1.074L24,37.141l-11.653,6.722c-0.75,0.432-1.657-0.227-1.478-1.074l2.791-13.161	l-9.993-9.005c-0.643-0.579-0.296-1.646,0.564-1.737l13.378-1.413l5.478-12.288C23.439,4.395,24.561,4.395,24.913,5.186z"/></svg>
                        })
                      }
                    </div>
                    <div className={styles.form}>
                        <button className={styles.sendBtn} onClick={complete.bind(this, completeOrder)}>Send Rate</button>
                    </div>
                </div>
            </div>:null
            }
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
                                      <button className={`${styles.btn} ${styles.success}`} onClick={() => { setCompleteOrder(order.id) }}>Complete</button>
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