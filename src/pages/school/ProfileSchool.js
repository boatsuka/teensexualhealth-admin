import {
  Grid,
  Card,
  Button,
  TextField,
  InputLabel,
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

function ProfileSchool() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setValue, register } = useForm();
  const [data, setData] = React.useState([]);
  const [teacher, setTeacher] = React.useState([]);

  const columns = [
    {
      field: "teacher_thai_firstname",
      headerName: "ชื่อ",
      width: 200,
    },
    {
      field: "teache_thai_lastname",
      headerName: "นามสกุล",
      width: 200,
    },
    {
      field: "teacher_nick_name",
      headerName: "ชื่อเล่น",
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
            onClick={() => navigate(`/teacher/profile/${params.id}`)}
          >
            ดูข้อมูล
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => navigate(`/teacher/edit/${params.id}`)}
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

  const GetSchoolById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school/teacher/${id}`)
      .then((res) => {
        const fields = [
          "school_thai_name",
          "school_address_number",
          "school_zone",
          "school_english_name",
          "school_road",
          "school_subdistrict",
          "school_district",
          "school_province",
          "school_postcode",
          "school_url_code",
          "school_logo_path",
          "teacher",
        ];
        fields.forEach((field) => {
          setData(res.data[0]);
          setTeacher(res.data[0].teacher);
          setValue(field, res.data[0][field]);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [id, setData, setTeacher, setValue]);

  React.useEffect(() => {
    GetSchoolById();
  }, [GetSchoolById, id]);

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
                    <img src={data.school_logo_path} alt="schoo_logo_path" />
                  </Link>
                </Box>
              </Box>
              <Box flex={2} mr="0.5em">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3, mt: 1 }}
                >
                  <Grid item xs={6}>
                    <InputLabel size="small">ชื่อโรงเรียน</InputLabel>
                    <TextField
                      style={{ marginTop: 16 }}
                      disabled
                      fullWidth
                      type="text"
                      size="small"
                      {...register("school_thai_name")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel size="small">ชื่อโรงเรียนภาษาอังกฤษ</InputLabel>
                    <TextField
                      disabled
                      style={{ marginTop: 16 }}
                      fullWidth
                      type="text"
                      size="small"
                      {...register("school_english_name")}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={6}>
                    <InputLabel size="small">ที่อยุ่</InputLabel>
                    <TextField
                      style={{ marginTop: 16 }}
                      disabled
                      fullWidth
                      type="text"
                      size="small"
                      {...register("school_address_number")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel size="small">โซน</InputLabel>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      style={{ marginTop: 16 }}
                      {...register("school_zone")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel size="small">ถนน</InputLabel>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      style={{ marginTop: 16 }}
                      {...register("school_road")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel size="small">ตำบล</InputLabel>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      style={{ marginTop: 16 }}
                      {...register("school_subdistrict")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel size="small">อำเภอ</InputLabel>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      style={{ marginTop: 16 }}
                      {...register("school_district")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel size="small">จังหวัด</InputLabel>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      style={{ marginTop: 16 }}
                      {...register("school_province")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel size="small">รหัสไปรษณีย์</InputLabel>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      style={{ marginTop: 16 }}
                      {...register("school_postcode")}
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
              onClick={() => navigate(`/school/edit/${id}`)}
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
          rows={teacher}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.teacher_id}
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
                    onClick={() => navigate("/teacher/add")}
                  >
                    เพิ่มข้อมูลครู
                  </Button>
                </GridToolbarContainer>
              );
            },
          }}
        />
      </Box>
    </div>
  );
}

export default ProfileSchool;
