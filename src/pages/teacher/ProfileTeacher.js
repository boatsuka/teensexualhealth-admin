import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  CardActions,
  Box,
  Link,
} from "@mui/material";
import React from "react";
import * as axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const ProfileTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setValue, register } = useForm();
  const [data, setData] = React.useState([]);
  const [student, setStudent] = React.useState([]);

  const columns = [
    {
      field: "student_fisrtname",
      headerName: "ชื่อ",
      width: 200,
    },
    {
      field: "student_lastname",
      headerName: "นามสกุล",
      width: 200,
    },
    {
      field: "student_nickname",
      headerName: "ชื่อเล่น",
      align: "center",
      width: 200,
    },
    {
      field: "student_study_year",
      headerName: "ปีการศึกษา",
      align: "center",
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
            onClick={() => navigate(`/student/profile/${params.id}`)}
          >
            ดูข้อมูล
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => navigate(`/student/edit/${params.id}`)}
          >
            แก้ไขข้อมูล
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            onClick={() => console.log(params.id)}
          >
            ลบข้อมูล
          </Button>
        </>,
      ],
    },
  ];

  const GetTeacherById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/teacherbystudent/${id}`)
      .then((res) => {
        const fields = [
          "teacher_thai_firstname",
          "teache_thai_lastname",
          "teacher_nick_name",
          "school_id",
        ];
        fields.forEach((field) => {
          setStudent(res.data);
          setValue(field, res.data[0].teacher[field]);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [id, setStudent, setValue]);

  React.useEffect(() => {
    GetTeacherById();
  }, [GetTeacherById, id]);

  return (
    <div>
      <div>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Box display="flex">
              <Box
                flex={1}
                justifyItems="center"
                sx={{ p: 2, mr: 1, border: "1px dashed grey" }}
              >
                <Box sx={{ p: 3, mr: 4, ml: 4, mt: 2 }}>
                  <Link>
                    <QRCode
                      size={200}
                      value={data.school_code_url || "www.google.com"}
                    />
                  </Link>
                </Box>
              </Box>
              <Box flex={2} mr="0.5em">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <TextField
                      style={{ marginTop: 16 }}
                      disabled
                      fullWidth
                      type="text"
                      label="ชื่อ"
                      size="small"
                      {...register("teacher_thai_firstname")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      style={{ marginTop: 16 }}
                      fullWidth
                      type="text"
                      label="นามสกุล"
                      size="small"
                      {...register("teache_thai_lastname")}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <TextField
                      style={{ marginTop: 16 }}
                      disabled
                      fullWidth
                      label="ชื่อเล่น"
                      type="text"
                      size="small"
                      {...register("teacher_nick_name")}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
              onClick={() => navigate(`/teacher/edit/${id}`)}
            >
              แก้ไข
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/school")}
            >
              ยกเลิก
            </Button>
          </CardActions>
        </Card>
      </div>
      <Box sx={{ height: 450, width: "100%", mt: 3 }}>
        <DataGrid
          rows={student}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.student_id}
          components={{
            Toolbar: () => {
              return (
                <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      top: 10,
                      right: 10,
                    }}
                    onClick={() => navigate(`/student/add/${id}`)}
                  >
                    เพิ่มข้อมูลนักเรียน
                  </Button>
                </GridToolbarContainer>
              );
            },
          }}
        />
      </Box>
    </div>
  );
};

export default ProfileTeacher;
