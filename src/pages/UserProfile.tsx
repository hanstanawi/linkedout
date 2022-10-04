import { useParams } from 'react-router-dom';

import ProfileHeader from 'components/profile/ProfileHeader';
import ExperiencesList from 'components/experiences/ExperiencesList';
import { useAppSelector } from 'hooks/useAppSelector';
import { getUserById, getUsersStatus } from 'app/slices/users.slice';
import LoadingSpinner from 'components/layout/LoadingSpinner';

function UserProfilePage() {
  const { userId } = useParams();

  const user = useAppSelector(getUserById(userId));
  const requestStatus = useAppSelector(getUsersStatus);

  let content;

  if (requestStatus === 'loading') {
    content = (
      <div className="flex justify-center items-center h-[28rem]">
        <LoadingSpinner color="rgb(96 165 250)" size={60} />
      </div>
    );
  } else if (requestStatus === 'succeeded' && user) {
    content = (
      <div className="py-10 flex gap-x-8 min-h-full">
        <ProfileHeader user={user} />
        <ExperiencesList experiences={user.workExperiences} userId={user.id} />
      </div>
    );
  } else if (requestStatus === 'succeeded' && !user) {
    content = (
      <div className="flex justify-center items-center h-[28rem]">
        <h1>User not found</h1>
      </div>
    );
  }

  return <section className="container mx-auto h-full">{content}</section>;
}

export default UserProfilePage;
