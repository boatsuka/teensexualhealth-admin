import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  Typography,
  CardActions,
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
    await axios
      .post(`${process.env.REACT_APP_API}/teacher/create`, {
        teacher_thai_firstname: data.teacher_thai_firstname,
        teache_thai_lastname: data.teache_thai_lastname,
        teacher_nick_name: data.teacher_nick_name,
        teacher_nickname_sound_path: 'string',
        teacher_image_path: 'string',
        school: data.school_id,
      })
      .then(() => {
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
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  label='นามสกุล'
                  size='small'
                  {...register('teache_thai_lastname')}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  label='ชื่อเล่น'
                  type='text'
                  size='small'
                  {...register('teacher_nick_name')}
                />
              </Grid>
              <Grid item xs={6}>
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
