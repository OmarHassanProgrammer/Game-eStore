import styles from './BalancePage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const BalancePage = props => {
    const { 
      addNotification
      } = props;
    const [balances, setBalances] = useState();
    const [profit, setProfit] = useState(0);
    const [usableMoney, setUsableMoney] = useState(0);

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    const withdrawMoney = () => {
      let api = axios.create({
        baseURL: '/api'
      });
      
      api.get('/orders/withdraw')
        .then(response => {
          if(response.data.msg == "done") {
            addNotification({
              type: 'success',
              msg: "The money have been withdrawn successfully. Check your account",
              time: 5000
            });
          } else if (response.data.msg == "not") {
            addNotification({
              type: 'danger',
              msg: "There was a aproblem while withdrawing the money. Try again later",
              time: 5000
            });
          }
        })
        .catch(error => {
          if(error.code == "ERR_BAD_REQUEST") {
            setAuth(false);
          }
          console.error('Error fetching data:', error);
        });  
    }

    const info = () => {
      let api = axios.create({
        baseURL: '/api'
      });
      
      api.get('/orders/info')
        .then(response => {
          if(response.data.msg == "done") {
            
          }
        })
        .catch(error => {
          if(error.code == "ERR_BAD_REQUEST") {
            setAuth(false);
          }
          console.error('Error fetching data:', error);
        });  
    }

    useEffect(() => {
      const apiUrl = '/api/balances/get/'; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setBalances(response.data.balances);
          let money = 0;
          let usable = 0;
          console.log(Object.values(response.data.balances));
          Object.values(response.data.balances).map(balance => {
            console.log(balance);
            if(balance.type == "get") {
              money += balance.amount;
            }
            if(balance.type == "withdraw") {
              money -= balance.amount;
            }
            const myDate = new Date(balance.created_at); 
            myDate.setDate(myDate.getDate() + parseInt(order.item.after / 24));
            const currentDate = new Date();
            const timeDifferenceMilliseconds = myDate - currentDate;
            if(timeDifferenceMilliseconds > 0) {
              usable += balance.amount;
            }
          });
          setProfit(money);
          setUsableMoney(usable);
        }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    return (
      <motion.div 
        className={styles.balancePage}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={styles.block}>
          <div className={styles.header}>
            <div className={styles.p}>
              <span className={styles.label}>Balance Money</span>
              <span className={styles.n}>{ profit }</span>
              <span className={styles.symbol}>$</span>
            </div>
            <div className={styles.p}>
              <span className={styles.label}>Usable Money</span>
              <span className={styles.n}>{ usableMoney }</span>
              <span className={styles.symbol}>$</span>
            </div>
            <div className={`${styles.p} ${styles.w}`} title="Withdraw the money" onClick={withdrawMoney}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 -960 960 960"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"/></svg>
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <h2 className={styles.title}>History</h2>
          <div className={styles.content}>
            {
              balances?Object.values(balances).map((balance, key) => {
                return <div className={styles.record} key={key}>
                  <span className={styles.label}>{balance.type=="pay"?"You bought item " + balance.order?.item?.name +  " from " + balance.order?.item?.seller?.name:balance.type=="withdraw"?"You have withdrawn " + balance.amount + "$":balance.type=="get"?"Item: " + balance.order?.item?.name + " was sold for " + balance.order?.client?.name:null}</span>
                  <span className={`${styles.n} ` + (balance.type=="pay"?styles.neg:balance.type=="withdraw"?styles.med:balance.type=="get"?styles.pos:null)}>{ balance.amount }$</span>
                </div>
              }):null
            }
          </div>
        </div>
      </motion.div>
    );
  }
  
  export default BalancePage;