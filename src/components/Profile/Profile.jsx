import React from 'react'
import styles from './Profile.module.scss'
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/modals/actionCreators'

export const Profile = () => {

  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  return (
    <div className={styles.profile} onClick={() => dispatch(openModal())}>
      <div className={styles.avatar}>
        <img 
          className={styles.img}
          src={user.avatarUrl ? require(`../../assets/user/${user.avatarUrl}`) : avatarPlaceholder} 
          alt=""
        />
      </div>
      <div className={styles.username}>{user.username}</div>
    </div>
  )
}
