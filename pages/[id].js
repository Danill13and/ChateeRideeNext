"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/main.module.css';
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from '../components/footer';
import {AuthModal} from "../pages/Auth"
import {Register} from "../pages/Reg"
import { format } from 'react-string-format';
import { useCookies } from 'react-cookie'
import Link from 'next/link';

require('dotenv').config()

export default function Main() {
  const url = process.env.url

  const [products, setProducts] = useState([]);

  const router = useRouter()
  const {id} = router.query
  
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin]=useState(false)

  const [cookies, setCookies] = useCookies(['user_token'])
  
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

  const handleGet = (e) => {
    fetch(`https://chateerideeapi.onrender.com/getProduct/${id}`, {
      method:"GET",
    }) .then(Response =>{
      return Response.json()
    })
    .then(data=>{
        setProducts(data)
    })

  };

  useEffect(() => {
    
    handleGet()
    
  })
  if(!cookies.apiKey){
  return (
    <main  className={styles.main}>
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
            <Link className={styles.headerA}  href="/basket">
              Кошик
            </Link>
            <Link className={styles.headerA}  href="/category">
              Меню
            </Link>
            <p onClick={openRegWin} className={styles.headerA}>Зареєструватись</p>
            <p onClick={openAuthModal} className={styles.headerA}>Авторизуватись</p>
          </div>
      </div>
      <div className={styles.container}>
      {
        products.map((product, index)=>{
        return(
            <div key={index} className={styles.prods} >
              <Link className={styles.a} href={format("/mainProduct/{0}",product.id)}>
                <div className={styles.prod} >
                  <Image  src={`${product.image}`} loader={()=>product.image} alt="Chatte Ridée" width={190} height={190} />
                  <div className={styles.info} >
                    <h1  className={styles.name}> {product.name}</h1>
                    <div className={styles.separator}></div>
                    <p className={styles.infoT}>{product.price}грн</p>
                    <input type="submit" className={styles.button} value='Докладніше'/>
                  </div>
                </div>
              </Link>
            </div>
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
      <main  className={styles.main}>
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
            <Link className={styles.headerA}  href="/basket">
              Кошик
            </Link>
            <Link className={styles.headerA}  href="/category">
              Меню
            </Link>
            <Link className={styles.headerA}  href="/Admin">
              Адмін
            </Link>
          </div>
      </div>
      <div className={styles.container}>
        {
          products.map((product, index)=>{
          return(
              <div key={index} className={styles.prods} >
                  <Link className={styles.a} href={format("/mainProduct/{0}",product.id)}>
                    <div className={styles.prod} >
                      <Image className={styles.img} src={`${product.image}`} loader={()=>product.image} alt="Chatte Ridée" width={190} height={190} />
                        <div className={styles.info} >
                          <h1  className={styles.name}> {product.name}</h1>
                          <div className={styles.separator}></div>
                          <p className={styles.infoT}>{product.price} грн</p>
                          <input type="submit" className={styles.button} value='Докладніше'/>
                        </div>
                      </div>
                  </Link>
              </div>
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
      <main  className={styles.main}>
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
            <Link className={styles.headerA}  href="/basket">
              Кошик
            </Link>
            <Link className={styles.headerA}  href="/category">
              Меню
            </Link>
            <p onClick={logOut} className={styles.headerA}>Вихід</p>
          </div>
      </div>
        <div className={styles.container}>
        {
          products.map((product, index)=>{
          return(
              <div key={index} className={styles.prods} >
                  <Link className={styles.a} href={format("/mainProduct/{0}",product.id)}>
                    <div className={styles.prod} >
                      <Image className={styles.img} src={`${product.image}`} loader={()=>product.image} alt="Chatte Ridée" width={190} height={190} />
                        <div className={styles.info} >
                          <h1  className={styles.name}> {product.name}</h1>
                          <div className={styles.separator}></div>
                          <p className={styles.infoT}>{product.price} грн</p>
                          <input type="submit" className={styles.button} value='Докладніше'/>
                        </div>
                      </div>
                  </Link>
              </div>
              )
            })
          }
          
        </div>
        <Footer />
      </main>
    );
  }
}
