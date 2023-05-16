import { Button, Drawer, Radio, Space } from 'antd';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import navItems from '../../config/navItems.json'

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
        {role}
            {JSON.stringify(navItems[role])}
      </Space>
      <Drawer
        title="Menu"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default CutomDrawer;