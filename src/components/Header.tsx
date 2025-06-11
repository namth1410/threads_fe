import React from 'react';
import { Layout, Menu, Dropdown, Button, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axios';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      message.success('Đăng xuất thành công!');
      navigate('/login');
    } catch (error) {
      message.error('Đăng xuất thất bại!');
    }
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader style={{ 
      background: '#fff', 
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Threads</div>
      <Dropdown overlay={profileMenu} trigger={['click']}>
        <Button 
          type="text" 
          icon={<UserOutlined />} 
          style={{ fontSize: '16px' }}
        >
          Profile
        </Button>
      </Dropdown>
    </AntHeader>
  );
};

export default Header; 