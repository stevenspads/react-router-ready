import { useUser } from '@clerk/clerk-react';

export default function useAdmin() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return user.organizationMemberships.some((item) => item.role === 'admin');
}
