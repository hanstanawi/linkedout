import placeholder from 'assets/profile-placeholder.png';
import { formatBirthDateAsAge } from 'helpers/format.helpers';

type ProfileHeaderProps = {
  user: IUser;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
  const userAge = formatBirthDateAsAge(user.birthDate);
  return (
    <section className="flex flex-col flex-shrink justify-center items-center w-1/3 mx-auto bg-white px-20 py-8 h-3/4 rounded-md">
      <div className="flex flex-col items-center gap-y-2">
        <img
          className="inline-block h-20 w-20 object-cover rounded-full"
          src={user.profileImage || placeholder}
          alt="profile"
        />
        <h2 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}, ${userAge}`}</h2>
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
    </section>
  );
}

export default ProfileHeader;
