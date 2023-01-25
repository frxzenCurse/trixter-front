import React from 'react'
import styles from './Chat.module.scss'
import classNames from 'classnames'
import { useEffect } from 'react'
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

export const Chat = ({data, user, node}) => {

  useEffect(() => {
    node.current.scrollTop = node.current.scrollHeight
  }, [])

  return (
    <div className={styles.container}>
      <ul className={styles.list} ref={node}>
        {data.map(message =>
          <li className={styles.item} key={message.id} >
            <div 
              className={classNames(
                styles.message,
                user.id === message.sender.id ? styles.owner : null
              )}
            >
              <div className={styles.avatar}>
                <img className={styles.img} src={avatarPlaceholder} alt="" />
              </div>
              <div className={styles.body}>
                <div className={styles.top}>{message.sender.username}</div>
                <div className={styles.wrapper}>
                  <p className={styles.text}>{message.body}</p>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
