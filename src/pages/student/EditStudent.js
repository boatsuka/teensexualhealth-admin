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
  NativeSelect,
} from "@mui/material";
import React from "react";
import * as axios from "axios";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = React.useState([])
  const [data, setData] = React.useState([])
  const { setValue, register, handleSubmit } = useForm();

  const avatar = [
    "http://www.teen-sexualhealth.com/api/files/upload/bear.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy1.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy2.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy3.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy4.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy5.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy6.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy7.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy8.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy9.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy10.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy11.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy12.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/boy13.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl1.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl2.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl3.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl4.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl5.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl6.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl7.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl8.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl9.jpg",
    "http://www.teen-sexualhealth.com/api/files/upload/girl10.jpg",
  ];

  const GetLocalStorage = () => {
    setTeacher(localStorage.getItem('teacher_id'))
  }

  const GetStudentById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/${id}`)
      .then((res) => {
        const fields = [
          "student_fisrtname",
          "student_lastname",
          "student_level",
          "student_dragdrop",
          "student_nickname",
          "student_study_year",
          "student_initial_name",
          "student_name_sound_path",
        ];
        fields.forEach((field) => {
          setData(res.data)
          setValue(field, res.data[field]);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [id, setValue]);

  const onEditStudent = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/student/edit/${id}`, {
        student_fisrtname: data.student_fisrtname,
        student_lastname: data.student_lastname,
        student_level: data.student_level,
        student_nickname: data.student_nickname,
        student_study_year: data.student_study_year,
        student_initial_name: data.student_initial_name,
        student_dragdrop: data.student_dragdrop,
        student_avatar_path: data.student_avatar_path,
      })
      .then(async (res) => {
        await toast.success('บันทึกข้อมูลเรียบร้อยแล้ว')
        await navigate(`/teacher/profile/${teacher}`)
      })
      .catch((err) => toast.error(err));
  };

  React.useEffect(() => {
    GetStudentById();
    GetLocalStorage();
  }, [GetStudentById, id]);

  return (
    <div>
      <form onSubmit={handleSubmit(onEditStudent)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h6">
              ฟอร์มกรอกข้อมูลลงทะเบียนนักเรียน {data.student_nickname}
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <InputLabel>เพศนักเรียน</InputLabel>
                <NativeSelect
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  defaultValue={data.student_initial_name}
                  {...register("student_initial_name")}
                >
                  <option key="เด็กชาย" value="เด็กชาย">เด็กชาย</option>
                  <option key="เด็กหญิง" value="เด็กหญิง">เด็กหญิง</option>
                  <option key="นาย" value="นาย">นาย</option>
                  <option key="นางสาว" value="นางสาว">นางสาว</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>ชื่อ</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  size="small"
                  {...register("student_fisrtname")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>นามสกุล</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  size="small"
                  {...register("student_lastname")}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <InputLabel>ชื่อเล่น</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  size="small"
                  {...register("student_nickname")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>ระดับความสามารถ</InputLabel>
                <NativeSelect
                  fullWidth
                  size="small"
                  label="ระดับความสามารถ"
                  style={{ marginTop: 16 }}
                  defaultValue={data.student_level}
                  {...register("student_level")}
                >
                  <option key={0} value={0}>Basic</option>
                  <option key={1} value={1}>Advance</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>ระดับชั้นปี</InputLabel>
                <NativeSelect
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  defaultValue={data.student_study_year}
                  {...register("student_study_year")}
                >
                  <option key={1} value={1}>มัธยมศึกษาปีที่ 1</option>
                  <option key={2} value={2}>มัธยมศึกษาปีที่ 2</option>
                  <option key={3} value={3}>มัธยมศึกษาปีที่ 3</option>
                  <option key={4} value={4}>มัธยมศึกษาปีที่ 4</option>
                  <option key={5} value={5}>มัธยมศึกษาปีที่ 5</option>
                  <option key={6} value={6}>มัธยมศึกษาปีที่ 6</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>ความสามารถในการ dragdrop</InputLabel>
                <NativeSelect
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  defaultValue={data.student_dragdrop}
                  {...register("student_dragdrop")}
                >
                  <option value={true}>ทำได้</option>
                  <option value={false}>ทำไม่ได้</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>รูปภาพ</InputLabel>
                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  style={{ marginTop: 16 }}
                  defaultValue={data.student_avatar_path}
                  {...register("student_avatar_path")}
                >
                  {avatar.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      <img src={item} alt="avatar" width={128} height={128} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              บันทึก
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default EditStudent;
