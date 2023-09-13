import styles from './BalancePage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const BalancePage = props => {
    const { 
      } = props;
    const [balances, setBalances] = useState();
    const [profit, setProfit] = useState(0);
    const [undrawnMoney, setUndrawnMoney] = useState(0);

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    useEffect(() => {
      const apiUrl = '/api/balances/getAll/'; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setBalances(response.data.balances);
          let profit = 0;
          let undrawnMoney = 0;
          response.data.balances.forEach(balance => {
            if(balance.type == "pay") {
              profit += balance.amount;
            }
            if(balance.type == "get") {
              undrawnMoney += balance.amount;
            }
            if(balance.type == "withdraw") {
              profit -= balance.amount;
            }
          });
          setProfit(profit);
          setUndrawnMoney(undrawnMoney);
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
              <span className={styles.label}>Profit</span>
              <span className={styles.n}>{ profit }</span>
              <span className={styles.symbol}>$</span>
            </div>
            <div className={styles.p}>
              <span className={styles.label}>Undrawn money</span>
              <span className={styles.n}>{ undrawnMoney }</span>
              <span className={styles.symbol}>$</span>
            </div>
            <div className={styles.p}>
              <span className={styles.label}>Net Profit</span>
              <span className={styles.n}>{ profit - undrawnMoney }</span>
              <span className={styles.symbol}>$</span>
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <h2 className={styles.title}>History</h2>
          <div className={styles.content}>
            {
              balances?balances.map((balance) => {
                if(balance.type == "pay" || balance.type == "withdraw") {
                  return <div className={styles.record}>
                    <span className={styles.label}>{balance.type=="pay"?"Item " + balance.order?.item?.name + " was sold in order #" + balance.amount:balance.type=="withdraw"?balance.user?.name + " has withdrawn " + balance.amount + "$":null}</span>
                    <span className={`${styles.n} ` + (balance.type=="pay"?styles.pos:balance.type=="withdraw"?styles.neg:null)}>{ balance.amount }$</span>
                  </div>
                }
              }):null
            }
          </div>
        </div>
      </motion.div>
    );
  }
  
  export default BalancePage;