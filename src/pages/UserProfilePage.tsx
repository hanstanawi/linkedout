import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as usersApi from 'api/users.api';

function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [getRequestStatus, setGetRequestStatus] = useState<
    'idle' | 'loading' | 'failed'
  >('idle');

  const getUserById = async (userId: string): Promise<void> => {
    if (getRequestStatus === 'idle') {
      try {
        setGetRequestStatus('loading');
        const user = await usersApi.getUser(userId);
        setUser(user);
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
  }, [userId]);

  let content;

  if (getRequestStatus === 'loading') {
    content = <p>Loading</p>;
  } else if (getRequestStatus === 'idle' && user) {
    content = <p>{JSON.stringify(user)}</p>;
  }

  return <section>{content}</section>;
}

export default UserProfilePage;
