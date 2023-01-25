import React from 'react'
import { Button, Input } from 'antd';
import styles from './MessageArea.module.scss'

export const MessageArea = ({value, onChange, onClick}) => {

  const onKeyDown = event => {
    if (event.code === 'Enter') {
      onClick()
    }
  }

  return (
    <div className={styles.container}>
      <Input.TextArea 
        className={styles.area}
        placeholder="Ваше сообщение"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className={styles.button}>
        <Button type="primary" htmlType="submit" onClick={onClick}>
          Submit
        </Button>
      </div>
    </div>
  )
}
