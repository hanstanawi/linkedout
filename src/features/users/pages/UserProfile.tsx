import { useParams } from 'react-router-dom';

import ProfileHeader from 'features/users/components/ProfileHeader';
import ExperiencesList from 'features/experiences/components/ExperiencesList';
import { useAppSelector } from 'hooks/use-app-selector';
import { getUserById, getUsersStatus } from 'features/users/users.slice';
import LoadingSpinner from 'components/ui/LoadingSpinner';

function UserProfilePage() {
  const { userId } = useParams();

  const user = useAppSelector(getUserById(userId));
  const requestStatus = useAppSelector(getUsersStatus);

  let content;

  if (requestStatus === 'loading') {
    content = (
      <div className="flex justify-center items-center h-[28rem]">
        <LoadingSpinner color="#007CE7" size={60} />
      </div>
    );
  } else if (requestStatus === 'succeeded' && user) {
    content = (
      <div className="py-10 flex lg:flex-row flex-col lg:gap-x-8 lg:gap-y-0 gap-y-6 min-h-full">
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
