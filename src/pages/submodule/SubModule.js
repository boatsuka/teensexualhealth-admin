import React from "react";
import * as axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import { SchoolOutlined, VideoCameraFront } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

function SubModule() {
  const navigate = useNavigate();
  const [submodule, setSubModule] = React.useState([]);

  const GetSubModuleData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/submodule`)
      .then((res) => setSubModule(res.data))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    GetSubModuleData();
  }, []);

  const columns = [
    {
      field: "submodule_name",
      headerName: "ชื่อหน่วยการเรียนรู้ย่อย",
      width: 250,
    },
    {
      field: "submodule_description",
      headerName: "รายละเอียด",
      width: 300,
    },
    {
      field: "submodule_level",
      headerName: "ระดับ",
      width: 100,
    },
    {
      field: "submodule_gender",
      headerName: "เพศ",
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PreviewIcon />}
          label="Preview"
          onClick={() => navigate(`/school/${params.id}`)}
        />,
        <GridActionsCellItem
          icon={<VideoCameraFront />}
          label="Vidoe"
          onClick={() => navigate(`/submodule/add/vdo/${params.id}`)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => navigate(`/submodule/add/quiz/${params.id}`)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => console.log(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%", top: 100 }}>
        <DataGrid
          rows={submodule}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.submodule_id}
        />
      </Box>
    </>
  );
}

export default SubModule;
