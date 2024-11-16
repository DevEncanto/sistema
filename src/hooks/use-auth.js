import { useContext } from 'react';
import { AuthContext } from '../contexts/contexts/auth.context';

export const useAuth = () => useContext(AuthContext);
