import React from 'react'
import Layout from './components/Layout'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Error from './pages/Error'
import Module from './pages/module/Module'
import School from './pages/school/School'
import AddSchool from './pages/school/AddSchool'
import EditSchool from './pages/school/EditSchool'
import Dashboard from './pages/Dashboard'
import Student from './pages/student/Student'
import AddStudent from './pages/student/AddStudent'
import EditStudent from './pages/student/EditStudent'
import ProfileStudent from './pages/student/ProfileStudent'
import Teacher from './pages/teacher/Teacher'
import SubModule from './pages/submodule/SubModule'
import ProfileSchool from './pages/school/ProfileSchool'
import AddModule from './pages/module/AddModule'
import EditModule from './pages/module/EditModule'
import ProfileModule from './pages/module/ProfileModule'
import AddTeacher from './pages/teacher/AddTeacher'
import EditTeacher from './pages/teacher/EditTeacher'
import ProfileTeacher from './pages/teacher/ProfileTeacher'
import AddSubModule from './pages/submodule/AddSubModule'
import EditSubModule from './pages/submodule/EditSubModule'
import ProfileSubModule from './pages/submodule/ProfileSubModule'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='school'>
              <Route index element={<School />} />
              <Route path='add' element={<AddSchool />} />
              <Route path='edit/:id' element={<EditSchool />} />
              <Route path='profile/:id' element={<ProfileSchool />} />
            </Route>
            <Route path='teacher'>
              <Route index element={<Teacher />} />
              <Route path='add' element={<AddTeacher />} />
              <Route path='edit/:id' element={<EditTeacher />} />
              <Route path='profile/:id' element={<ProfileTeacher />} />
            </Route>
            <Route path='student'>
              <Route index element={<Student />} />
              <Route path='add' element={<AddStudent />} />
              <Route path='edit' element={<EditStudent />} />
              <Route path='profile/:id' element={<ProfileStudent />} />
            </Route>
            <Route path='module'>
              <Route index element={<Module />} />
              <Route path='add' element={<AddModule />} />
              <Route path='edit' element={<EditModule />} />
              <Route path='profile/:id' element={<ProfileModule />} />
            </Route>
            <Route path='submodule'>
              <Route index element={<SubModule />} />
              <Route path='add' element={<AddSubModule />} />
              <Route path='edit' element={<EditSubModule />} />
              <Route path='profile' element={<ProfileSubModule />} />
            </Route>
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App
