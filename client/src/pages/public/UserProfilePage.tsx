// ----------------- START OF CORRECTED UserProfilePage.tsx -----------------

import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileDetailsCard from '@/components/profile/ProfileDetailsCard';
import ShippingForm from '@/components/profile/ShippingForm';
import OrderHistory from '@/components/profile/OrderHistory';
import AccountActions from '@/components/profile/AccountActions';
import { deleteUser } from '@/api/userApi';
import { toast } from 'sonner'; // <-- 1. FIX: Use 'sonner' for consistency
import { useNavigate } from 'react-router-dom'; // For redirecting
import { useEffect } from 'react';

export default function UserProfilePage() {
  // Use the selector pattern to get state
  const { user, token, logout } = useAuthStore((state) => state);
  const navigate = useNavigate();

  // --- 2. THE MAIN FIX: Handle the case where the user is not logged in ---
  // This effect will run if the user logs out while on the page, or if they try to access it directly.
  useEffect(() => {
    if (!user) {
      // Redirect to login page if there's no user
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      // We already know user and token exist because of the check above
      try {
        await deleteUser(user!._id, token!);
        toast.success("Your account has been deleted.");
        logout(); // This will trigger the useEffect above to redirect
      } catch (error) {
        toast.error("Failed to delete account.");
        console.error(error);
      }
    }
  };

  // --- 3. RENDER a loading state or nothing while the check runs ---
  if (!user) {
    // Or return a <LoadingPage /> component
    return <div>Loading profile...</div>;
  }

  // If we get here, TypeScript knows 'user' is not null.
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-10">
      <ProfileHeader user={user} />
      <ProfileDetailsCard user={user} />
      <ShippingForm userId={user._id} />
      <OrderHistory userId={user._id} />

      {/* --- 4. FIX: Pass the correct function name --- */}
      <AccountActions onDelete={handleDeleteAccount} onLogout={logout} />
    </div>
  );
}

// ----------------- END OF CORRECTED UserProfilePage.tsx -----------------