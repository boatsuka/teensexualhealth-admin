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
import { useNavigate, useParams } from 'react-router-dom'


const EditTeacher = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [school, setSchool] = React.useState([])
  const { setValue, register, handleSubmit } = useForm()

  const GetSchoolData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school`)
      .then((res) => setSchool(res.data))
      .catch((err) => toast.error(err))
  }

  const GetTeacherById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/teacherbystudent/${id}`)
      .then((res) => {
        const fields = [
          'teacher_thai_firstname',
          'teache_thai_lastname',
          'teacher_nick_name',
        ]
        fields.forEach((field) => {
          setValue(field, res.data[0].teacher[field])
        })
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue])

   const onEditTeacher = async (data) => {
     await axios
       .patch(`${process.env.REACT_APP_API}/teacher/edit/${id}`, {
         teacher_thai_firstname: data.teacher_thai_firstname,
         teache_thai_lastname: data.teache_thai_lastname,
         teacher_nick_name: data.teacher_nick_name,
         teacher_nickname_sound_path: 'string',
         teacher_image_path: 'string',
         school: data.school_id,
       })
       .then(async () => {
         await toast.success('บันทึกข้อมูลเรียบร้อยแล้ว')
         await navigate(`/teacher/profile/${id}`)
       })
       .catch((err) => toast.error(err))
   }

  React.useEffect(() => {
    GetTeacherById()
    GetSchoolData()
  }, [GetTeacherById, id])

  return (
    <div>
      <form onSubmit={handleSubmit(onEditTeacher)}>
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

export default EditTeacher
