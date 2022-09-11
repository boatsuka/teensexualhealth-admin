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
import { useForm } from 'react-hook-form'

function Login() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/auth/login`, {
        username: data.username,
        password: data.password,
      })
      .then((res) => console.log(res.data))
  }
  return (
    <React.Fragment>
      <form handleSubmit={onSubmit}>
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
              image='/static/img/next_login.jpg'
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

          <style jsx global>
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
