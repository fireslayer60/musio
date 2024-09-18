import React from 'react';
import style from './Hero1Styles.module.css';
import img from '../../assets/Designer.png';

function Hero2() {
  return (
    <div className={style.box}>
      
      <div className={style.text}>
        <h1>Invest in your mental health</h1>
        <p className={style.smalltext}> Investing in your mental health is the most important investment you can make. It enriches your life, enhances your well-being, and empowers you to face challenges with resilience and strength</p>
        <p className={style.actionBtn}>Jump to action</p>
      </div>
      <div className={style.img}>
        <img src={img} alt="Mental Health"/>
      </div>
    </div>
  );
}

export default Hero2;
