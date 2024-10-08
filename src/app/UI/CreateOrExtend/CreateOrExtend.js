import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckUser from './CheckUser';

const CreateOrExtend = ({userRole}) => {
  return (
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Hope Member Registration Form
          </Typography>
          <CheckUser userRole={userRole}/>
        </Box>
  )
}

export default CreateOrExtend