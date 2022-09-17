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
  InputLabel,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setValue, register, handleSubmit } = useForm()

  const avatar = [
    'http://www.teen-sexualhealth.com/api/files/upload/bear.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy1.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy2.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy3.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy4.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy5.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy6.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy7.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy8.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy9.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy10.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy11.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy12.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/boy13.jpg',
  ]

  const GetStudentById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/${id}`)
      .then((res) => {
        const fields = [
          'student_fisrtname',
          'student_lastname',
          'student_level',
          'student_nickname',
          'student_study_year',
          'student_initial_name',
          'student_dragdrop',
        ]
        fields.forEach((field) => {
          setValue(field, res.data[field])
        })
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue])

  const onEditStudent = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/student/edit/${id}`, {
        student_fisrtname: data.student_fisrtname,
        student_lastname: data.student_lastname,
        student_level: data.student_level,
        student_nickname: data.student_nickname,
        student_study_year: data.student_study_year,
        student_initial_name: data.student_initial_name,
        teacher: id,
        student_dragdrop: data.student_dragdrop,
        student_avatar_path: data.student_avatar_path,
      })
      .then(async () => {
        await toast.success('บันทึกข้อมูลเรียบร้อยแล้ว')
        await navigate(`/student/profile/${id}`)
      })
      .catch((err) => toast.error(err))
  }

  React.useEffect(() => {
    GetStudentById()
  }, [GetStudentById, id])

  return (
    <div>
      <form onSubmit={handleSubmit(onEditStudent)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant='h6'>
              ฟอร์มกรอกข้อมูลลงทะเบียนนักเรียน
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <InputLabel>เพศนักเรียน</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  style={{ marginTop: 16 }}
                  {...register('student_initial_name')}
                >
                  <MenuItem value='เด็กชาย'>เด็กชาย</MenuItem>
                  <MenuItem value='เด็กหญิง'>เด็กหญิง</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>ชื่อ</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('student_fisrtname')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>นามสกุล</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  size='small'
                  {...register('student_lastname')}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <InputLabel>ชื่อเล่น</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                
                  type='text'
                  size='small'
                  {...register('student_nickname')}
                />
              </Grid>
              <Grid item xs={6}>
              <InputLabel>ระดับความสามารถ</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  label='ระดับความสามารถ'
                  style={{ marginTop: 16 }}
                  {...register('student_level')}
                >
                  <MenuItem value={0}>Basic</MenuItem>
                  <MenuItem value={1}>Advance</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>ระดับชั้นปี</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  style={{ marginTop: 16 }}
                  {...register('student_study_year')}
                >
                  <MenuItem value={1}>มัธยมศึกษาปีที่ 1</MenuItem>
                  <MenuItem value={2}>มัธยมศึกษาปีที่ 2</MenuItem>
                  <MenuItem value={3}>มัธยมศึกษาปีที่ 3</MenuItem>
                  <MenuItem value={4}>มัธยมศึกษาปีที่ 4</MenuItem>
                  <MenuItem value={5}>มัธยมศึกษาปีที่ 5</MenuItem>
                  <MenuItem value={6}>มัธยมศึกษาปีที่ 6</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>ความสามารถในการตอบคำถาม</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  style={{ marginTop: 16 }}
                  {...register('student_dragdrop')}
                >
                  <MenuItem value={true}>ทำได้</MenuItem>
                  <MenuItem value={false}>ทำไม่ได้</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>รูปภาพ</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  displayEmpty
                  style={{ marginTop: 16 }}
                  {...register('student_avatar_path')}
                >
                  {avatar.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      <img src={item} alt='avatar' width={128} height={128} />
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

export default EditStudent
