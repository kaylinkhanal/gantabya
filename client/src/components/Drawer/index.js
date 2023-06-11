import React, { useState } from 'react';
import { Button, Drawer,Dropdown, Menu } from 'antd';
import { MenuOutlined, UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import navItems from '../../config/navItems.json'
import { Avatar, List } from 'antd';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const CustomDrawer = (props) => {
  const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
      }
      const {role, id} =useSelector(state=> state.user)
  const [open, setOpen] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const menu = (
    <Menu>
        <Menu.Item key="changePassword" icon={<LockOutlined />}>
          Change Password
        </Menu.Item>
        <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    );

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        title="Chose Your Gantabya"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={300}
        headerStyle={{ background: '#f0f2f5', padding: '1px',textAlign:'center' }}
        footerStyle={{ textAlign: 'center' }}
        footer={
          <header className="navbar">
      {/* Your other navbar contents */}
                  
      <div className="navbar-center"  >
        <Dropdown overlay={menu} placement="bottomRight">
            <Image src={'http://localhost:4000/avatar/'+id} width={100} height={100} alt="avatar"/>
          {/* <Button shape="circle" size='large' icon={<UserOutlined />} /> */}
        </Dropdown>
        Hello <b>{role} </b>
      </div>
    </header>
        }
      >

<List
    itemLayout="horizontal"
    dataSource={navItems[role].navItem}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<Link href={item.link}>{item.label}</Link>}
        />
      </List.Item>
    )}
  />
      
      </Drawer>
    </>
  );
};

export default CustomDrawer;
