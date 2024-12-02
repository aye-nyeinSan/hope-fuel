"use client";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import checkUserSubmit from "../utilites/checkUserSubmit";

export default function CheckUser({ onUserCheck, userRole }) {
  const [loading, setLoading] = useState(false);
  const [hasPermissionThisMonth, sethasPermissionThisMonth] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();

    const user = await checkUserSubmit(name, email, userRole);

    // check if the user has permission
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name,
      email,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "/api/checkolduserpermission/",
      requestOptions,
    );
    const bool = await response.json();
    console.log(bool);
    console.log("has permission answer");

    if (!bool) {
      sethasPermissionThisMonth(bool);
      setLoading(bool);
      return;
    }
    if (bool && user) {
      onUserCheck(user, true); // User exists, show ExtendForm
    } else if (!user) {
      // if user don't exist
      onUserCheck({ name, email }, false); // New user, show CreateForm
    }

    setLoading(false);
  };

  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          autoFocus
          margin="normal"
          required
          fullWidth
          name="name"
          label="Name"
          type="text"
          id="name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email Address"
          type="email"
          id="email"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Check User
        </Button>
      </Box>
      {hasPermissionThisMonth == false && (
        <h1>This user don't have permission this month anymore</h1>
      )}
    </>
  );
}
