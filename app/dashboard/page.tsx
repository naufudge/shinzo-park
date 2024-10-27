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
import { Building, Waves, Gamepad2, House, Clapperboard } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import Home from '@/components/Dashboard/Home';
import Hotel from '@/components/Dashboard/Hotel';
import WaterPark from '@/components/Dashboard/WaterPark';
import Arcade from '@/components/Dashboard/Arcade';
import Cinema from '@/components/Dashboard/Cinema';

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
    "Home",
    "Hotel",
    "Water Park",
    "Arcade",
    "Cinema"
]

const icons = [
    <House className="h-4 w-4" />,
    <Building className="h-4 w-4" />,
    <Waves className="h-4 w-4" />,
    <Gamepad2 className="h-4 w-4" />,
    <Clapperboard className='h-4 w-4' />
]

const page: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("Home");
  
  const pageVariants = {
    initial: { opacity: 0, y: -50 },  // Initial state: transparent and off-screen
    animate: { opacity: 1, y: 0 },     // Animate to: fully visible and centered
    exit: { opacity: 0, y: 50 }       // Exit state: transparent and off-screen (moving out)
  };

  return (
    <Layout className='h-screen font-poppins'>
        {/* <Header>header</Header> */}
        <Layout>
            <Sider color='#fff' className='h-screen bg-stone-100 text-[13px]'>
                <div className='items-center flex w-full justify-center'>
                    <h1 className='h-full flex text-[1.5rem] font-roboto font-bold mt-10'>Shinzo Park</h1>
                </div>
                <div className='flex flex-col gap-3 px-3 mt-10'>
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
            <Content className='p-10 rounded-2xl z-50 bg-white my-4 mr-4 shadow overflow-y-scroll'>
                <motion.div>
                    <AnimatePresence mode='wait'>
                        {currentMenu === "Home" ?
                            <motion.div
                                key={currentMenu}
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <Home />
                            </motion.div>
                        : currentMenu === "Hotel" ?
                            <motion.div
                                key={currentMenu}
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <Hotel />
                            </motion.div>
                        : currentMenu === "Water Park" ?
                            <motion.div
                                key={currentMenu}
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <WaterPark />
                            </motion.div>
                        : currentMenu === "Arcade" ?
                            <motion.div
                                key={currentMenu}
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <Arcade />
                            </motion.div>
                        : currentMenu === "Cinema" ?
                            <motion.div
                                key={currentMenu}
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <Cinema />
                            </motion.div>
                        :
                        null
                        }
                    </AnimatePresence>
                </motion.div>
            </Content>
        </Layout>

        {/* <Footer className='text-center'>footer</Footer> */}
    </Layout>
  );
};

export default page;