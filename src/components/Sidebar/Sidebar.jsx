import React from 'react'
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Sidebar.module.scss'
import { Profile } from '../Profile/Profile';

const { Sider } = Layout;

export const Sidebar = ({chats, active, onClick}) => {

  const [items, setItems] = useState([])

  useEffect(() => {
    const arr = [...chats].map(chat => {
      return {label: chat.name, key: chat.id ? chat.id : chat.name}
    })

    setItems(arr)
  }, [chats])

  // const onClick = (item) => {
  //   console.log(item);
  // }

  return (
    <Sider>
      <div className={styles.container}>
        {items.length &&
          <Menu 
            theme="dark" 
            mode="inline" 
            items={items} 
            selectedKeys={[active]}
            onClick={onClick}
          />}
        <Profile />
      </div>
    </Sider>
  )
}
