import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from 'assets/profile-placeholder.png';

import * as usersApi from 'api/users.api';
import { formatBirthDateAsAge } from 'helpers/format.helpers';

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
  const userAge = formatBirthDateAsAge(user.birthDate);

  return (
    <section className="py-10">
      <div className="flex flex-col justify-center items-center w-full max-w-5xl mx-auto bg-white px-20 py-8">
        <div className="flex flex-col items-center gap-y-2">
          <img
            className="inline-block h-24 w-24 object-cover rounded-full"
            src={user.profileImage || placeholder}
            alt="profile"
          />
          <h2 className="text-3xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
          <p>{user.about}</p>
          <p>{userAge}</p>
          <div>
            <button
              type="button"
              className="bg-blue-400 text-white rounded-md text-sm font-semibold py-2 px-4"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfilePage;
