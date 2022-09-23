import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  Typography,
  CardActions,
  InputLabel,
  NativeSelect,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const AddTeacher = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm()
  const [teacher, setTeacher] = React.useState([])
  const [school, setSchool] = React.useState([])

  const GetSchoolData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school`)
      .then((res) => setSchool(res.data))
      .catch((err) => toast.error(err))
  }

  const GetTeacherById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/teacher/${id}`)
      .then((res) => {
        const fields = [
          'teacher_thai_firstname',
          'teache_thai_lastname',
          'teacher_nick_name',
        ]
        fields.forEach((field) => {
          setValue(field, res.data[0][field])
        })
        setTeacher(res.data[0])
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue, setTeacher])

  const onEditTeacher = async (data) => {
    const formData = new FormData()
    formData.append('file', data.file[0])

    await axios
      .post(`${process.env.REACT_APP_API}/files/upload`, formData)
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_API}/teacher/edit/${id}`, {
            teacher_thai_firstname: data.teacher_thai_firstname,
            teache_thai_lastname: data.teache_thai_lastname,
            teacher_nick_name: data.teacher_nick_name,
            teacher_nickname_sound_path: data.teacher_nickname_sound_path,
            teacher_image_path: `${process.env.REACT_APP_API}/files/upload/${res.data.path}`,
            school: data.school_id,
          })
          .then(async (res) => {
            await toast.success('บันทึกข้อมูลเรียบร้อยแล้ว')
            await navigate(`/teacher/profile/${teacher}`)
          })
          .catch((err) => toast.error(err))
      })
      .catch((err) =>
        toast.err('ขนาดของรูปภาพใหญ่เกินไป กรุณาเลือกรูปใหม่ ไม่เกิน 50mb')
      )
  }

  React.useEffect(() => {
    GetSchoolData()
    GetTeacherById()
  })

  return (
    <div>
      <form onSubmit={handleSubmit(onEditTeacher)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant='h6'>
              ฟอร์มกรอกข้อมูลลงทะเบียนคุณครู {teacher.teacher_nick_name}
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <br />
              <Grid item xs={6}>
                <InputLabel size='small'>ชื่อ</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('teacher_thai_firstname')}
                  defaultValue={teacher.teacher_thai_firstname}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size='small'>นามสกุล</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  defaultValue={teacher.teache_thai_lastname}
                  {...register('teache_thai_lastname')}
                />
              </Grid>
              <br />
              <Grid item xs={12}>
                <InputLabel size='small'>ชื่อเล่น</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('teacher_nick_name')}
                  defaultValue={teacher.teacher_nick_name}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel size='small'>โรงเรียน</InputLabel>
                <NativeSelect
                  fullWidth
                  size='small'
                  {...register('school_id')}
                  style={{ marginTop: 16 }}
                >
                  {school.map((item, index) => (
                    <option key={index} value={item.school_id}>
                      {item.school_thai_name}
                    </option>
                  ))}
                </NativeSelect>
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
