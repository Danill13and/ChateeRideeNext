import React, { useState, useEffect } from 'react';
import styles from '../styles/basket.module.css';
import Image from 'next/image';
import { Order } from "./Order";
import Footer from '../components/footer';
import { useCookies } from 'react-cookie';
import { AuthModal } from "../pages/Auth";
import { Register } from "../pages/Reg";
import Link from 'next/link';

require('dotenv').config()


const Basket = () => {
  const [orderWin, setOrderWin] = useState(false);
  const [products, setProducts] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [cookies, setCookies] = useCookies(['user_token']);
  const apiKey = cookies.apiKey;
  const userToken = cookies.user_token;
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const url = process.env.url

  const openOrder = () => {
    setOrderWin(true);
  };
  const closeOrder = () => {
    setOrderWin(false);
  };

  const openRegWin = () => {
    setRegWin(true);
  };
  const closeRegWin = () => {
    setRegWin(false);
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleGet = () => {
    fetch(`https://chateerideeapi.onrender.com/getProductFromBasket`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      }
    }).then(Response => {
      return Response.json()
    }).then(data => {
      setProducts(data.prod);
      setBaskets(data.basket);
      calculateTotalPrice(data.prod, data.basket);
    })
  };

  const handlePlus = (id) => {
    fetch(`https://chateerideeapi.onrender.com/productPlus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      },
      body: JSON.stringify({ id: id })
    }).then(Response => {
      return Response.json()
    }).then(data => {
      handleGet();
    })
  };

  const logOut = () =>{
    setCookies('apiKey', null)
    location.reload()
  }

  const handleMinus = (id) => {
    fetch(`https://chateerideeapi.onrender.com/productMinus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      },
      body: JSON.stringify({ id: id })
    }).then(Response => {
      return Response.json()
    }).then(data => {
      handleGet();
    })
  };

  const handleDelete = (id) => {
    fetch(`https://chateerideeapi.onrender.com/deleteBasket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      },
      body: JSON.stringify({ id: id })
    }).then(Response => {
      return Response.json()
    }).then(data => {
      location.reload()
    })
  };

  const calculateTotalPrice = (products, baskets) => {
    let total = 0;
    products.forEach((product, index) => {
      const basket = baskets[index];
      total += product.price * basket.count;
    });
    setTotalPrice(total);
  };

  const checkOrders = () => {
    fetch(`https://chateerideeapi.onrender.com/checkOrder`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'user_token': userToken
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.error("Error while checking orders:", error);
    });
  };

  useEffect(() => {
    handleGet();
    checkOrders();
  }, []);

  if (!cookies.apiKey) {
    return (
      <>
        <Order isOpen={orderWin} onClose={closeOrder} />
        <header className={styles.header}>
          <Link className={styles.logo} href="/">
            <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={50} height={50} />
            <span className={styles.logoText}>Chatte Ridée</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/basket">Кошик</Link>
            <Link href="/category">Меню</Link>
            <p onClick={openRegWin} className={styles.clickable}>Зареєструватись</p>
            <Register isOpen={regWin} onClose={closeRegWin} />
            <p onClick={openAuthModal} className={styles.clickable}>Авторизуватись</p>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
          </nav>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>Ваш кошик</h1>
              <div className={styles.cart}>
                {products && products.map((product, index) => {
                  const basket = baskets[index];
                  return (
                    <div key={product.id} className={styles.cartItem}>
                      <div className={styles.image}>
                        <Image className={styles.del} src={`../${product.image}`} loader={() => `../${product.image}`} alt={product.name} width={100} height={100} />
                      </div>
                      <div className={styles.details}>
                        <h2 className={styles.name}>{product.name}</h2>
                        <p className={styles.price}>{product.price} UAH</p>
                      </div>
                      <div className={styles.quantity}>
                      <button className={styles.button} onClick={() => handleMinus(basket.id)}>-</button>
                        <input type="text" className={styles.input} value={basket.count} readOnly />
                        <button className={styles.button} onClick={() => handlePlus(basket.id)}>+</button>
                        <div className={styles.separator}></div> 
                        <button className={styles.deleteButton} onClick={() => handleDelete(basket.id)}>
                          <Image className={styles.del} src="/free-icon-delete-1214428.png" alt="Удалить" width={20} height={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <h2>Загальна вартість: {totalPrice} UAH</h2>
              </div>
              <button onClick={openOrder} className={styles.checkoutButton}>Замовити та сплатити</button>
            </main>
          </div>
        </div>
        <Footer />
      </>
    );
  } else if (cookies.apiKey === "071864cc-2d85-43f3-883c-55a05e36b820") {
    return (
      <>
        <Order isOpen={orderWin} onClose={closeOrder} />
        <header className={styles.header}>
        <Link className={styles.logo} href="/">
            <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={50} height={50} />
            <span className={styles.logoText}>Chatte Ridée</span>
          </Link>
          <input type="text" placeholder="Пошук" className={styles.search} />
          <nav className={styles.nav}>
            <Link href="/basket">Кошик</Link>
            <Link href="/category">Меню</Link>
            <Link className={styles.a} href="/Create_category">Админ</Link>
          </nav>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>Ваш кошик</h1>
              <div className={styles.cart}>
                <div>
                {products && products.map((product, index) => {
                  const basket = baskets[index];
                  return (
                    <div key={product.id} className={styles.cartItem}>
                      <div className={styles.image}>
                        <Image className={styles.del} src={`../${product.image}`} loader={() => `../${product.image}`} alt={product.name} width={100} height={100} />
                      </div>
                      <div className={styles.details}>
                        <h2 className={styles.name}>{product.name}</h2>
                        <p className={styles.price}>{product.price} UAH</p>
                      </div>
                      <div className={styles.quantity}>
                      <button className={styles.button} onClick={() => handleMinus(basket.id)}>-</button>
                        <input type="text" className={styles.input} value={basket.count} readOnly />
                        <button className={styles.button} onClick={() => handlePlus(basket.id)}>+</button>
                        <div className={styles.separator}></div> 
                        <button className={styles.deleteButton} onClick={() => handleDelete(basket.id)}>
                          <Image className={styles.del} src="/free-icon-delete-1214428.png" alt="Удалить" width={20} height={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                </div>
                <h2>Загальна вартість: {totalPrice} UAH</h2>
              </div>
              <button onClick={openOrder} className={styles.checkoutButton}>Замовити та сплатити</button>
            </main>
          </div>
        </div>
        <Footer />
      </>
    );
  } else if (cookies.apiKey) {
    return (
      <>
        <Order isOpen={orderWin} onClose={closeOrder} />
        <header className={styles.header}>
        <Link className={styles.logo} href="/">
            <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={50} height={50} />
            <span className={styles.logoText}>Chatte Ridée</span>
          </Link>
          <input type="text" placeholder="Пошук" className={styles.search} />
          <nav className={styles.nav}>
            <Link href="/basket">Кошик</Link>
            <Link href="/category">Меню</Link>
            <p onClick={logOut} className={styles.a}>Вихід</p>
          </nav>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>Ваш кошик</h1>
              <div className={styles.cart}>
                <div>
                {products && products.map((product, index) => {
                  const basket = baskets[index];
                  return (
                    <div key={product.id} className={styles.cartItem}>
                      <div className={styles.image}>
                        <Image className={styles.del} src={`../${product.image}`} loader={() => `../${product.image}`} alt={product.name} width={100} height={100} />
                      </div>
                      <div className={styles.details}>
                        <h2 className={styles.name}>{product.name}</h2>
                        <p className={styles.price}>{product.price} UAH</p>
                      </div>
                      <div className={styles.quantity}>
                      <button className={styles.button} onClick={() => handleMinus(basket.id)}>-</button>
                        <input type="text" className={styles.input} value={basket.count} readOnly />
                        <button className={styles.button} onClick={() => handlePlus(basket.id)}>+</button>
                        <div className={styles.separator}></div> 
                        <button className={styles.deleteButton} onClick={() => handleDelete(basket.id)}>
                          <Image className={styles.del} src="/free-icon-delete-1214428.png" alt="Удалить" width={20} height={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                </div>
                <h2>Загальна вартість: {totalPrice} UAH</h2>
              </div>
              <button onClick={openOrder} className={styles.checkoutButton}>Замовити та сплатити</button>
            </main>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default Basket;