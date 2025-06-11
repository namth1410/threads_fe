import React from 'react';
import { Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const items = [
    {
      key: 'en',
      label: 'English',
      onClick: () => {
        i18n.changeLanguage('en');
        localStorage.setItem('i18nextLng', 'en');
      },
    },
    {
      key: 'vi',
      label: 'Tiếng Việt',
      onClick: () => {
        i18n.changeLanguage('vi');
        localStorage.setItem('i18nextLng', 'vi');
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button 
        type="text" 
        icon={<GlobalOutlined />} 
        style={{ color: '#000' }}
      />
    </Dropdown>
  );
};

export default LanguageSwitcher; 