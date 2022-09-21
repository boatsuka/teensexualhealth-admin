import {
  Avatar,
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  CardActions,
  Box,
  Link,
  InputLabel,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { useParams, useNavigate } from 'react-router-dom'

const ProfileTeacher = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setValue, register } = useForm()
  const [teacher, setTeacher] = React.useState([])
  const [student, setStudent] = React.useState([])

  const columns = [
    {
      field: "student_avatar_path",
      headerName: "avatar",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.student_avatar_path} />
          </>
        );
      }
    },
    {
      field: 'student_fisrtname',
      headerName: 'ชื่อ',
      width: 200,
    },
    {
      field: 'student_lastname',
      headerName: 'นามสกุล',
      width: 200,
    },
    {
      field: 'student_nickname',
      headerName: 'ชื่อเล่น',
      align: 'center',
      width: 200,
    },
    {
      field: 'student_study_year',
      headerName: 'ปีการศึกษา',
      align: 'center',
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 350,
      getActions: (params) => [
        <>
          <Button
            variant='contained'
            size='medium'
            color='success'
            onClick={() => navigate(`/student/profile/${params.id}`)}
          >
            ดูข้อมูล
          </Button>
          <Button
            variant='contained'
            size='medium'
            onClick={() => navigate(`/student/edit/${params.id}/teacher/${id}`)}
          >
            แก้ไขข้อมูล
          </Button>
          <Button
            variant='contained'
            size='medium'
            color='error'
            onClick={() => onDelete(params.id)}
          >
            ลบข้อมูล
          </Button>
        </>,
      ],
    },
  ]

  const onDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API}/student/remove-hard/${id}`).then((res) => {
      toast.success('ลบข้อมูลแล้ว')
    }).catch((err) => {
      toast.error(err)
    })
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
        setStudent(res.data[0].students)
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setStudent, setValue, setTeacher])

  React.useEffect(() => {
    GetTeacherById()
  }, [GetTeacherById, id])

  return (
    <div>
      <div>
        <Card>
          <CardContent sx={{ padding: 2 }}>
            <Box display='flex'>
              <Box
                flex={1}
                justifyItems='center'
              >
                <Box sx={{ mr: 4, ml: 8, mt: 2, mb: 2 }}>
                  <Link>
                    <Avatar src={teacher.teacher_image_path} sx={{ width: 200, height: 200 }}/>
                  </Link>
                </Box>
              </Box>
              <Box flex={2} mr='0.5em'>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <InputLabel>ชื่อ</InputLabel>
                    <TextField
                      style={{ marginTop: 16 }}
                      disabled
                      fullWidth
                      type='text'
                      size='small'
                      {...register('teacher_thai_firstname')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>นามสกุล</InputLabel>
                    <TextField
                      disabled
                      style={{ marginTop: 16 }}
                      fullWidth
                      type='text'
                      size='small'
                      {...register('teache_thai_lastname')}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <InputLabel>ชื่อเล่น</InputLabel>
                    <TextField
                      style={{ marginTop: 16 }}
                      disabled
                      fullWidth
                      type='text'
                      size='small'
                      {...register('teacher_nick_name')}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              sx={{ marginRight: 1 }}
              onClick={() => navigate(`/teacher/edit/${id}`)}
            >
              แก้ไข
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
      </div>
      <Box sx={{ height: 450, width: '100%', mt: 3 }}>
        <DataGrid
          rows={student}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.student_id}
          components={{
            Toolbar: () => {
              return (
                <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant='contained'
                    sx={{
                      top: 10,
                      right: 10,
                    }}
                    onClick={() => navigate(`/student/add/${id}`)}
                  >
                    เพิ่มข้อมูลนักเรียน
                  </Button>
                </GridToolbarContainer>
              )
            },
          }}
        />
      </Box>
    </div>
  )
}

export default ProfileTeacher
