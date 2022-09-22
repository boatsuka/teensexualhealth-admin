import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  Typography,
  CardActions,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddTeacher = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [school, setSchool] = React.useState([])

  const GetSchoolData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school`)
      .then((res) => setSchool(res.data))
      .catch((err) => toast.error(err))
  }

  

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('file', data.file[0])

    await axios
      .post(`${process.env.REACT_APP_API}/files/upload`, formData)
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_API}/teacher/create`, {
            teacher_thai_firstname: data.teacher_thai_firstname,
            teache_thai_lastname: data.teacher_thai_lastname,
            teacher_nick_name: data.teacher_nick_name,
            teacher_nickname_sound_path: 'string',
            teacher_image_path: `${process.env.REACT_APP_API}/files/upload/${res.data.path}`,
            school: data.school_id,
          })
          .then((item) => {
            axios.post(`${process.env.REACT_APP_API}/user/create`, {
              user_loginname: data.user_loginname,
              user_password: data.user_password,
              user_full_name: data.user_full_name,
              user_email: data.user_email,
              user_telephone: data.user_telephone,
              user_role: 'NORMAL_USER_ROLE',
              user_image_path: `${process.env.REACT_APP_API}/files/upload/${res.data.path}`,
              teacher: item.data.teacher_id,
              school: data.school,
            })
          })
        toast.success('เพิ่มข้อมูลคุณครูสำเร็จ')
        navigate('/school')
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  React.useEffect(() => {
    GetSchoolData()
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant='h6'>
              ฟอร์มกรอกข้อมูลลงทะเบียนคุณครู
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <InputLabel size='small'>ชื่อผู้ใช้งาน</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('user_loginname')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size='small'>รหัสผ่าน</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='password'
                  size='small'
                  {...register('user_password')}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <InputLabel size='small'>ชื่อเต็ม</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('user_full_name')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size='small'>อีเมลผู้ใช้งาน</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('user_email')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size='small'>เบอร์โทรศัพท์</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('user_telephone')}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <InputLabel size='small'>ชื่อ</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  label='ชื่อ'
                  size='small'
                  {...register('teacher_thai_firstname')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size='small'>นามสกุล</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  label='นามสกุล'
                  size='small'
                  {...register('teacher_thai_lastname')}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <InputLabel size='small'>ชื่อเล่น</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  label='ชื่อเล่น'
                  type='text'
                  size='small'
                  {...register('teacher_nick_name')}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel size='small'>โรงเรียน</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  {...register('school_id')}
                  style={{ marginTop: 16 }}
                >
                  {school.map((item, index) => (
                    <MenuItem key={index} value={item.school_id}>
                      {item.school_thai_name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <InputLabel size='small'>รูปภาพ</InputLabel>
              <TextField
                fullWidth
                type='file'
                size='small'
                style={{ marginTop: 16 }}
                {...register('file')}
              />
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              sx={{ marginRight: 1 }}
            >
              บันทึก
            </Button>
            <Button
              variant='outlined'
              fullWidth
              onClick={() => navigate('/school')}
            >
              ยกเลิก
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}

export default AddTeacher
