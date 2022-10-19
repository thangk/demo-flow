import { Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'

import Layout from './components/Layout'
import Login from './pages/Login'
import UserProfileSettings from './pages/UserProfileSetting'
import AddFlow from './pages/AddFlow'
import AdminSettings from './pages/admin-settings/AdminSettings'
import Charts from './pages/Charts'
import AdminSettings_Charts from './pages/admin-settings/charts/AdminSettings_Charts'
import Dashboard from './pages/Dashboard'
import ManageData from './pages/ManageData'
import MyFlows from './pages/MyFlows'
import CreateForm from './pages/admin-settings/forms/CreateForm'
import EditForm from './pages/admin-settings/forms/EditForm'
import Forms from './pages/admin-settings/forms/Forms'

function App() {


  return (
    
    <Routes>
        {/* public routes */}
        <Route path='login' element={<Login />} />
      
        <Route path='/' element={<Layout />}>

        {/* protected routes */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/profile' element={<UserProfileSettings />} />
        <Route path='/add-flow' element={<AddFlow />} />
        <Route path='/my-flows' element={<MyFlows />} />
        <Route path='/charts' element={<Charts />} />
        <Route path='/manage-data' element={<ManageData />} />


        <Route path='/admin-settings' element={<AdminSettings />} >
          <Route path='/admin-settings/forms' element={<Forms />} />
          <Route path='/admin-settings/forms/create-form' element={<CreateForm />} />
          <Route path='/admin-settings/forms/edit-form/:name' element={<EditForm />} />

          <Route path='/admin-settings/charts' element={<AdminSettings_Charts />} />
        </Route>

        {/* 404 error route */}
        <Route path='*' element={<ErrorPage />} />

      </Route>
    </Routes>
  )
}

export default App
