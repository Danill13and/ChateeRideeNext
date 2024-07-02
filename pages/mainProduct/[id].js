"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/mainProduct.module.css'; 
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import {AuthModal} from "../../pages/Auth"
import {Register} from "../../pages/Reg"
import Link from 'next/link';
import stylesFooter from './footer.module.css';
require('dotenv').config()

const MainProduct = () => {
  const url = process.env.url;
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(' ');
  const [name, setName] = useState(' ');
  const [price, setPrice] = useState(' ');
  const [ingredients, setIngredients] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [showAlert, setShowAlert] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [cookies, setCookies] = useCookies(['user_token']);
  
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin] = useState(false);

  useEffect(() => {
    if (router.asPath !== router.route && !product) {
      fetch(`https://chateerideeapi.onrender.com/mainProduct/${id}`, {
        method: "GET",
      })
      .then(response => response.json())
      .then(data => {
        setImage(data.image);
        setName(data.name);
        setPrice(data.price);
        setIngredients(data.ingredients);
        setDescription(data.description);
        setProduct(data);
      });
    }
  }, [router, id, product]);

  const handleAddToBasket = () => {
    fetch(`https://chateerideeapi.onrender.com/addToBasket/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': cookies.apiKey,
        'user_token': cookies.user_token
      }
    })
    .then(response => response.json())
    .then(data => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const logOut = () =>{
    setCookies('apiKey', null)
    location.reload()
  }

  const truncateText = (text, limit, showMoreHandler) => {
    if (text.length > limit) {
      return (
        <>
          {text.substring(0, limit)}...
          <br />
          <button className={styles.showMoreButton} onClick={showMoreHandler}>↓ Детальніше ↓</button>
        </>
      );
    }
    return text;
  };
  if(!cookies.apiKey){
    return (
      <>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Image
              src="/icons8-croissant-96 1.png"
              width={50}
              height={50}
              alt="Picture of the author"
            />
            <Link className={styles.h1} href="/">
              <h1 className={styles.h1}>СhatteRidée</h1>
            </Link>
          </div>
          <div className={styles.headerRight}>
            <Link href="/basket" className={styles.headerLink}>Кошик</Link>
            <Link href="/category" className={styles.headerLink}>Меню</Link>
            <p onClick={() => setRegWin(true)} className={`${styles.headerLink} ${styles.clickable}`}>Зареєструватись</p>
            <Register isOpen={regWin} onClose={() => setRegWin(false)} />
            <p onClick={() => setAuthModalOpen(true)} className={`${styles.headerLink} ${styles.clickable}`}>Авторизуватись</p>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
          </div>
        </header>
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <h2 className={styles.h2}>{name}</h2>
            <Image className={styles.image} src={`../../${image}`} loader={() => `../../${image}`} alt="Фото круасану" width={354} height={256} />
            <p className={styles.price}>{price} грн.</p>
            <div className={styles.separator}></div>
            <p className={styles.ingredients}>{truncateText(ingredients, 50, () => setShowIngredients(true))}</p>
            <div className={styles.separator}></div> 
            <p className={styles.description}>{truncateText(description, 60, () => setShowDescription(true))}</p>
            <button className={styles.button} onClick={handleAddToBasket}>Додати до Кошику</button>
          </div>
        </div>
  
        <div className={`${styles.overlay} ${showAlert ? styles.show : ''}`} onClick={() => setShowAlert(false)}>
          <div className={`${styles.popup} ${showAlert ? styles.show : ''}`}>
            Товар додано до кошику
          </div>
        </div>
  
        <div className={`${styles.overlay} ${showIngredients ? styles.show : ''}`} onClick={() => setShowIngredients(false)}>
          <div className={`${styles.popup} ${showIngredients ? styles.show : ''}`}>
            <h3>Інгредієнти</h3>
            <p>{ingredients}</p>
          </div>
        </div>
  
        <div className={`${styles.overlay} ${showDescription ? styles.show : ''}`} onClick={() => setShowDescription(false)}>
          <div className={`${styles.popup} ${showDescription ? styles.show : ''}`}>
            <h3>Опис</h3>
            <p>{description}</p>
          </div>
        </div>
        <footer className={stylesFooter.footer}>
          <div className={stylesFooter.container}>
            <div className={stylesFooter.info}>
              <p>© 2024 ChateeRidee. All rights reserved.</p>
              <p>
                <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-of-service">Terms of Service</Link>
              </p>
            </div>
            <div className={stylesFooter.social}>
              <Link href="https://t.me/+4b2MgnKBBwo5MmNi" target="_blank" rel="noopener noreferrer">
                <Image src="/icon-telegram.svg" alt="Telegram" width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/chateeridee" target="_blank" rel="noopener noreferrer">
                <Image src="/icon-instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
            </div>
          </div>
        </footer>
      </>
    );
  }
  else if(cookies.apiKey){
    return (
      <>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Image
              src="/icons8-croissant-96 1.png"
              width={50}
              height={50}
              alt="Picture of the author"
            />
            <Link className={styles.h1} href="/">
              <h1 className={styles.h1}>СhatteRidée</h1>
            </Link>
          </div>
          <div className={styles.headerRight}>
            <Link href="/basket" className={styles.headerLink}>Кошик</Link>
            <Link href="/category" className={styles.headerLink}>Меню</Link>
            <p onClick={logOut} className={styles.headerLink}>Вихід</p>
          </div>
        </header>
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <h2 className={styles.h2}>{name}</h2>
            <Image className={styles.image} src={`../../${image}`} loader={() => `../../${image}`} alt="Фото круасану" width={354} height={256} />
            <p className={styles.price}>{price} грн.</p>
            <div className={styles.separator}></div>
            <p className={styles.ingredients}>{truncateText(ingredients, 50, () => setShowIngredients(true))}</p>
            <div className={styles.separator}></div> 
            <p className={styles.description}>{truncateText(description, 60, () => setShowDescription(true))}</p>
            <button className={styles.button} onClick={handleAddToBasket}>Додати до Кошику</button>
          </div>
        </div>
  
        <div className={`${styles.overlay} ${showAlert ? styles.show : ''}`} onClick={() => setShowAlert(false)}>
          <div className={`${styles.popup} ${showAlert ? styles.show : ''}`}>
            Товар додано до кошику
          </div>
        </div>
  
        <div className={`${styles.overlay} ${showIngredients ? styles.show : ''}`} onClick={() => setShowIngredients(false)}>
          <div className={`${styles.popup} ${showIngredients ? styles.show : ''}`}>
            <h3>Інгредієнти</h3>
            <p>{ingredients}</p>
          </div>
        </div>
  
        <div className={`${styles.overlay} ${showDescription ? styles.show : ''}`} onClick={() => setShowDescription(false)}>
          <div className={`${styles.popup} ${showDescription ? styles.show : ''}`}>
            <h3>Опис</h3>
            <p>{description}</p>
          </div>
        </div>
        <footer className={stylesFooter.footer}>
          <div className={stylesFooter.container}>
            <div className={stylesFooter.info}>
              <p>© 2024 ChateeRidee. All rights reserved.</p>
              <p>
                <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-of-service">Terms of Service</Link>
              </p>
            </div>
            <div className={stylesFooter.social}>
              <Link href="https://t.me/+4b2MgnKBBwo5MmNi" target="_blank" rel="noopener noreferrer">
                <Image src="/icon-telegram.svg" alt="Telegram" width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/chateeridee" target="_blank" rel="noopener noreferrer">
                <Image src="/icon-instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
            </div>
          </div>
        </footer>
      </>
    );
  }
  
};

export default MainProduct;
