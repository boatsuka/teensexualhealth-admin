<<<<<<< HEAD
import React from "react";
import * as axios from "axios";
import { useForm } from "react-hook-form";
import { Box, Card, CardContent, CardMedia } from "@mui/material";

function Login() {
  const { register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="/static/img/next_login.jpg"
            title="Contemplative Reptile"
          />
          <CardContent></CardContent>
        </Card>

        <style jsx global>
          {`
            body {
              min-height: 100vh;
              position: relative;
              margin: 0;
              background-size: cover;
              background-image: url("/static/img/bg4.jpg");
              text-align: center;
            }
          `}
        </style>
      </Box>
    </React.Fragment>
  );
}

export default Login;
=======
import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login
>>>>>>> be0301d9262fccc941024d885b597fe39a82c085
