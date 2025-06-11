import React from 'react';
import { Typography } from 'antd';
import MainLayout from '../components/MainLayout';

const { Title } = Typography;

const Explore: React.FC = () => {
  return (
    <MainLayout>
      <Title level={2}>Trang Khám Phá</Title>
      <p>Chào mừng đến với trang khám phá!</p>
    </MainLayout>
  );
};

export default Explore; 