import { Link } from 'react-router-dom';

import placeholder from 'assets/profile-placeholder.png';
import { formatCurrentExperience } from 'helpers/format.helpers';

type UserCardProps = {
  user: IUser;
};

function UserCard({ user }: UserCardProps) {
  const currentJob = formatCurrentExperience(user);

  return (
    <div className="rounded-lg bg-white py-6 px-4 text-center xl:text-left w-[230px] shadow-md">
      <div className="space-y-4 xl:space-y-4">
        <img
          className="mx-auto h-24 w-24 object-cover rounded-full xl:h-28 xl:w-28"
          src={user.profileImage || placeholder}
          alt=""
        />
        <div className="space-y-2 flex-col justify-center items-center xl:items-center xl:justify-center">
          <div className="space-y-0.5 text-lg font-medium leading-6 text-center">
            <h3 className="text-gray-700">
              {`${user.firstName} ${user.lastName}`}
            </h3>
            <p className="text-gray-500 text-sm font-light w-full">
              {currentJob}
            </p>
          </div>
          <div className="text-center w-full flex-grow-1 pt-4">
            <Link
              to={`/user/${user.id}`}
              className="bg-blue-400 hover:bg-transparent hover:text-blue-400
            hover:border hover:border-blue-400 text-white rounded-md text-sm 
            font-semibold py-2 px-4 text-center w-full"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
