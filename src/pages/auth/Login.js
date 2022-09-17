import {
  Box,
  Card,
  Grid,
  CardContent,
  CardMedia,
  TextField,
  InputLabel,
  Button,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/auth/login`, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        const data = jwt_decode(res.data.access_token)

        localStorage.setItem('user_id', data.user_id)
        localStorage.setItem('user_role', data.user_role)
        localStorage.setItem('teacher_id', data.teacher.teacher_id)
        localStorage.setItem('school_id', data.school.school_id)

        switch (data.user_role) {
          case 'SUPER_ADMIN_USER':
            navigate('/school')
            break
          case 'ADMIN_USER_ROLE':
            navigate(`/school/profile/${data.school.school_id}`)
            break
          case 'NORMAL_USER_ROLE':
            navigate(`/teacher/profile/${data.teacher.teacher_id}`)
            break
          default:
            break
        }
      })
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 200 }}
              image='http://teen-sexualhealth.com/api/files/upload/module5.png'
              title='Contemplative Reptile'
            />
            <CardContent>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <InputLabel size='small'>ชื่อผู้ใช้งาน</InputLabel>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    type='text'
                    size='small'
                    {...register('username')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel size='small'>รหัสผ่าน</InputLabel>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    type='password'
                    size='small'
                    {...register('password')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                    style={{ marginTop: 16 }}
                    sx={{ marginRight: 1 }}
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <style>
            {`
              body {
                min-height: 100vh;
                position: relative;
                margin: 0;
                background-size: cover;
                background-image: url('/static/img/bg4.jpg');
                text-align: center;
              }
            `}
          </style>
        </Box>
      </form>
    </React.Fragment>
  )
}

export default Login
