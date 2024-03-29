import React from 'react'
import classes from './Header.module.css'
import bannerImage from '../../assets/bahn_mi_banner.jpg'

const Header = () => {
  return (
    <>
    <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <button>Cart</button>
    </header>
    <div className={classes["main-image"]}>
        <img src={bannerImage} alt="Banh Mi Sandwich Banner"/>
    </div>
    </>
  )
}

export default Header