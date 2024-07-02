import React from 'react';
import styles from '../styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <p>© 2024 ChateeRidee. All rights reserved.</p>
          <p>
            <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-of-service">Terms of Service</Link>
          </p>
        </div>
        <div className={styles.social}>
          <Link href="https://t.me/+4b2MgnKBBwo5MmNi" target="_blank" rel="noopener noreferrer">
            <Image src="/icon-telegram.svg" alt="Telegram" width={24} height={24} />
          </Link>
          <Link href="https://www.instagram.com/chateeridee" target="_blank" rel="noopener noreferrer">
            <Image src="/icon-instagram.svg" alt="Instagram" width={24} height={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
