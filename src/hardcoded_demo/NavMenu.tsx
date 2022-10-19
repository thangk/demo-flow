import { BiHome, BiCheckCircle, BiBarChart, BiCylinder, BiChart, BiPlus, BiSlider } from 'react-icons/bi'
import { MdOutlineDashboard } from 'react-icons/md'
import AddFlow from '../pages/AddFlow'
import AdminSettings from '../pages/admin-settings/AdminSettings'
import Charts from '../pages/Charts'
import Dashboard from '../pages/Dashboard'
import ManageData from '../pages/ManageData'
import MyFlows from '../pages/MyFlows'

export const NavMenu = [
    {
        name: 'Dashboard',
        icon: <MdOutlineDashboard />,
        link: '/'
    },
    {
        name: 'Add flow',
        icon: <BiPlus />,
        link: '/add-flow'
    },
    {
        name: 'My flows',
        icon: <BiChart />,
        link: '/my-flows'
    },
    {
        name: 'Charts',
        icon: <BiBarChart />,
        link: '/charts'
    },
    {
        name: 'Manage Data',
        icon: <BiCylinder />,
        link: '/manage-data'
    },
    {
        name: 'Admin Settings',
        icon: <BiSlider />,
        link: '/admin-settings'
    }
]