import { Avatar, List } from 'antd';
import React from 'react';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

export const UserList = ({data, onClick}) => {
  function contextMenu(event) {
    event.preventDefault()

    console.log(123);
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item className="user-item">
          <List.Item.Meta
            onContextMenu={contextMenu}
            avatar={<Avatar src={avatarPlaceholder} />}
            title={item.username}
            description="online"
            onClick={() => onClick(item)}
          />
        </List.Item>
      )}
    />
  )
}
