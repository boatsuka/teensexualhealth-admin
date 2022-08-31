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

const ProfileStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setValue, register } = useForm();
  const [module, setModule] = React.useState([]);

  const columns = [
    {
      field: "module_name",
      headerName: "ชื่อ",
      width: 200,
    },
    {
      field: "module_description",
      headerName: "รายละเอียด",
      align: "center",
      width: 200,
    },
    {
      field: "module_level",
      headerName: "ระดับของหน่วยการเรียนรู้",
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
            onClick={() => navigate(`/student/${id}/module/${params.id}`)}
          >
            ดูข้อมูลหน่วยการเรีนรู้ย่อย
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => navigate(`/student/edit/${params.id}`)}
          >
            แก้ไขข้อมูล
          </Button>
        </>,
      ],
    },
  ];

  // const GetTeacherById = React.useCallback(async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API}/student/teacherbystudent/${id}`)
  //     .then((res) => {
  //       const fields = [
  //         "teacher_thai_firstname",
  //         "teache_thai_lastname",
  //         "teacher_nick_name",
  //         "school_id",
  //       ];
  //       fields.forEach((field) => {
  //         setStudent(res.data);
  //         setValue(field, res.data[0].teacher[field]);
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error(err);
  //     });
  // }, [id, setStudent, setValue]);

  // React.useEffect(() => {
  //   GetTeacherById();
  // }, [GetTeacherById, id]);

  const GetModuleById = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/info/${id}`)
      .then((res) => {
        setModule(res.data[0].listModules);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  React.useEffect(() => {
    GetModuleById();
  });

  return (
    <div>
      <Box sx={{ height: 450, width: "100%", mt: 3 }}>
        <DataGrid
          rows={module}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.module_id}
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

export default ProfileStudent;
