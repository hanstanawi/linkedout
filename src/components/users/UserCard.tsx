import { Link } from 'react-router-dom';

import placeholder from 'assets/profile-placeholder.png';

type UserCardProps = {
  user: IUser;
};

function UserCard({ user }: UserCardProps) {
  return (
    <div className="rounded-lg bg-white py-10 px-6 text-center xl:px-10 xl:text-left">
      <div className="space-y-6 xl:space-y-8">
        <img
          className="mx-auto h-28 w-28 object-cover rounded-full xl:h-40 xl:w-40"
          src={user.profileImage || placeholder}
          alt=""
        />
        <div className="space-y-2 xl:flex xl:items-center xl:justify-center">
          <div className="space-y-1 text-lg font-medium leading-6 text-center">
            <Link to={`/user/${user.id}`}>
              <h3 className="text-black">
                {`${user.firstName} ${user.lastName}`}
              </h3>
            </Link>
            <p className="text-gray-500 font-light">{user.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
