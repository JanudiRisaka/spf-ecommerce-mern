import { User } from '@/types';
import { Avatar } from '@mui/material';

export interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Hi, {user.name}!</h1>
      <p className="text-gray-600">Welcome back! Happy shopping!</p>
      <div className="flex justify-center mt-4">
        <Avatar alt={user.name} src="/avatar.png" sx={{ width: 100, height: 100 }} />
      </div>
    </div>
  );
}
