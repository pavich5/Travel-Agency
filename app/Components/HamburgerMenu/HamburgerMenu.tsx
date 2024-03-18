import { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export interface MenuItem {
  key: string;
  label: JSX.Element;
}

interface HamburgerMenuProps {
  items: MenuItem[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ items }) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key} onClick={handleDrawerClose}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Button onClick={handleMenuClick} icon={<MenuOutlined />} />
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={handleDrawerClose}
        visible={drawerVisible}
      >
        {menu}
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
