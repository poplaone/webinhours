
import { useAuth } from './useAuth';

export const useIsAdmin = () => {
  const { user } = useAuth();
  return user?.email === 'aaushpapta1010@gmail.com';
};
