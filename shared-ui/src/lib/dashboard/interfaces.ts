import { IconButtonProps } from '@mui/material/IconButton';
import SelectContent from './components/SelectContent';



export interface onEditProfileResponse {
  ok: boolean;
  message: string;
}

export interface onRetriEveResponse {
  results: [];
}

export interface createUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: "admin" | "user";
}


export interface UserProfileCardProps {
  user: User;
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  userRefetch: () => void;
}

export interface NavbarProps {
  showCreateUser: boolean;
}

export interface MainGridProps {
  user: User;
  allUsers: User[];
  onEditProfile : (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  userRefetch: () => void;
  handleRetrieve: () => Promise<handleRetrieveResponse>;
  handleRemove: (id: number) => void;
  handleCreateUser: (newUser: createUser) => Promise<{ ok: boolean; message: string }>;
  showCreateUser: boolean;

}

export interface MenuContentProps {
  user: User;
  onCreateUserClick: () => void
  onHomeClick: () => void;
}
export interface UserAdminProfileCardsProps {
  user: User;
  allUsers: User[];
  onEditProfile : (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  userRefetch: () => void;
  handleRetrieve: () => Promise<handleRetrieveResponse>;
  handleRemove: (id: number) => void;

}

export interface UseHandleRetrieveReturnType {
  handleRetrieve: () => Promise<handleRetrieveResponse>;
  data: onRetriEveResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface handleRetrieveResponse {
  results: User[]
}

export interface DashboardProps {
  user: User
  onLogout: () => void;
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  userRefetch: () => void;
  allUsers: User[];
  handleRetrieve: () => Promise<handleRetrieveResponse>;
  handleRemove: (id: number) => void;
  handleCreateUser: (newUser: createUser) => Promise<{ ok: boolean; message: string }>;
  onCreateUserClick: () => void;
}

export interface SideMenuMobileProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
  user: User
  onLogout: () => void;
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  onCreateUserClick: () => void;
  onHomeClick: () => void;
}

export interface SideMenuProps {
  user: User;
  onLogout: () => void;
  onCreateUserClick: () => void;
  onHomeClick: () => void;

}

export interface CopyrightProps {
  sx?: object;
}

export interface SelectContentProps {
  user: User
}

export interface OptionsMenuProps {
  onLogout: () => void;
}

export interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
}

export interface AppNavbarProps {
  user: User
  onLogout: () => void;
  onEditProfile: (updatedUser: { id: number; name: string; email: string }) => Promise<onEditProfileResponse>;
  onCreateUserClick: () => void;
  onHomeClick: () => void;
}

export interface onLoginResponse {
  message: string,
  results: string
}

export interface CreateUserProps {
  handleCreateUser: (newUser: createUser ) => Promise<{ ok: boolean; message: string }>;
}
