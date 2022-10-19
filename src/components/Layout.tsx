import { Outlet } from 'react-router-dom'
import logo from '../assets/uow.png'
import user from '../assets/user.png'
import { BsGear } from 'react-icons/bs'
import { NavMenu } from '../hardcoded_demo/NavMenu'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { capitalizeFromPathName } from '../utils/util-functions'
import { motion } from 'framer-motion'

const Layout = () => {

    const [pagetitle, setPageTitle] = useState(NavMenu[0].name)

    const handleChangeTab = (e: React.MouseEvent<HTMLDivElement>, name: string, newContent: JSX.Element) => {
        setPageTitle(name)
    }

    const location = useLocation()


    return (
        
        <motion.div
        // initial={{ opacity: 0, y: '100%' }}
        // animate={{ opacity: 1, y: '0%' }}
        // transition={{ duration: 1.5, type: 'spring' }}
        
        >

            <main className="main__wrapper">
                <motion.nav
                initial={{ opacity: 1, y: '-100%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 1.0, type: 'tween' }}
                
                className="bg-[#005596] h-14 w-full flex justify-between pl-2 pr-2">
                    <section className="flex-1 flex justify-start">
                        <Link to='/'>
                            <img src={logo} alt='uwindsor logo' />
                        </Link>
                    </section>

                    <section className="flex-1 flex justify-end items-center gap-2">
                                            
                        <Link to='/profile' className='w-14'>
                            <img src={user} alt='user pfp' className='rounded-full object-contain hover:cursor-pointer w-fit h-full p-2' />
                        </Link>
                    </section>
                </motion.nav>

                <div className="flex w-full h-full">

                    <motion.nav
                    initial={{ opacity: 1, x: '-100%' }}
                    animate={{ opacity: 1, x: '0%' }}
                    transition={{ duration: 1.0, type: 'tween' }}

                    className="bg-[#F4F4F4] flex flex-col gap-2 max-w-fit min-w-fit min-h-screen max-h-full py-6">
                    {NavMenu.map(e => {
                        return(
                        <Link to={e.link} className='flex justify-start items-center gap-2 px-4 py-2 hover:bg-[#DADADA] cursor-pointer' key={e.name}>
                            <h4>{e.icon}</h4>
                            <h5>{e.name}</h5>
                        </Link>
                        )
                    })}
                    </motion.nav>

                    <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1}}
                    transition={{ duration: 1.5, type: 'tween' }}

                    className='p-12 flex flex-col gap-12 w-full h-fit'>

                        <h2>{capitalizeFromPathName(location.pathname)}</h2>

                        <Outlet />
                    </motion.div>
                </div>

            </main>
        </motion.div>

    )};

export default Layout;