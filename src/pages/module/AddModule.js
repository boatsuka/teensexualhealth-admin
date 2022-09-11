import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  Typography,
  InputLabel,
  CardActions,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import * as axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddModule() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    await axios
      .post(`${process.env.REACT_APP_API}/files/upload`, formData)
      .then((res) => {
        axios.post(`${process.env.REACT_APP_API}/school/create`, {
          module_name: data.module_name,
          module_level: data.module_level,
          module_description: data.module_description,
          module_image_path: `${process.env.REACT_APP_API}/files/upload/${res.data.path}`,
          modulecol: data.modulecol,
          module_legth: data.module_legth,
        });
        toast.success("เพิ่มข้อมูลหน่วยการเรียนรู้สำเร็จ");
        navigate("/module");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h6">
              ฟอร์มกรอกข้อมูลลงทะเบียนโรงเรียน
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <InputLabel size="small">ชื่อหน่วยการเรียนรู้</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  size="small"
                  {...register("module_name")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">
                  ระดับกาเรียนรู้
                </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  label="ระดับกาเรียนรู้"
                  style={{ marginTop: 16 }}
                  {...register("module_level")}
                >
                  <MenuItem value="A">Advance</MenuItem>
                  <MenuItem value="B">Basic</MenuItem>
                </Select>
              </Grid>
              <br />
              <Grid item xs={6}>
                <InputLabel size="small">รายละเอียด</InputLabel>
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("module_description")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">ขอบเขตหน่วยการเรียนรู้</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("module_legth")}
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

export default AddModule;
