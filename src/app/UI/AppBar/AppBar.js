import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({setPage, signOut, userRole}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //Check if the user is Admin or not
  const navItems = userRole !== 'admin' ? ['အသစ်သွင်းခြင်း', 'သက်တမ်းတိုးခြင်း'] : ['အသစ်သွင်းခြင်း', 'သက်တမ်းတိုးခြင်း', 'ဖောင်အဖွင့်အပိတ်'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log('opennev')
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log('openuser')
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setPage()
  };

  const handleCloseUserMenu = (event, setting) => {
    setAnchorElUser(null);
    if(setting == 'Logout')
    {
      signOut()
    }
    
  };

  const handleClick = (page) => {
    console.log(page)
    if(page == 'အသစ်သွင်းခြင်း')
    {
        console.log(page)
        setPage(1);
    }
    else if(page == 'ဖောင်အဖွင့်အပိတ်')
    {
        console.log(page)
        setPage(3);
    }
    else
    {
      setPage(2);
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hope
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1}}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => handleClick(item)}>
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(event) => handleCloseUserMenu(event, setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;