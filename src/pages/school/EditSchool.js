import {
  Grid,
  Card,
  Button,
  TextField,
  InputLabel,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

function EditSchool() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setValue, register, handleSubmit } = useForm()

  const GetSchoolById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school/teacher/${id}`)
      .then((res) => {
        const fields = [
          'school_thai_name',
          'school_address_number',
          'school_zone',
          'school_english_name',
          'school_road',
          'school_subdistrict',
          'school_district',
          'school_province',
          'school_postcode',
          'teacher',
        ]
        fields.forEach((field) => {
          setValue(field, res.data[0][field])
        })
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue])

  const onEditSchool = async (data) => {
    await axios
      .patch(`${process.env.REACT_APP_API}/school/${id}`, {
        school_thai_name: data.school_thai_name,
        school_address_number: data.school_address_number,
        school_zone: data.school_zone,
        school_english_name: data.school_english_name,
        school_road: data.school_road,
        school_subdistrict: data.school_subdistrict,
        school_district: data.school_district,
        school_province: data.school_province,
        school_postcode: data.school_postcode,
      })
      .then(async () => {
        await toast.success('บันทึกข้อมูลเรียบร้อยแล้ว')
        await navigate(`/school/profile/${id}`)
      })
      .catch((err) => toast.error(err))
  }

  React.useEffect(() => {
    GetSchoolById()
  }, [GetSchoolById, id])

  return (
    <div>
      <form onSubmit={handleSubmit(onEditSchool)}>
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
                <InputLabel size="small">ชื่อโรงเรียน</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  size="small"
                  {...register("school_thai_name")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">ชื่อโรงเรียนภาษาอังกฤษ</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  size="small"
                  {...register("school_english_name")}
                />
              </Grid>
              <br />
              <Grid item xs={6}>
                <InputLabel size="small">ที่อยู่</InputLabel>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  type="text"
                  size="small"
                  {...register("school_address_number")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">โซน</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_zone")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">ถนน</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_road")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">ตำบล</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_subdistrict")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">อำเภอ</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_district")}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel size="small">จังหวัด</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_province")}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel size="small">รหัสไปรษณีย์</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  style={{ marginTop: 16 }}
                  {...register("school_postcode")}
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

export default EditSchool
