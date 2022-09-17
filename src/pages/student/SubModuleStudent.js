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
} from "@mui/material";
import React from "react";
import * as axios from "axios";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form'
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";

const SubModuleStudent = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState([])
    const [student, setStudent] = React.useState([])
    const { studentId, submoduleId } = useParams();
    const [ submodule, setSubModule] = React.useState([]);
    const { setValue, register } = useForm()

    const columns = [
        {
            field: "submodule_name",
            headerName: "ชื่อ",
            width: 200,
        },
        {
            field: "submodule_description",
            headerName: "รายละเอียด",
            align: "center",
            width: 200,
        },
        {
            field: "submodule_level",
            headerName: "ระดับของหน่วยการเรียนรู้",
            width: 200,
        },
        {
            field: "actions",
            type: "actions",
            width: 350,
            getActions: (params) => [
                <>
                    <Button
                        variant="contained"
                        size="medium"
                        color="success"
                        onClick={() => onSubmitSubModule(params.submodule_id)}
                    >
                        เปลี่ยนสถานะทำแล้ว
                    </Button>
                </>,
            ],
        },
    ];

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
          .get(`${process.env.REACT_APP_API}/student/${studentId}/submodule/${submoduleId}`)
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
              setData(res.data[0])
              setStudent(res.data[0].student)
              setValue(field, res.data[0].student[field])
            })
          })
          .catch((err) => {
            toast.error(err)
          })
      }, [setValue, setData, setStudent])

      console.log(data.student_submodule_pass)

    const GetModuleById = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API}/student/${studentId}/submodule/${submoduleId}`
            )
            .then((res) => {
                setSubModule(res.data[0].submodule)
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const onSubmitSubModule = async () => {
        await axios
            .post(`${process.env.REACT_APP_API}/student/survey/${studentId}/${submoduleId}/1`)
            .then((res) => {
                toast.success('เปลี่ยนสถานะผ่านแบบการเรียนรู้แล้ว')
                window.location.reload()
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    React.useEffect(() => {
        GetSubModuleById()
        GetModuleById();
    }, [GetSubModuleById, GetModuleById]);

    return (
        <><div>
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
                                        height={200} />
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
                                        {...register('student_fisrtname')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel>นามสกุล</InputLabel>
                                    <TextField
                                        style={{ marginTop: 10 }}
                                        fullWidth
                                        disabled
                                        type='text'
                                        size='small'
                                        {...register('student_lastname')} />
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
                                        {...register('student_nickname')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel>ระดับความสามารถ</InputLabel>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        disabled
                                        style={{ marginTop: 10 }}
                                        {...register('student_level')} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                   {
                    data.student_submodule_pass ?  <>
                    <Button
                         fullWidth
                         variant='contained'
                         color='error'
                         sx={{ marginRight: 1 }}
                     >
                         ยกเลิกการเปลี่ยนสถานะทำแล้ว
                     </Button>
                    </> : <>
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
                   }
                </CardActions>
            </Card>
        </div><Box sx={{ height: 450, width: '100%', mt: 3 }}>
                <DataGrid
                    rows={submodule}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.submodule_id} />
            </Box></>

    );
};

export default SubModuleStudent;
