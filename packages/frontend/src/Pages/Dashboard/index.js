import React from 'react';
import { useUser } from '../../api'; 
import ProfileSidebar from '../../Components/ProfileSidebar';

export const Dashboard = () => {
  const user = useUser();
  if (!user) return <></>;
  return (
    <div>
      <ProfileSidebar />
    </div>
  )
}