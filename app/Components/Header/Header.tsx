"use client"
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Dropdown, Space, Menu } from 'antd'; 
import { LeftOutlined } from '@ant-design/icons';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { useRouter } from 'next/navigation'; // Corrected import

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBack = () => {
    router.back();
  };

  // Define items for the dropdown menu
  const items = [
    { key: '1', label: 'Item 1', href: '/item1' },
    { key: '2', label: 'Item 2', href: '/item2' },
    { key: '3', label: 'Item 3', href: '/item3' },
  ];

  // Generate menu items
  const menuItems = items.map(item => (
    <Menu.Item key={item.key}>
      <Link href={item.href}>{item.label}</Link>
    </Menu.Item>
  ));

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <LeftOutlined onClick={handleBack} />
        <img src="https://images-platform.99static.com/zudNWGHtYiWa-sqd5jqXyVt6wBE=/0x0:1773x1773/500x500/top/smart/99designs-contests-attachments/133/133463/attachment_133463156" alt="Logo" />
        <Link href='/' className={styles.logoText}>Globetrotter</Link>
      </div>
      {isMobile ? (
        <HamburgerMenu />
      ) : (
        <div className={styles.navMenu}>
          <div className={styles.menuItem}>
            <Dropdown overlay={<Menu>{menuItems}</Menu>}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Trips
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className={styles.menuItem}>
            <Link href='/ai' className={styles.menuItemText}>Travel AI</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href='/vacation/search' className={styles.menuItemText}>Destinations</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href='/help' className={styles.menuItemText}>Help</Link>
          </div>
          <div className={styles.menuItem} style={{ marginLeft: '0px' }}>
            <SignedIn>
              <UserButton afterSignOutUrl='/' showName />
            </SignedIn>
            <SignedOut>
              <Link href='sign-in' className={styles.menuItemText}>Login</Link>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
