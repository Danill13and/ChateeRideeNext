"use client"

import { useState } from 'react';
import styles from '../styles/create_category.module.css';
import Image from "next/image";
import Link from 'next/link';

require('dotenv').config()

export default function Auth() {

  const url = process.env.url
  const [name, setname] = useState("")

  const handleChange = (e) => {
    const inputValue = e.target.value
    setname(inputValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`https://chateerideeapi.onrender.com/createCategory`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.divLogo}>
          <Image
            src="/icons8-croissant-96 1.png"
            width={50}
            height={50}
            alt=""/>
          <Link className={styles.logoName} href="/">
            СhatteRidée
          </Link>
        </div>
        <div className={styles.headerButtons}>
          <Link className={styles.a}  href="/Basket">
            Кошик
          </Link>
          <Link className={styles.a}  href="/category">
            Меню
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <h1>Створити категорію</h1>
          <hr className={styles.hr_line}/>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" id="firstName" placeholder="Назва категорії:" value={name.name} onChange={handleChange} className={styles.input}/>
            <button type="submit" className={styles.button}>Створити</button>
          </form>
        </div>
      </div>
    </div>
  );
}