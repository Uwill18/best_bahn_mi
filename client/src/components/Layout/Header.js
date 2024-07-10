import React from 'react'
import classes from './Header.module.css'
import bannerImage from '../../assets/bahn_mi_banner.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <>
    <header className={classes.header}>
        <h1>Best Bahn Mi</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes["main-image"]}>
        <img src={bannerImage} alt="Banh Mi Sandwich Banner"/>
    </div>
    </>
  )
}

export default Header