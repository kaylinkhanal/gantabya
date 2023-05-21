import React, { useState } from 'react';
import { Button, Drawer,Dropdown, Menu } from 'antd';
import { MenuOutlined, UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import navItems from '../../config/navItems.json'
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
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
      </div>
    </header>
        }
      >
        {/* Drawer content */}
            {navItems[role].navItem.map((item)=>{
              return(<Link href={item.link}>{item.label}</Link>)
            })}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
