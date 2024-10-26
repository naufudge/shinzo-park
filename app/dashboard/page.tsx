'use client'

import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card } from 'antd';
import { Building, Waves, Gamepad2, House } from 'lucide-react';
import { motion } from "framer-motion";
import Image from 'next/image';
import Home from '@/components/Dashboard/Home';
import Hotel from '@/components/Dashboard/Hotel';
import WaterPark from '@/components/Dashboard/WaterPark';
import Arcade from '@/components/Dashboard/Arcade';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuItems = [
    "Home",
    "Hotel",
    "Water Park",
    "Arcade"
]

const icons = [
    <House className="h-4 w-4" />,
    <Building className="h-4 w-4" />,
    <Waves className="h-4 w-4" />,
    <Gamepad2 className="h-4 w-4" />
]

const page: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("Home");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='h-screen font-poppins'>
        {/* <Header>header</Header> */}
        <Layout>
            <Sider color='#fff' className='h-screen bg-stone-100 text-[13px]'>
                <div className='items-center flex w-full justify-center'>
                    <h1 className='h-full flex text-[1.5rem] font-roboto font-bold mt-10'>Shinzo Park</h1>
                </div>
                <div className='flex flex-col gap-3 px-3 mt-12'>
                    {menuItems.map((item, index) => (
                        <div
                        key={index} 
                        className={`p-2 pl-3 rounded-xl ${currentMenu === item ? "bg-orange-500 text-white font-semibold drop-shadow" : "hover:bg-slate-200"} hover:cursor-pointer transition-all duration-300`}
                        onClick={() => setCurrentMenu(item)}
                        >
                            <div className='flex gap-3 place-items-center'>{icons[index]} {item}</div>
                        </div>
                    ))}
                </div>
            </Sider>
            <Content className='p-10 rounded-2xl z-50 bg-white my-4 mr-4 shadow'>
                <motion.div>
                    {currentMenu === "Home" ?
                        <Home />
                    : currentMenu === "Hotel" ?
                        <Hotel />
                    : currentMenu === "Water Park" ?
                        <WaterPark />
                    : currentMenu === "Arcade" ?
                        <Arcade />
                    : null
                    }
                    
                </motion.div>
            </Content>
        </Layout>

        {/* <Footer className='text-center'>footer</Footer> */}
    </Layout>
  );
};

export default page;