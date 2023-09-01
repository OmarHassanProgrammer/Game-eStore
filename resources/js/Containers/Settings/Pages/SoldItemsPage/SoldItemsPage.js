import styles from './SoldItemsPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const SoldItemsPage = props => {
    const { 
      } = props;
    const [orders, setOrders] = useState([]);

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    useEffect(() => {
      const apiUrl = '/api/user/getSoldOrders/'; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setOrders(response.data.orders);
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
                      <div className={styles.title}>{order.item.name}</div>
                      <span className={`${styles.badge} ${styles[order.status]}`}>{order.status}</span>
                      <div className={styles.seller}>
                        <span className={styles.label}>by </span>
                        <a href={"profile?id=" + order.item?.seller?.id} className={styles.l}>{ order.item?.seller?.name }</a>
                      </div>
                    </div>
                    <div className={styles.p}>
                      <div className={styles.btns}>
                        { (() => {
                            switch(order.status) {
                              case 'ongoing':
                                return <>
                                  <button className={`${styles.btn} ${styles.danger}`}>Refuse</button>
                                  <button className={`${styles.btn} ${styles.success}`}>Delivered</button>
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
              }): <div className={styles.pl}>There is no orders currently</div>
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
  
  export default SoldItemsPage;