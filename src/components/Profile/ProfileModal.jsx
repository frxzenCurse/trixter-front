import React from 'react'
import styles from './Profile.module.scss'
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { ReactComponent as Edit } from '../../assets/images/edit.svg'
import { ReactComponent as Ok } from '../../assets/images/ok.svg'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/modals/actionCreators'
import { Input } from 'antd';
import { setUser } from '../../store/auth/actionCreators'
import { updateUser, updateUserAvatar } from '../../api/user'

export const ProfileModal = () => {

  const { user } = useSelector(state => state.auth)
  const [status, setStatus] = useState(user.status)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  const updateStatus = async () => {
    setIsEditing(false)
    
    if (user.status !== status) {
      try {
        const newUser = {...user, status: status}
        const response = await updateUser(newUser)
        console.log(response)
        dispatch(setUser({...user, status: status}))
      } catch (e) {
        console.log(e)
      }
    }
  }

  const onChange = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    
    formData.append('file', file);

    try {
      const response = await updateUserAvatar(formData);
      console.log(response.data)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={() => dispatch(closeModal())}></div>
      <div className={styles.container}>
        <div className={styles.close} onClick={() => dispatch(closeModal())}>
          <Close />
        </div>
        <label className={styles.modalAvatar}>
          <input 
            type="file" 
            onChange={onChange} 
            className={styles.file} accept='.jpg,.jpeg,.webp,.png' 
          />
          <img 
            className={styles.img}
            src={user.avatarUrl ? require(`../../assets/user/${user.avatarUrl}`) : avatarPlaceholder} 
            alt="" 
          /> 
        </label>
        <div className={styles.modalUsername}>{user.username}</div>
        <div className={styles.item}>
          {isEditing
            ?
              <Input 
                type='text' 
                value={status} 
                onChange={e => setStatus(e.target.value)} 
              />
            :
            <div className={styles.status}>{status ? status : 'напишите что-то о себе'}</div>
          }
          <div className={styles.icons}>
            {isEditing
              ?
                <Ok onClick={updateStatus} />
              :
                <Edit onClick={() => setIsEditing(true)} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
