import React from 'react'
import style from './HeaderStyles.module.css'
function Header() {
  return (
    <div className={style.navbar}>
      <p>Musio</p>
      <ul >
        <li className={style.list}>Home</li>
        <li className={style.list}>PlayLists</li>
        <li className={style.list}>About</li>
        <li className={style.list}>Contact</li>
        <li className={style.noTransition}>|</li>
        <li className={style.LgBtn}>Login</li>
      </ul>
      
      </div>
  )
}

export default Header