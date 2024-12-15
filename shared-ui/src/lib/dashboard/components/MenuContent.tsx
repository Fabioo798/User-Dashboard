import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { useNavigate } from 'react-router-dom';
import { MenuContentProps } from '../interfaces';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/dashboard' },
];

const adminListItems = [
  { text: 'Create', icon: <CreateRoundedIcon />, path: '/dashboard/create' },
];

const MenuContent: React.FC<MenuContentProps> = ({ user, onCreateUserClick, onHomeClick }) => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => {
              if (item.text === 'Home') {
                onHomeClick();
              }
              navigate(item.path);
            }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {user.role === 'admin' && adminListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={item.text === 'Create' ? onCreateUserClick : () => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

export default MenuContent;
