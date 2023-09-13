import styles from './OrdersPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const OrdersPage = props => {
    const { 
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
          console.error('Error fetching data:', error);
        });
    }, []);

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
                        {
                          (order.days==0 && order.hours==0)?
                          <span className={`${styles.badge} ${styles.refused}`}>expired</span>:
                          <div className={styles.expires}>
                            <span className={styles.label}>Expires in: </span>
                            <span className={styles.l}>{ order.days!=0?order.days + ' day':null }{order.days > 1?'s':''} { order.hours!=0?order.hours + ' hour':null }{order.hours > 1?'s':''}</span>
                          </div>
                        }
                        <div className={styles.seller}>
                          <span className={styles.label}>Ordered at: </span>
                          <span className={styles.l}>{ order.date.toDateString() }</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.p}>
                      <div className={styles.btns}>
                        
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