import { useParams } from 'react-router-dom';

import ProfileHeader from 'components/profile/ProfileHeader';
import ExperiencesList from 'components/experiences/ExperiencesList';
import { useAppSelector } from 'hooks/useAppSelector';
import { getUserById } from 'app/slices/users.slice';

function UserProfilePage() {
  const { userId } = useParams();

  const user = useAppSelector(getUserById(userId));

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
        <ExperiencesList experiences={user.workExperiences} userId={user.id} />
      </div>
    </section>
  );
}

export default UserProfilePage;
