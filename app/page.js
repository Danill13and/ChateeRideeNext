"use client"

import Image from "next/image";
import styles from "./page.module.css";
import {AuthModal} from "../pages/Auth"
import Footer from '../components/footer';
import {Register} from "../pages/Reg"
import { useState, useEffect  } from 'react';
const { v4: uuidv4 } = require('uuid');
import { useCookies } from 'react-cookie'
import Router from "next/router";
import Link from 'next/link';

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin]=useState(false)
  const [cookies, setCookies] = useCookies(['user_token'])
  const [status, setStatus] = useState()

  const openRegWin =()=>{
    setRegWin(true)
  }
  const closeRegWin =()=>{
    setRegWin(false)
  }

  function setToken(){
    setCookies('user_token', uuidv4())
  }
  
  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };
  const logOut = () =>{
    setCookies('apiKey', null)
    location.reload()
  }

  useEffect(() => {
    if(!cookies.user_token){
      setToken()
    }
  })
  if(!cookies.apiKey){
    return (
      <main className={styles.main}>
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
            <Register isOpen={regWin} onClose={closeRegWin} />
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
            <Link className={styles.a} href="/basket">
              Кошик
            </Link>
            <Link className={styles.a}  href="/category">
              Меню
            </Link>
            
            <p onClick={openRegWin} className={styles.a}>Зареєструватись</p>
            <p onClick={openAuthModal} className={styles.a}>Авторизуватись</p>

          </div>
        </div>
        <div className={styles.conteiner}>
          <h1 className={styles.wellcome}>
            Вітаємо вас!
          </h1>
          <hr className={styles.hr_line}/>
          <h3>
            Смачного!
          </h3>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.mainText}>
          Ласкаво просимо до «СhatteRidée», унікального французького ресторану, де кулінарна елегантність поєднується з теплою атмосферою. Наше різноманітне меню, приготоване зі свіжих високоякісних продуктів, пропонує вишукані страви, які задовольнять найвибагливіші смаки. Приходьте та насолодіться незабутніми гастрономічними враженнями у комфортній та вишуканій обстановці.
          </p>
        </div>
        <div>
        <Footer />
        </div>
      </main>
    );
  }
  else if (cookies.apiKey == "071864cc-2d85-43f3-883c-55a05e36b820"){
    return (
      <main className={styles.main}>
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
            <Link className={styles.a}  href="/basket">
              Кошик
            </Link>
            <Link className={styles.a}  href="/category">
              Меню
            </Link>
            <Link className={styles.a} href="/Create_category">Админ</Link>
          <div>
          </div>
          </div>
        </div>
        <div className={styles.conteiner}>
          <h1 className={styles.wellcome}>
            Вітаємо вас!
          </h1>
          <hr className={styles.hr_line}/>
          <h3 className={styles.underWellcome}>
            Смачного!
          </h3>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.mainText}>
          Ласкаво просимо до «СhatteRidée», унікального французького ресторану, де кулінарна елегантність поєднується з теплою атмосферою. Наше різноманітне меню, приготоване зі свіжих високоякісних продуктів, пропонує вишукані страви, які задовольнять найвибагливіші смаки. Приходьте та насолодіться незабутніми гастрономічними враженнями у комфортній та вишуканій обстановці.
          </p>
        </div>
        <Footer />
      </main>
    );
  }
  else if(cookies.apiKey){
    return (
      <main className={styles.main}>
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
            <Link className={styles.a}  href="/basket">
              Кошик
            </Link>
            <Link className={styles.a}  href="/category">
              Меню
            </Link>
            <p className={styles.a} onClick={logOut}>Вихід</p>
          <div>
          </div>
          </div>
        </div>
        <div className={styles.conteiner}>
          <h1 className={styles.wellcome}>
            Вітаємо вас!
          </h1>
          <hr className={styles.hr_line}/>
          <h3 className={styles.underWellcome}>
            Смачного!
          </h3>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.mainText}>
          Ласкаво просимо до «СhatteRidée», унікального французького ресторану, де кулінарна елегантність поєднується з теплою атмосферою. Наше різноманітне меню, приготоване зі свіжих високоякісних продуктів, пропонує вишукані страви, які задовольнять найвибагливіші смаки. Приходьте та насолодіться незабутніми гастрономічними враженнями у комфортній та вишуканій обстановці.
          </p>
        </div>
        <Footer />
      </main>
    );
  }
  
}
