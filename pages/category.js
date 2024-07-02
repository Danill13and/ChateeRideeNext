"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/category.module.css';
import Image from "next/image";
import { format } from 'react-string-format';
import Footer from '../components/footer';
import { useCookies } from 'react-cookie'
import {AuthModal} from "./Auth"
import {Register} from "./Reg"
import Link from 'next/link';

export default function Category() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin]=useState(false)
  const [categorys, setCategory] = useState([]);
  const [cookies, setCookies] = useCookies(['user_token'])
  
  const handleGet = (e) => {
    fetch(`https://chateerideeapi.onrender.com/AllCategory`, {
      method:"GET",
    }) .then(Response =>{
      return Response.json()
    })
    .then(data=>{
      setCategory(data)
    })

  };
  
  const openRegWin =()=>{
    setRegWin(true)
  }
  const closeRegWin =()=>{
    setRegWin(false)
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
    
    handleGet()
    
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
            <Link className={styles.a}  href="/basket">
              Кошик
            </Link>
            <Link className={styles.a}  href="/category">
              Меню
            </Link>
            
            <p onClick={openRegWin} className={styles.a}>Зареєструватись</p>
            <Register isOpen={regWin} onClose={closeRegWin} />
            <p onClick={openAuthModal} className={styles.a}>Авторизуватись</p>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

          </div>
        </div>
        <div className={styles.conteiner}>
      {
        categorys.map((category, index)=>{
      
        return(
            <Link key={index} className={styles.name} href={format("/{0}",category.id)}>
              <div className={styles.prods} >
                <Image src={`${category.image}`}  className={styles.image} loader={()=>category.image} alt="Chatte Ridée" width={120} height={120} />
                <h2 className={styles.h1}>{category.name}</h2>
                <input type="submit" className={styles.button} value='Перглянути'/>
              </div>
            </Link>
            )
            })
        }
      </div>
      <Footer />
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
            
            <Link className={styles.a}  href="/Admin">
              Адмін
            </Link>

          </div>
        </div>
        <div className={styles.conteiner}>
      {
        categorys.map((category, index)=>{
      
        return(
            <Link key={index} className={styles.name} href={format("/{0}",category.id)}>
              <div className={styles.prods} >
                <Image src={`${category.image}`} className={styles.image} loader={()=>category.image} alt="Chatte Ridée" width={160} height={160} />
                <h1>{category.name}</h1>
                <input type="submit" className={styles.button} value='Перглянути'/>
              </div>
            </Link>
            )
            })
        }
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
            
            <Link onClick={logOut} className={styles.a}>Вихід</Link>

          </div>
        </div>
        <div className={styles.conteiner}>
      {
        categorys.map((category, index)=>{
      
        return(
            <Link key={index} className={styles.name} href={format("/{0}",category.id)}>
              <div className={styles.prods} >
                <Image src={`${category.image}`} className={styles.image} loader={()=>category.image} alt="Chatte Ridée" width={160} height={160} />
                <h1>{category.name}</h1>
                <input type="submit" className={styles.button} value='Переглянути'/>
              </div>
            </Link>
            )
            })
        }
      </div>
      <Footer />
      </main>
    );
  }
}