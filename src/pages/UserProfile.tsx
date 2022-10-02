import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as usersApi from 'api/users.api';
import ProfileHeader from 'components/profile/ProfileHeader';
import ExperiencesList from 'components/experiences/ExperiencesList';

function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [getRequestStatus, setGetRequestStatus] = useState<
    'idle' | 'loading' | 'failed'
  >('idle');

  const getUserById = async (id: string): Promise<void> => {
    if (getRequestStatus === 'idle') {
      try {
        setGetRequestStatus('loading');
        const fetchedUser = await usersApi.getUser(id);
        setUser(fetchedUser);
        setGetRequestStatus('idle');
      } catch (err) {
        setGetRequestStatus('failed');
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!user) {
    return (
      <section>
        <h1>User not found</h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto h-full">
      <div className="py-10 flex gap-x-8 min-h-full">
        <ProfileHeader user={user} />
        <ExperiencesList experiences={user.workExperiences} />
      </div>
    </section>
  );
}

export default UserProfilePage;
