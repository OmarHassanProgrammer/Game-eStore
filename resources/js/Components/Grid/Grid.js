import styles from './Grid.module.css';
import React, { useEffect } from 'react';
import Card from '../Card/Card';
import AnimatedPage from '../../Containers/AnimatedPage/AnimatedPage';
import { v4 as uuidv4 } from 'uuid';

const Grid = props => {
    const {
        shownGames,
        reviewDisplay,
        browseType,
        handleLike,
        columns = 0,
        handleHoverGame,
        handleAddToCart,
        grid,
        search,
        searching,
        handleSelectGame,
        cartDisplayed,
        add=false,
        addFunc=()=>{},
        close=false,
        closeFunc=()=>{},
        onlyAvailable = false,
        minPrice = 0,
        maxPrice = 10000
    } = props;

    useEffect(() => {
        if (grid === false) {
            if (document.getElementsByClassName('gridContainer')) {
                let grid = document.getElementById('gridContainer')
                grid.className = styles.noGrid
            }
        } else if (grid) {
            if (document.getElementById('gridContainer').className === styles.noGrid) {
                let grid = document.getElementById('gridContainer')
                grid.className = styles.gridContainer
            }
        }
    }, [grid])

    return (
    <>  
        <div className={styles.reviews} style={{ display: reviewDisplay ? "flex" : "none"}}>
            <h2>There are no reviews yet!</h2>
            <h3>You can add some, soon.</h3>
        </div>
        <div className={`${styles.gridContainer} ` + (columns!=0?`${styles['c' + columns]}`:"")} style={{ display: reviewDisplay ? "none" : "grid" }} id="gridContainer">
        {searching === false ? cartDisplayed ? shownGames.map((game, i) => {
            if (i <= 7) {
                return <Card
                browseType={browseType} 
                game={game} 
                key={game.id} 
                handleLike={handleLike} 
                handleHoverGame={handleHoverGame} 
                handleAddToCart={handleAddToCart} 
                handleSelectGame={handleSelectGame}
                gameKey={i}
                close={close}
                closeFunc={closeFunc}
                onlyAvailable={onlyAvailable}
                minPrice={minPrice}
                maxPrice={maxPrice}
                />
            }
        }) : shownGames.map((game, i) => {
            return <Card
                        browseType={browseType} 
                        game={game} 
                        key={game.id} 
                        handleLike={handleLike} 
                        handleHoverGame={handleHoverGame} 
                        handleAddToCart={handleAddToCart} 
                        handleSelectGame={handleSelectGame}
                        gameKey={i}
                        close={close}
                        closeFunc={closeFunc}
                        onlyAvailable={onlyAvailable}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />
        }) : shownGames.map((game, i) => {
            if (game.name.toLowerCase().includes(search.toLowerCase())) {
                return <Card
                            browseType={browseType} 
                            game={game} 
                            key={game.id} 
                            handleLike={handleLike} 
                            handleHoverGame={handleHoverGame} 
                            handleAddToCart={handleAddToCart} 
                            handleSelectGame={handleSelectGame}
                            gameKey={i}
                            close={close}
                            closeFunc={closeFunc}
                            onlyAvailable={onlyAvailable}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
            }
        })}
        {
            add?
            <div className={styles.add} onClick={addFunc}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </div>:null
        }
        </div>
        
    </>
    );
  }
  
  export default Grid;