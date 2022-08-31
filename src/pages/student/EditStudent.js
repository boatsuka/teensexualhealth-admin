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
} from "@mui/material";
import React from "react";
import * as axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setValue, register, handleSubmit } = useForm();

  const GetStudentById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/teacherbystudent/${id}`)
      .then((res) => {
        const fields = [
          "student_fisrtname",
          "student_lastname",
          "student_level",
          "student_nickname",
          "student_study_year",
          "student_initial_name",
          "teacher_id",
          "student_dragdrop",
        ];
        fields.forEach((field) => {
          setValue(field, res.data[0][field]);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [id, setValue]);

  const onEditStudent = async (data) => {
    await axios
      .patch(`${process.env.REACT_APP_API}/school/${id}`, {
        student_fisrtname: data.student_fisrtname,
        student_lastname: data.student_lastname,
        student_level: data.student_level,
        student_nickname: data.student_nickname,
        student_study_year: data.student_study_year,
        student_initial_name: data.student_initial_name,
        teacher_id: id,
        student_dragdrop: data.student_dragdrop,
      })
      .then(async () => {
        await toast.success("บันทึกข้อมูลเรียบร้อยแล้ว");
        await navigate(`/student/profile/${id}`);
      })
      .catch((err) => toast.error(err));
  };

  React.useEffect(() => {
    GetStudentById();
  }, [GetStudentById, id]);

  return (
    <div>
      <form onSubmit={handleSubmit(onEditStudent)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h6">
              ฟอร์มกรอกข้อมูลลงทะเบียนนักเรียน
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Select
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("student_initial_name")}
                >
                  <MenuItem value="นาย">นาย</MenuItem>
                  <MenuItem value="นาง">นางสาว</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  label="ชื่อ"
                  size="small"
                  {...register("student_fisrtname")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  label="นามสกุล"
                  size="small"
                  {...register("student_lastname")}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  label="ชื่อเล่น"
                  type="text"
                  size="small"
                  {...register("student_nickname")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="ระดับความสามารถ"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("student_level")}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("student_initial_name")}
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
                <Select
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("student_dragdrop")}
                >
                  <MenuItem value={true}>ทำได้</MenuItem>
                  <MenuItem value={false}>ทำไม่ได้</MenuItem>
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
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/school")}
            >
              ยกเลิก
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default EditStudent;
