import {
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddSchool() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit()}>
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
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  label="ชื่อโรงเรียน"
                  size="small"
                  {...register("school_thai_name")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  label="ชื่อโรงเรียนภาษาอังกฤษ"
                  size="small"
                  {...register("school_english_name")}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  label="ที่อยุ่"
                  type="text"
                  size="small"
                  {...register("school_address_number")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="โซน"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_zone")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="ถนน"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_road")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="ตำบล"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_subdistrict")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="อำเภอ"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_district")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="จังหวัด"
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_province")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="รหัสไปรษณีย์"
                  style={{ marginTop: 16 }}
                  {...register("school_postcode")}
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

export default AddSchool;
