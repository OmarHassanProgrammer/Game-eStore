import styles from './ItemsPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const ItemsPage = props => {
    const { 
      } = props;
      const [items, setItems] = useState([]);

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    useEffect(() => {
      const apiUrl = '/api/items/getAll/'; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          setItems(response.data.items);
        }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    return (
          <motion.div 
            className={styles.itemsPage}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <table className={styles.table}>
              <tr>
                <th>Item's Name</th>
                <th>Seller</th>
                <th>Game</th>
                <th>Category</th>
                <th>Quantity left</th>
                <th>Quantity Sold</th>
                <th>Delivery time</th>
                <th>Price</th>
              </tr>
              {items?items.map((item) => {
                return <tr onClick={() => {location.href = "/game?id=" + item.id}}>
                  <td>{ item.name }</td>
                  <td><a href={"/profile?id=" + item.seller.id}>{ item.seller?.name }</a></td>
                  <td>{ item.subgame?.game?.name }</td>
                  <td>{ item.subgame?.name }</td>
                  <td>{ item.amount - item.sold }</td>
                  <td>{ item.sold }</td>
                  <td>{ item.sellTime } day{ item.sellTime==1?"":"s" }</td>
                  <td>{ item.price }</td>
                </tr>;
              }):null
              }
            </table>
          </motion.div>
    );
  }
  
  export default ItemsPage;