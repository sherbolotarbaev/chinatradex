type UserRole = 'USER' | 'ADMIN';

type User = {
  id: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username: string;
  photo?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;

  metaData: UserMetaData[];
};

type UserMetaData = {
  userId: number;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  lastVisit: string;
};
