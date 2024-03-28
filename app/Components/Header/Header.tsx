"use client"
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Dropdown, Space, Menu } from 'antd';
import { LeftOutlined,DownOutlined } from '@ant-design/icons';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { useRouter,usePathname } from 'next/navigation';
import { CountryLists } from '@/app/Data/data';
const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
      setIsMobile(window.innerWidth <= 768);
    

  }, []);

  const handleBack = () => {
    router.back();
  };

  const items = [
    { key: '1', label: 'Summer Trips', href: '/vacation/list/Summer' },
    { key: '2', label: 'Winter Trips', href: '/vacation/list/Winter' },
    { key: '3', label: 'Easter Trips', href: '/vacation/list/Easter' },
    { key: '4', label: 'Spring Trips', href: '/vacation/list/Spring' },
  ];

  const menuItems = items.map(item => (
    <Menu.Item key={item.key}>
      <Link href={item.href}>{item.label}</Link>
    </Menu.Item>
  ));

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {pathname !== '/' && <LeftOutlined onClick={handleBack} />}
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
            <Link href='/about' className={styles.menuItemText}>About us</Link>
          </div>
          <div className={styles.menuItem}>
            <Dropdown
              overlay={
                <Menu>
                  {CountryLists.map((country) =>
                      <Menu.Item key={country} style={{ padding: '8px', width: '200px' }}>
                        <Link href={`/vacation/${country}`}>{country}</Link>
                      </Menu.Item>
                    
                  )}
                </Menu>
              }
              trigger={['click']}
            >
              <a onClick={(e) => e.stopPropagation()}>
                <Space>
                  <div>
                    Countries
                    <DownOutlined />
                  </div>

                </Space>
              </a>
            </Dropdown>
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
