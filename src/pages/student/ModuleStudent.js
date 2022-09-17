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
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";

const ModuleStudent = () => {
  const navigate = useNavigate();
  const { id, studentId, moduleId } = useParams();
  const [module, setModule] = React.useState([]);

  const columns = [
    {
      field: "submodule_name",
      headerName: "ชื่อ",
      width: 200,
    },
    {
      field: "submodule_description",
      headerName: "รายละเอียด",
      align: "center",
      width: 200,
    },
    {
      field: "submodule_level",
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
            onClick={() => navigate(`/student/${studentId}/submodule/${params.row.submodule_id}`)}
          >
            ดูรายละเอียดหน่วยการเรียนรู้
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
      .get(
        `${process.env.REACT_APP_API}/student/${studentId}/module/${moduleId}`
      )
      .then((res) => {
        setModule(res.data)
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  React.useEffect(() => {
    GetModuleById();
  }, []);

  return (
    <div>
      <Box sx={{ height: 450, width: "100%", mt: 3 }}>
        <DataGrid
          rows={module}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.submodule_id}
        />
      </Box>
    </div>
  );
};

export default ModuleStudent;
