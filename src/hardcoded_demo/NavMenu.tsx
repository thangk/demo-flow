import { BiHome, BiCheckCircle, BiBarChart, BiCylinder, BiChart, BiPlus, BiSlider } from 'react-icons/bi'
import { MdOutlineDashboard } from 'react-icons/md'
import AddFlow from '../contents/AddFlow'
import AdminSettings from '../contents/AdminSettings'
import Charts from '../contents/Charts'
import Dashboard from '../contents/Dashboard'
import ManageData from '../contents/ManageData'
import MyFlows from '../contents/MyFlows'

export const NavMenu = [
    {
        name: 'Dashboard',
        icon: <MdOutlineDashboard />,
        content: <Dashboard />
    },
    {
        name: 'Add flow',
        icon: <BiPlus />,
        content: <AddFlow />
    },
    {
        name: 'My flows',
        icon: <BiChart />,
        content: <MyFlows />
    },
    {
        name: 'Charts',
        icon: <BiBarChart />,
        content: <Charts />
    },
    {
        name: 'Manage Data',
        icon: <BiCylinder />,
        content: <ManageData />
    },
    {
        name: 'Admin Settings',
        icon: <BiSlider />,
        content: <AdminSettings />
    }
]