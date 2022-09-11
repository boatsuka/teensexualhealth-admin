import {
  Grid,
  Card,
  Button,
  TextField,
  InputLabel,
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

function EditSchool() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setValue, register, handleSubmit } = useForm();

  const GetSchoolById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school/teacher/${id}`)
      .then((res) => {
        const fields = [
          "module_name",
          "module_level",
          "module_description",
          "module_image_path",
          "module_legth",
        ];
        fields.forEach((field) => {
          setValue(field, res.data[0][field]);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [id, setValue]);

  const onEditSchool = async (data) => {
    await axios
      .patch(`${process.env.REACT_APP_API}/module/${id}`, {
        module_name: "string",
        module_level: "string",
        module_description: "string",
        module_image_path: "string",
        module_legth: 0,
      })
      .then(async () => {
        await toast.success("บันทึกข้อมูลเรียบร้อยแล้ว");
        await navigate(`/module`);
      })
      .catch((err) => toast.error(err));
  };

  React.useEffect(() => {
    GetSchoolById();
  }, [GetSchoolById, id]);

  return (
    <div>
      <form onSubmit={handleSubmit(onEditSchool)}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h6">
              ฟอร์มกรอกข้อมูลหน่วยการเรียนรู้
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
                <InputLabel size="small">ระดับกาเรียนรู้</InputLabel>
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

export default EditSchool;
