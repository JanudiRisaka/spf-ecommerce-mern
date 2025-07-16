import { Button } from '@/components/ui/button';

export interface AccountActionsProps {
  onDelete: () => void;
  onLogout: () => void;
}

export default function AccountActions({ onDelete, onLogout }: AccountActionsProps) {
  return (
    <div className="space-y-4 text-right mt-6">
      <Button variant="destructive" onClick={onDelete}>
        Delete Account
      </Button>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
}
