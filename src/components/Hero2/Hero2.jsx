import React from 'react';
import style from './Hero2Styles.module.css';
import img from '../../assets/Designer2.png';

function Hero1() {
  return (
    <div className={style.box}>
      <div className={style.img}>
        <img src={img} alt="Mental Health"/>
      </div>
      <div className={style.text}>
        <h1>Introducing Musio</h1>
        <p className={style.smalltext}>Musio is a website that analyzes text input to detect mental health conditions like anxiety or depression. It then recommends personalized music to help improve your mood and well-being.</p>
        <p className={style.actionBtn}>Try it out</p>
      </div>
      
    </div>
  );
}

export default Hero1;
