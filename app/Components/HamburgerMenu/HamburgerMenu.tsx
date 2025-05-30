"use client"
import { useState } from "react";
import { Button, Drawer, Menu, Dropdown, Space } from "antd";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { CountryLists } from "@/app/mocks/data";
import React from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import "./HamburgerMenu.css";
import { useRouter } from "next/navigation";
export interface MenuItem {
  key: string;
  label: JSX.Element;
}


const HamburgerMenu: React.FC = () => {
  const router = useRouter()
  const {user} = useUser()
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const items: MenuItem[] = [
    {
      key: "1",
      label: (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0" style={{ padding: "15px", width: "200px" }}>
                <Link href="/vacation/list/summer">Summer Vacations</Link>
              </Menu.Item>
              <Menu.Item key="1" style={{ padding: "15px", width: "200px" }}>
                <Link href="/vacation/list/winter">Winter Vacations</Link>
              </Menu.Item>
              <Menu.Item key="2" style={{ padding: "15px", width: "200px" }}>
                <Link href="/vacation/list/easter">Easter Vacations</Link>
              </Menu.Item>
              <Menu.Item key="3" style={{ padding: "15px", width: "200px" }}>
                <Link href="/vacation/list/Spring">Spring Vacations</Link>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
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
      key: "2",
      label: (
        <Dropdown
          overlay={
            <Menu>
              {CountryLists.map((country) => (
                <Menu.Item
                  key={country}
                  style={{ padding: "8px", width: "200px" }}
                >
                  <Link href={`/vacation/${country}`}>{country}</Link>
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={["click"]}
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
      key: "121",
      label: <Link href="/ai">Travel AI</Link>,
    },
    {
      key: "125",
      label: <Link href="/about">About Us</Link>,
    },
    {
      key: "123331",
      label: (
        <>
          <SignedIn>
            <div
              onClick={() => {
                router.push(`/user/${user?.id}`);
              }}
            >
              <p>My Profile</p>
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">Login</Link>
          </SignedOut>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={handleMenuClick}
        icon={<MenuOutlined />}
        className="hamburgerMenu"
      />
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={handleDrawerClose}
        open={drawerVisible}
        width={300}
        bodyStyle={{
          backgroundColor: "#ffffff",
          borderRight: "1px solid #f0f0f0",
        }}
        style={{ borderTop: "1px solid #f0f0f0" }}
      >
        <Menu
          mode="inline"
          style={{ backgroundColor: "#ffffff", border: "none" }}
          onClick={handleDrawerClose}
        >
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              style={{
                padding: "23px 27px",
                borderBottom: "1px solid #f0f0f0",
                boxShadow:
                  "box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px, rgba(0, 0, 0, 0.2) 0px 2px 2px, rgba(0, 0, 0, 0.2) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;",
              }}
            >
              <div
                style={{ color: "black", fontSize: "16px", cursor: "pointer" }}
              >
                {item.label}
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
