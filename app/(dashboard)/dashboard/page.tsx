'use client'

import React, { useEffect, useState } from 'react';

import { Layout } from 'antd';
import { Building, Waves, Gamepad2, House, Clapperboard, Users } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Home from '@/components/Dashboard/Home';
import HotelDashboard from '@/components/Dashboard/Hotel';
import WaterPark from '@/components/Dashboard/WaterPark';
import Arcade from '@/components/Dashboard/Arcade';
import Cinema from '@/components/Dashboard/Cinema';
import UsersSection from '@/components/Dashboard/Users';
import Link from 'next/link';
import { getToken, getUsers } from '@/lib/helpers';
import { JwtPayload } from 'jsonwebtoken';
import { UserPublic } from '@/types/MyTypes';

const { Header, Content, Footer, Sider } = Layout;

const newMenuItems = [
    { name: "Home", role: ["admin", "manager", "hotel", "waterpark", "arcade", "cinema"] },
    { name: "Hotel", role: ["admin", "manager", "hotel"] },
    { name: "Water Park", role: ["admin", "manager", "waterpark"] },
    { name: "Arcade", role: ["admin", "manager", "arcade"] },
    { name: "Cinema", role: ["admin", "manager", "cinema"] },
    { name: "Users", role: ["admin"] }
]

const icons = [
    <House key={1} className="h-4 w-4" />,
    <Building key={2} className="h-4 w-4" />,
    <Waves key={3} className="h-4 w-4" />,
    <Gamepad2 key={4} className="h-4 w-4" />,
    <Clapperboard key={5} className='h-4 w-4' />,
    <Users key={6} className='h-4 w-4' />
]

const page = () => {
    //   const [collapsed, setCollapsed] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("Home");

    const [loggedIn, setLoggedIn] = useState(false)
    const [tokenData, setTokenData] = useState<JwtPayload | null>()

    const [users, setUsers] = useState<UserPublic[]>()

    const pageVariants = {
        initial: { opacity: 0, y: -50 },  // Initial state: transparent and off-screen
        animate: { opacity: 1, y: 0 },     // Animate to: fully visible and centered
        exit: { opacity: 0, y: 50 }       // Exit state: transparent and off-screen (moving out)
    };

    useEffect(() => {
        if (!loggedIn) getToken(setTokenData, setLoggedIn);
        if (!users) getUsers(setUsers)
    }, [loggedIn, tokenData, users])

    return (
        <Layout className='h-screen font-poppins'>
            {/* <Header>header</Header> */}
            <Layout>
                {/* Side Bar */}
                <Sider color='#fff' className='h-screen bg-stone-100 text-[13px]'>
                    <div className='items-center flex w-full justify-center'>
                        <Link href={"/"} className='hover:text-orange-600'>
                            <h1 className='h-full flex text-[1.5rem] font-roboto font-bold mt-10 tracking-wide'>DhonVeli</h1>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-3 px-3 mt-10'>
                        {newMenuItems.map((item, index) => (
                            <div key={index}>
                                {item.role.includes(tokenData?.role) &&
                                    <div
                                        
                                        className={`p-2 pl-3 rounded-xl ${currentMenu === item.name ? "bg-orange-500 text-white font-semibold drop-shadow" : "hover:bg-slate-200"} hover:cursor-pointer transition-all duration-300`}
                                        onClick={() => setCurrentMenu(item.name)}
                                    >
                                        <div className='flex gap-3 place-items-center'>{icons[index]} {item.name}</div>
                                    </div>
                                }
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
                                        <HotelDashboard />
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
                                                : currentMenu === "Users" ?
                                                    <motion.div
                                                        key={currentMenu}
                                                        variants={pageVariants}
                                                        initial="initial"
                                                        animate="animate"
                                                        exit="exit"
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <UsersSection users={users} setUsers={setUsers}  />
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