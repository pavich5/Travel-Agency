import { useState } from 'react';
import { Button, Drawer, Menu, Dropdown, Space } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { vacationsCategories } from '@/app/Data/data';
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
            <Menu.Item key="0" style={{padding: '15px', width: '200px'}}>
              <Link href="/vacation/list/summer">Summer Vaications</Link>
            </Menu.Item>
            <Menu.Item key="1" style={{padding: '15px', width: '200px'}}>
              <Link href="/vacation/list/winter">Winter Vaications</Link>
            </Menu.Item >
            <Menu.Item key="2" style={{padding: '15px', width: '200px'}}>
              <Link href="/vacation/list/easter">Easter Vaications</Link>
            </Menu.Item>
            <Menu.Item key="3" style={{padding: '15px', width: '200px'}}>
              <Link href="/vacation/list/Spring">Spring Vaications</Link>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Vaication Seasons
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
            {vacationsCategories.categories.map((category) => category.countrys.map((country) => (
              <Menu.Item  key={country.countryName} style={{padding: '8px', width: '200px'}}>
                <Link href={`/vacation/${country.countryName}`}>{country.countryName}</Link>
              </Menu.Item>
            )))}
          </Menu>
        }
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Contrys
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    ),
  },
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
        closable={false}
        onClose={handleDrawerClose}
        open={drawerVisible}
        closeIcon
      >
        <Menu>
          {items.map((item) => (
            <Menu.Item key={item.key}>
              {React.cloneElement(item.label, {
                overlay: React.cloneElement(item.label.props.overlay, {
                  onClick: handleSubMenuItemClick,
                }),
              })}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
