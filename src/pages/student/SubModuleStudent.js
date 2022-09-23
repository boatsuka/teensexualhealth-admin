import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  CardActions,
  Box,
  Link,
  InputLabel,
  Avatar,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { useParams, useNavigate } from 'react-router-dom'

const SubModuleStudent = () => {
  const navigate = useNavigate()
  const [data, setData] = React.useState([])
  const [student, setStudent] = React.useState([])
  const { studentId, submoduleId } = useParams()
  const [submodule, setSubModule] = React.useState([])
  const { setValue, register } = useForm()

  const columns = [
    {
      field: 'student_avatar_path',
      headerName: 'รูปภาพหัวข้อ',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.quiz_imagepath} />
          </>
        )
      },
    },
    {
      field: 'quiz_text',
      headerName: 'คำถาม',
      width: 200,
    },
    {
      field: 'quiz_gender',
      headerName: 'เพศที่เหมาะสมกับคำถาม',
      align: 'center',
      width: 200,
    },
    {
      field: 'quiz_level',
      headerName: 'ระดับของคำถาม',
      width: 200,
    },
    {
      field: 'quiz_score',
      headerName: 'คะแนนของคำถาม',
      width: 200,
    },
  ]

  // const GetTeacherById = React.useCallback(async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API}/student/teacherbystudent/${id}`)
  //     .then((res) => {
  //       const fields = [
  //         "teacher_thai_firstname",
  //         "teache_thai_lastname",
  //         "teacher_nick_name",
  //         "school_id",
  //       ];
  //       fields.forEach((field) => {
  //         setStudent(res.data);
  //         setValue(field, res.data[0].teacher[field]);
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error(err);
  //     });
  // }, [id, setStudent, setValue]);

  // React.useEffect(() => {
  //   GetTeacherById();
  // }, [GetTeacherById, id]);

  const GetSubModuleById = React.useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/student/${studentId}/submodule/${submoduleId}`
      )
      .then((res) => {
        const fields = [
          'student_fisrtname',
          'student_lastname',
          'student_level',
          'student_nickname',
          'student_study_year',
          'student_initial_name',
          'teacher',
          'student_dragdrop',
        ]
        fields.forEach((field) => {
          setData(res.data[0])
          setSubModule(res.data[0].submodule.quiz)
        })
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [studentId, submoduleId])

  const onSubmitSubModule = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/student/survey/${studentId}/${submoduleId}/1`
      )
      .then((res) => {
        toast.success('เปลี่ยนสถานะผ่านแบบการเรียนรู้แล้ว')
        window.location.reload()
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  React.useEffect(() => {
    GetSubModuleById()
  }, [GetSubModuleById])

  return (
    <>
      <Box sx={{ height: 450, width: '100%', mt: 3 }}>
        <DataGrid
          rows={submodule}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.quiz_id}
        />
      </Box>
      <div>
        <Card>
          <CardActions>
            {data.student_submodule_pass === 1 ? (
              <>
                <Button
                  fullWidth
                  variant='contained'
                  color='error'
                  sx={{ marginRight: 1 }}
                >
                  ยกเลิกการเปลี่ยนสถานะทำแล้ว
                </Button>
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  sx={{ marginRight: 1 }}
                  onClick={() => onSubmitSubModule()}
                >
                  เปลี่ยนสถานะทำแล้ว
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </div>
    </>
  )
}

export default SubModuleStudent
