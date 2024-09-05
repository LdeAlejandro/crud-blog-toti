"use client"
import Link from 'next/link';
import React from 'react';
import styles from './navbar.module.css';
import { signOut, useSession } from 'next-auth/react';

//Equipe FrontEnd
const links = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 2,
      title: "Blog",
      url: "/blog",
    },
    {
      id: 3,
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      id: 4,
      title: "Profile",
      url: "/dashboard/myprofile",
    },
  ];

const Navbar = () => {

  const session = useSession();

  return (
    <div className={styles.container}>
          <div className={styles.links}>
       
        {links.map((link) => (
            <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
        ))}
        </div>
        {session.status ==="authenticated" &&
          <button className={styles.logout} onClick={signOut}>Logout</button>
        }
        
    </div>
  )
}

export default Navbar