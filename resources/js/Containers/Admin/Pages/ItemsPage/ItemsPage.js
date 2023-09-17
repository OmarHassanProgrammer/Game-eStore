import styles from './ItemsPage.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

const ItemsPage = props => {
    const { 
      setAddNotification
      } = props;
      const [items, setItems] = useState([]);
      const [deleteItem, setDeleteItem] = useState();

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

    const deleteItemFunc = () => {
      const apiUrl = '/api/items/delete/' + deleteItem; // Replace with your actual API endpoint
      axios.get(apiUrl)
      .then(response => {
        if(response.data.msg == "done") {
          let i = items.filter((item) => { return item.id != deleteItem });
          setItems([...i]);
          setAddNotification({
            type: "success",
            time: 5000,
            msg: "The item has been deleted successfully",
            key: Math.floor(Math.random() * 10000)
          });
          setDeleteItem();
        }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });    
    }

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
                <th>Actions</th>
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
                  <td>
                    <button className={styles.del} onClick={(e) => { e.stopPropagation(); setDeleteItem(item.id); }}>Delete</button>
                  </td>
                </tr>;
              }):null
              }
            </table>

            {
              deleteItem?<div className={styles.popOver} onClick={(e) => {setDeleteItem()}}>
              <div className={styles.pop} onClick={(e) => {e.stopPropagation();}}>
                  <h3 className={styles.title}>Are you sure you want to delete this item?</h3>
                  <div className={styles.form}>
                      <button className={styles.del} onClick={deleteItemFunc}>delete</button>
                  </div>
              </div>
          </div>:null
            }
          </motion.div>
    );
  }
  
  export default ItemsPage;