import React, { useEffect } from 'react'
import { Button, Layout } from 'antd';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Main.module.scss'
import { UserList } from '../UserList/UserList';
import { Chat } from '../Chat/Chat';
import { MessageArea } from '../MessageArea/MessageArea';
import { Client, Message } from '@stomp/stompjs';
import { useState } from 'react';
import { DOMAIN } from '../../api/service/endpoints';
import { getChats, saveChat } from '../../api/chat';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { setUser } from '../../store/auth/actionCreators';

const { Content, Sider } = Layout;

var client = null;
let isConnected = false
export const Main = () => {

  const [value, setValue] = useState('')
  const [activeChat, setActiveChat] = useState(null)
  const [chats, setChats] = useState([])
  
  const chatRef = useRef(null)

  const { user } = useSelector(state => state.auth)
  
  useEffect(() => {
    fetchChats(user.chatsId)
  }, [])

  useEffect(() => {
    if (activeChat) {

      chatRef.current.scrollTop = chatRef.current.scrollHeight

      if (!isConnected) {
        connect()
        isConnected = true
      }
    }
  }, [activeChat])

  const fetchChats = async (ids) => {
    try {
      const response = await getChats(ids);

      const chats = response.data.map(item => {
        if (item.name.match(user.username)) {
          const name = item.name.replace(user.username, '')
          return {
            ...item,
            name: name.trim()
          }
        }
        return item;
      })
      setChats(chats)
      setActiveChat(chats[0])
    } catch(e) {
      console.log(e)
    }
  }

  const connect = () => {
    client = new Client({
      brokerURL: `ws://localhost:8080/ws`,
      connectHeaders: {
        authorization: localStorage.getItem('jwt'),
      },
      debug: function (str) {
        console.log(str);
      },
    });
    client.onConnect = onConnected
    client.onStompError = onError
    client.activate()
  }
  const onConnected = () => {
    console.log("connected")
    chats.forEach(item => {
      client.subscribe(`/chatroom/${item.id}`, onMessageReceived)
    })
  }

  const onError = (frame) => {
    console.log(frame.headers);
  }

  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body)

    if (payloadData.chatId === activeChat.id) {
      setActiveChat(prev => {
        return { ...prev, messages: [...prev.messages, payloadData] }
      })
    } else {
      const updatedChats = [...chats].map(item => {
        if (item.id === payloadData.chatId) {
          return { ...item, messages: [...item.messages, payloadData] };
        }

        return item;
      })

      setChats(updatedChats)
    }
  }
  
  const sendMessage = () => {
    if (client && value) {

      const chatMessage = {
        body: value,
        sender: {
          id: user.id,
          username: user.username,
        },
        chatId: activeChat.id,
      }

      client.publish({
        destination: '/app/message',
        body: JSON.stringify(chatMessage),
      });
      setValue('')
    }
  }

  const onMemberClick = async (member) => {
    if (user.username === member.username) {
      return;
    }

    let tab = [...chats].find(item => item.name === member.username)

    if (!tab) {
      tab = {
        name: `${user.username} ${member.username}`,
        messages: [],
        membersId: [
          user.id,
          member.id
        ]
      }

      const response = await saveChat(tab)
      tab = response.data
      tab.name = tab.name.replace(user.username, '')
      tab.name = tab.name.trim()

      client.subscribe(`/chatroom/${tab.id}`, onMessageReceived)
      setChats([...chats, tab])
    }

    setActiveChat(tab)
  }

  const onTabClick = (tab) => {
    const clickedTab = [...chats].find(item => item.id === tab.key)

    setActiveChat(clickedTab)
  }

  return (
    <Layout hasSider className={styles.main} >
      {activeChat &&
        <Sidebar
          chats={chats}
          active={activeChat.id}
          onClick={onTabClick}
        />}
      <Layout>
        <Content className={styles.content}>
          {activeChat && <Chat data={activeChat.messages} user={user} node={chatRef} />}
          <MessageArea
            value={value}
            onChange={e => setValue(e.target.value)}
            onClick={sendMessage}
          />
        </Content>
      </Layout>
      <Sider>
        {activeChat && <UserList data={activeChat.members} onClick={onMemberClick} />}
      </Sider>
    </Layout>
  )
}
