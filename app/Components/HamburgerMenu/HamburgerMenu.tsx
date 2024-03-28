import { useState } from 'react';
import { Button, Drawer, Menu, Dropdown, Space } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CountryLists } from '@/app/Data/data';
import React from 'react';

export interface MenuItem {
  key: string;
  label: JSX.Element;
}

const items: MenuItem[] = [
  {
    key: '1',
    label: (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="0" style={{ padding: '15px', width: '200px' }}>
              <Link href="/vacation/list/summer">Summer Vacations</Link>
            </Menu.Item>
            <Menu.Item key="1" style={{ padding: '15px', width: '200px' }}>
              <Link href="/vacation/list/winter">Winter Vacations</Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ padding: '15px', width: '200px' }}>
              <Link href="/vacation/list/easter">Easter Vacations</Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ padding: '15px', width: '200px' }}>
              <Link href="/vacation/list/Spring">Spring Vacations</Link>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <a onClick={(e) => e.stopPropagation()}>
          <Space>
            Vacation Seasons
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    ),
  },
  {
    key: '2',
    label: (
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
            Countries
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    ),
  },
  {
    key: '121',
    label: (
      <Link href="/ai">Travel AI</Link>
    )
  },
  {
    key: '125',
    label: (
      <Link href="/about">About Us</Link>
    )
  }
];

const HamburgerMenu: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleSubMenuItemClick = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Button onClick={handleMenuClick} icon={<MenuOutlined />} />
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={handleDrawerClose}
        visible={drawerVisible}
        closeIcon
      >
        <Menu>
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <div onClick={handleSubMenuItemClick}>{item.label}</div> {/* Added onClick to each menu item */}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
