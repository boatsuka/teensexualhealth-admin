import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Error from "./pages/Error";
import Module from "./pages/module/Module";
import School from "./pages/school/School";
import AddSchool from "./pages/school/AddSchool";
import EditSchool from "./pages/school/EditSchool";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/student/Student";
import Teacher from "./pages/teacher/Teacher";
import SubModule from "./pages/submodule/SubModule";
import ProfileSchool from "./pages/school/ProfileSchool";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="school">
              <Route index element={<School />} />
              <Route path="add" element={<AddSchool />} />
              <Route path="edit/:id" element={<EditSchool />} />
              <Route path="profile/:id" element={<ProfileSchool />} />
            </Route>
            <Route path="teacher">
              <Route index element={<Teacher />} />
            </Route>
            <Route path="student">
              <Route index element={<Student />} />
            </Route>
            <Route path="module">
              <Route index element={<Module />} />
            </Route>
            <Route>
              <Route index element={<SubModule />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
