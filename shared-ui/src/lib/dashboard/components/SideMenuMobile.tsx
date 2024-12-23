import { Drawer, Stack, Avatar, Typography, Divider, Button } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuContent from './MenuContent';
import { SideMenuMobileProps } from '../interfaces';



export default function SideMenuMobile({ open, toggleDrawer, user, onLogout, onEditProfile, onCreateUserClick, onHomeClick }: SideMenuMobileProps) {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
        <Stack
          direction="row"
          sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
        >
          <Avatar
            sizes="small"
            alt={user.name}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 24, height: 24 }}
          />
          <Typography component="p" variant="h6">
            {user.name}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack sx={{ flexGrow: 1 }}>
        <MenuContent user={user} onCreateUserClick={onCreateUserClick} onHomeClick={onHomeClick}/>
        <Divider />
      </Stack>
      <Stack sx={{ p: 2 }}>
        <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={onLogout}>
          Logout
        </Button>
      </Stack>
    </Drawer>
  );
}
