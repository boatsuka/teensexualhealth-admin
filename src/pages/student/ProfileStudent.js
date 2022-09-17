import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  CardActions,
  InputLabel,
  Box,
  Link,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { DataGrid } from '@mui/x-data-grid'
import { useParams, useNavigate } from 'react-router-dom'

const ProfileStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setValue, register } = useForm()
  const [student, setStudent] = React.useState([])
  const [module, setModule] = React.useState([])

  const columns = [
    {
      field: 'module_name',
      headerName: 'ชื่อ',
      width: 200,
    },
    {
      field: 'module_description',
      headerName: 'รายละเอียด',
      align: 'center',
      width: 200,
    },
    {
      field: 'module_level',
      headerName: 'ระดับของหน่วยการเรียนรู้',
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
            onClick={() => navigate(`/student/${id}/module/${params.id}`)}
          >
            ดูข้อมูลหน่วยการเรีนรู้ย่อย
          </Button>
          <Button
            variant='contained'
            size='medium'
            onClick={() => navigate(`/student/edit/${params.id}`)}
          >
            แก้ไขข้อมูล
          </Button>
        </>,
      ],
    },
  ]

  const GetTeacherById = React.useCallback(async () => {
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
          'teacher_id',
          'student_dragdrop',
          'student_avatar_path',
        ]
        fields.forEach((field) => {
          setStudent(res.data)
          setValue(field, res.data[field])
        })
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue])

  React.useEffect(() => {
    GetTeacherById()
  }, [GetTeacherById, id])

  const GetModuleById = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/info/${id}`)
      .then((res) => {
        setModule(res.data[0].listModules)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  React.useEffect(() => {
    GetModuleById()
  })

  return (
    <div>
      <div>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Box display='flex'>
              <Box
                flex={1}
                justifyItems='center'
                sx={{ p: 2, mr: 1, border: '1px dashed grey' }}
              >
                <Box sx={{ p: 3, mr: 4, ml: 4, mt: 2 }}>
                  <Link>
                    <img
                      src={student.student_avatar_path}
                      alt='student-logo'
                      width={200}
                      height={200}
                    />
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
                      style={{ marginTop: 10 }}
                      fullWidth
                      disabled
                      type='text'
                      size='small'
                      {...register('student_fisrtname')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>นามสกุล</InputLabel>
                    <TextField
                      style={{ marginTop: 10 }}
                      fullWidth
                      disabled
                      type='text'
                      size='small'
                      {...register('student_lastname')}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={6}>
                    <InputLabel>ชื่อเล่น</InputLabel>
                    <TextField
                      style={{ marginTop: 10 }}
                      fullWidth
                      disabled
                      type='text'
                      size='small'
                      {...register('student_nickname')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>ระดับความสามารถ</InputLabel>
                    <TextField
                      fullWidth
                      size='small'
                      disabled
                      style={{ marginTop: 10 }}
                      {...register('student_level')}
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
              onClick={() => navigate(`/student/edit/${id}`)}
            >
              แก้ไข
            </Button>
          </CardActions>
        </Card>
      </div>
      <Box sx={{ height: 450, width: '100%', mt: 3 }}>
        <DataGrid
          rows={module}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.module_id}
        />
      </Box>
    </div>
  )
}

export default ProfileStudent
