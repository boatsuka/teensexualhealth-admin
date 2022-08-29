import React from 'react'
import Header from './Header'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Box componnet={'main'} sx={{ flexGrow: 1, p: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Layout
