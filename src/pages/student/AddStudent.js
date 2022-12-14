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

function AddStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

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
    'http://www.teen-sexualhealth.com/api/files/upload/girl1.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl2.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl3.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl4.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl5.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl6.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl7.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl8.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl9.jpg',
    'http://www.teen-sexualhealth.com/api/files/upload/girl10.jpg',
  ]

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/student/create`, {
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
      .then((res) => {
        toast.success('???????????????????????????????????????????????????????????????????????????')
        navigate(`/teacher/profile/${id}`)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant='h6'>
              ????????????????????????????????????????????????????????????????????????????????????????????????
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Select
                  fullWidth
                  size='small'
                  style={{ marginTop: 16 }}
                  {...register('student_initial_name')}
                >
                  <MenuItem value='?????????????????????'>?????????????????????</MenuItem>
                  <MenuItem value='????????????????????????'>????????????????????????</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  label='????????????'
                  size='small'
                  {...register('student_fisrtname')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type='text'
                  label='?????????????????????'
                  size='small'
                  {...register('student_lastname')}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  label='????????????????????????'
                  type='text'
                  size='small'
                  {...register('student_nickname')}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  size='small'
                  label='?????????????????????????????????????????????'
                  style={{ marginTop: 16 }}
                  {...register('student_level')}
                >
                  <MenuItem value={0}>Basic</MenuItem>
                  <MenuItem value={1}>Advance</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  size='small'
                  style={{ marginTop: 16 }}
                  {...register('student_study_year')}
                >
                  <MenuItem value={1}>????????????????????????????????????????????? 1</MenuItem>
                  <MenuItem value={2}>????????????????????????????????????????????? 2</MenuItem>
                  <MenuItem value={3}>????????????????????????????????????????????? 3</MenuItem>
                  <MenuItem value={4}>????????????????????????????????????????????? 4</MenuItem>
                  <MenuItem value={5}>????????????????????????????????????????????? 5</MenuItem>
                  <MenuItem value={6}>????????????????????????????????????????????? 6</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  size='small'
                  style={{ marginTop: 16 }}
                  {...register('student_dragdrop')}
                >
                  <MenuItem value={true}>???????????????</MenuItem>
                  <MenuItem value={false}>????????????????????????</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  size='small'
                  displayEmpty
                  style={{ marginTop: 16 }}
                  {...register('student_avatar_path')}
                >
                  {avatar.map((item) => (
                    <MenuItem value={item}>
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
              ??????????????????
            </Button>
            <Button
              variant='outlined'
              fullWidth
              onClick={() => navigate(`/teacher/profile/${id}`)}
            >
              ??????????????????
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}

export default AddStudent
