import { User } from '@/types';

export interface ProfileDetailsCardProps {
  user: User;
}

export default function ProfileDetailsCard({ user }: ProfileDetailsCardProps) {
  const createdAt = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Member Since:</strong> {createdAt}</p>
      </div>
    </div>
  );
}
