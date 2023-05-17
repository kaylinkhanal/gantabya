import { Button, Drawer, Radio, Space } from 'antd';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import navItems from '../../config/navItems.json'
import Link from 'next/link'
const CutomDrawer = () => {
  const [open, setOpen] = useState(false);
  const {role} =useSelector(state=> state.user)
  const [placement, setPlacement] = useState('right');
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      
          
      </Space>
      <Drawer
        title="Menu"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
      >
            {navItems[role].navItem.map((item)=>{
              return(<Link href={item.link}>{item.label}</Link>)
            })}
       
       
      </Drawer>
    </>
  );
};
export default CutomDrawer;