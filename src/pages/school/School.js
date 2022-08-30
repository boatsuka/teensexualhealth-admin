import React from "react";
import * as axios from "axios";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { Box, Button, Link } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";


function School() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  const columns = [
    {
      field: "school_thai_name",
      headerName: "ชื่อโรงเรียน",
      width: 250,
    },
    {
      field: "school_english_name",
      headerName: "ชื่อโรงเรียน อังกฤษ",
      width: 300,
    },
    {
      field: "school_code_url",
      headerName: "ลิ้งค์",
      align:'center',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ justifyContent: "center" }}>
          <Link
            onClick={() => window.open(params.row.school_code_url, "_blank")}
          >
            <QRCode size="128" value={params.row.school_code_url} />
          </Link>
        </Box>
      ),
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
            onClick={() => console.log(params.id)}
          >
            ดูข้อมูล
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => console.log(params.id)}
          >
            แก้ไขข้อมูล
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            onClick={() => console.log(params.id)}
          >
            ลบข้อมูล
          </Button>
        </>,
      ],
    },
  ];

  const GetSchoolData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    GetSchoolData();
  }, []);

  return (
    <div>
      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowHeight={150}
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
                    onClick={() => navigate("/school/add")}
                  >
                    เพิ่มข้อมูลโรงเรียน
                  </Button>
                </GridToolbarContainer>
              );
            },
          }}
          getRowId={(row) => row.school_id}
        />
      </Box>
    </div>
  );
}

export default School;
