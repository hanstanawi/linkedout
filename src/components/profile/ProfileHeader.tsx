import placeholder from 'assets/profile-placeholder.png';
import { formatBirthDateAsAge } from 'helpers/format.helpers';

type ProfileHeaderProps = {
  user: IUser;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
  const userAge = formatBirthDateAsAge(user.birthDate);
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-5xl mx-auto bg-white px-20 py-8">
      <div className="flex flex-col items-center gap-y-2">
        <img
          className="inline-block h-24 w-24 object-cover rounded-full"
          src={user.profileImage || placeholder}
          alt="profile"
        />
        <h2 className="text-3xl font-bold">{`${user.firstName} ${user.lastName}, ${userAge}`}</h2>
        <p>{user.about}</p>
        <div>
          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-semibold py-2 px-4"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
