import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Toolbar,
  Typography,
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
    await axios
      .get(`${process.env.REACT_APP_API}/quiz`, {
        quiz_text: data.quiz_text,
        quiz_soundpath: "string",
        quiz_imagepath: "string",
        quiz_answer: data.quiz_answer,
        quiz_score: data.quiz_score,
        quiz_gender: data.quiz_gender,
        quiz_level: data.quiz_level,
        quiz_type: data.quiz_type,
        ans_text1: data.ans_text1,
        ans_soundpath1: "string",
        ans_imagepath1: "string",
        ans_text2: data.ans_text2,
        ans_soundpath2: "string",
        ans_imagepath2: "string",
        ans_correct: data.ans_correct,
        submodul: id,
      })
      .then((res) => {
        toast.success("เพิ่มคำถามแล้ว");
        navigate(`/submodule`);
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <Card>
        <Grid container>
          <form onSubmit={handleSubmit(AddQuiz)}>
            <Box p="1em">
              <Box display="flex">
                <Box flex={1} mr="1em">
                  <Typography variant="h5" gutterBottom>
                    คำถาม
                  </Typography>
                  <TextField
                    size="small"
                    type={"text"}
                    label="ชื่อ"
                    style={{ marginTop: 16 }}
                    {...register("quiz_text")}
                  />
                  <TextField
                    size="small"
                    type={"text"}
                    label="คำตอบ"
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register("quiz_answe")}
                  />
                  <TextField
                    size="small"
                    type={"text"}
                    label="คะแนน"
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register("quiz_score")}
                  />
                  <TextField
                    size="small"
                    type={"text"}
                    label="เพศ"
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register("quiz_gender")}
                  />
                  <TextField
                    size="small"
                    type={"text"}
                    label="ระดับของคำถาม"
                    style={{ marginTop: 16 }}
                    {...register("quiz_level")}
                  />
                  <TextField
                    size="small"
                    type={"text"}
                    label="ประเภทของคำถาม"
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register("quiz_type")}
                  />
                  <TextField
                    size="small"
                    type={"text"}
                    label="คำตอบข้อที่ 1"
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register("ans_text1")}
                  />
                  <TextField
                    size="small"
                    type={"text"}
                    label="คำตอบข้อที่ 2"
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register("ans_text2")}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    type={"text"}
                    label="คำตอบที่ถูกต้อง"
                    style={{ marginTop: 16 }}
                    {...register("ans_correct")}
                  />
                </Box>
              </Box>
            </Box>
            <Toolbar>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  autoFocus
                  onClick={() => navigate(`/submodule}`)}
                >
                  บันทึก
                </Button>
              </Box>
            </Toolbar>
          </form>
        </Grid>
      </Card>
    </div>
  );
}

export default AddQuiz;
