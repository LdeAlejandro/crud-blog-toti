"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { signOut, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Blog", url: "/blog" },
  { id: 3, title: "Dashboard", url: "/dashboard" },
  { id: 4, title: "Profile", url: "/dashboard/myprofile" },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={styles.container}>
     
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <div className={`${styles.links} ${menuOpen ? styles.active : ''}`}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
      </div>

      
      <div className={styles.rightSection}>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faMoon} className={styles.themeIcon} />
          ) : (
            <FontAwesomeIcon icon={faSun} className={styles.themeIcon} />
          )}
        </button>

        {status === 'authenticated' ? (
          <div className={styles.userSection}>
            <span className={styles.userName}>
              {session?.user?.name || 'Usuario'}
            </span>
            {session?.user?.image ? (
              <img src={session.user.image} alt="User Image" className={styles.userImage} />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} className={styles.defaultIcon} />
            )}
            <button className={styles.logout} onClick={signOut}>
              Logout
            </button>
          </div>
        ) : (
          <div className={styles.loginSection}>
            <Link href="/dashboard/login" className={styles.loginLink}>
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
