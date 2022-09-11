import React from "react";
import * as axios from "axios";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";

function Module() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    GetModuleData();
  }, []);

  const columns = [
    {
      field: "module_name",
      headerName: "ชื่อหน่วยการเรียนรู้",
      width: 300,
    },
    {
      field: "module_level",
      headerName: "ระดับการเรียนรู้",
      width: 120,
    },
    {
      field: "module_description",
      headerName: "รายละเอียดหน่วยการเรียนรู้",
      width: 220,
      editable: true,
    },
    {
      field: "module_legth",
      headerName: "ขอบเขตการเรียนรู้",
      width: 150,
      editable: true,
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
            onClick={() => navigate(`/module/edit/${params.id}`)}
          >
            แก้ไขข้อมูล
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            onClick={() => onDelete(params.id)}
          >
            ลบข้อมูล
          </Button>
        </>,
      ],
    },
  ];

  const GetModuleData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/module`)
      .then((res) => setData(res.data))
      .catch((err) => toast.error(err));
  };

  const onDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/module/delete/${id}`)
      .then(() => {
        toast.success("ลบข้อมูลสำเร็จแล้ว");
        GetModuleData();
      })
      .catch((err) => {
        toast.error(`เกิดข้อผิดพลาด ${err}`);
      });
  };

  return (
    <>
      <Box sx={{ height: 600, width: "100%", top: 100 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
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
                    onClick={() => navigate("/module/add")}
                  >
                    เพิ่มข้อมูลหน่วยการเรียนรู้
                  </Button>
                </GridToolbarContainer>
              );
            },
          }}
          getRowId={(row) => row.module_id}
        />
      </Box>
    </>
  );
}

export default Module;
