import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Toolbar,
  Typography,
  InputLabel,
} from "@mui/material";
import React from "react";
import * as axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

function AddQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const AddSubQuiz = async (data) => {
    const formData = new FormData();
    const formDataAns01 = new FormData();
    const formDataAns02 = new FormData();
    formData.append("file", data.file[0]);
    formDataAns01.append("file1", data.file1[0]);
    formDataAns02.append("file2", data.file2[0]);

    axios
      .post(`${process.env.REACT_APP_API}/files/upload`, formData)
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_API}/files/upload`, formDataAns01)
          .then((res1) => {
            axios
              .post(`${process.env.REACT_APP_API}/files/upload`, formDataAns02)
              .then((res2) => {
                axios.get(`${process.env.REACT_APP_API}/quiz`, {
                  quiz_text: data.quiz_text,
                  quiz_soundpath: "string",
                  quiz_imagepath: `${process.env.REACT_APP_API}/files/upload/${res.data.path}`,
                  quiz_answer: data.quiz_answer,
                  quiz_score: data.quiz_score,
                  quiz_gender: data.quiz_gender,
                  quiz_level: data.quiz_level,
                  quiz_type: data.quiz_type,
                  quiz_text1: data.quiz_text1,
                  quiz_soundpath1: "string",
                  quiz_imagepath1: `${process.env.REACT_APP_API}/files/upload/${res1.data.path}`,
                  quiz_answer1: data.quiz_answer1,
                  quiz_text2: data.quiz_text2,
                  quiz_soundpath2: "string",
                  quiz_imagepath2: `${process.env.REACT_APP_API}/files/upload/${res2.data.path}`,
                  quiz_answer2: data.quiz_answer2,
                  ans_correct: data.ans_correct,
                  submodul: id,
                });
                toast.success("เพิ่มคำถามแล้ว");
                navigate(`/submodule`);
              });
          });
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(AddSubQuiz)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h6">
              ฟอร์มกรอกข้อมูลแบบทดสอบหน่วยการเรียนรู้ย่อย
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <InputLabel size="small">คำถาม</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_text")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">คำตอบ</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_answer")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">คะแนน</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_score")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">เพศของผู้ทำแบบทดสอบ</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_gender")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">ระดับของแบบทดสอบ</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_level")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">ประเภทของคำถาม</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_type")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">คำถามที่ 1</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_text1")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">คำตอบที่ 1</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_answer1")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">รูปภาพคำตอบที่ 1</InputLabel>
                <TextField
                  fullWidth
                  type="file"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("file1")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">คำถามที่ 2</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("ans_text2")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">คำตอบที่ 2</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("quiz_answer2")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">รูปภาพถามที่ 2</InputLabel>
                <TextField
                  fullWidth
                  type="file"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("file2")}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel size="small">คำตอบที่ถูกต้อง</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("ans_correct")}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel size="small">รูปภาพ</InputLabel>
                <TextField
                  fullWidth
                  type="file"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("file")}
                />
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

export default AddQuiz;
