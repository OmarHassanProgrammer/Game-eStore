import styles from './AddedToCartBig.module.css';
import React from 'react';
import Added from "../../../assets/images/added.svg";
import AnimatedCard from '../../Containers/AnimatedPage/AnimatedCard';

const AddedToCartBig = props => {
    const {
        game
    } = props;

    return (
        <AnimatedCard>
            <div className={styles.addToCart}>
                <h2>Added</h2>
                <Added className={styles.add} />
            </div>
        </AnimatedCard>
    );
  }
  
  export default AddedToCartBig;