import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileDetailsCard from '@/components/profile/ProfileDetailsCard';
import ShippingForm from '@/components/profile/ShippingForm';
import OrderHistory from '@/components/profile/OrderHistory';
import AccountActions from '@/components/profile/AccountActions';
import { deleteUserAccount } from '@/api/userApi';

export default function UserProfilePage() {
  const { user, logout } = useAuthStore();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account?')) return;
    try {
      if (!user?._id) return;
      await deleteUserAccount(user._id);
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return <div className="text-center py-10">Loading user...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-10">
      <ProfileHeader user={user} />
      <ProfileDetailsCard user={user} />
      <ShippingForm userId={user._id} />
      <OrderHistory userId={user._id} />
      <AccountActions onDelete={handleDelete} onLogout={logout} />
    </div>
  );
}
