import { IconButtonProps } from '@mui/material/IconButton';



export interface onEditProfileResponse {
  ok: boolean;
  message: string;
}




export interface HighlightedCardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  userRefetch: () => void;
}

export interface MainGridProps {
  user: {
    id: number;
  name: string;
  email: string;
  };
  onEditProfile : (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;

  userRefetch: () => void;
}

export interface DashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onLogout: () => void;
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  userRefetch: () => void;
}

export interface SideMenuMobileProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
}

export interface SideMenuProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;

}

export interface CopyrightProps {
  sx?: object;
}

export interface OptionsMenuProps {
  onLogout: () => void;
}

export interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
}

export interface AppNavbarProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
}

export interface onLoginResponse {
  message: string,
  results: string
}
