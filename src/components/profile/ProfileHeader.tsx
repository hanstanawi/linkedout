import { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';

import placeholder from 'assets/profile-placeholder.png';
import UpdateUser from 'components/users/UpdateUser';
import {
  formatBirthDateAsAge,
  formatCurrentExperience,
} from 'helpers/format.helpers';

type ProfileHeaderProps = {
  user: IUser;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userAge = formatBirthDateAsAge(user.birthDate);
  const currentJob = formatCurrentExperience(user);

  const openModalHandler = (state: boolean) => {
    setIsModalOpen(state);
  };

  return (
    <>
      <section className="flex flex-col flex-shrink justify-center items-center w-1/3 mx-auto bg-white px-20 py-8 h-3/4 rounded-md shadow-md">
        <div className="flex flex-col items-center gap-y-2">
          <img
            className="inline-block h-20 w-20 object-cover rounded-full"
            src={user.profileImage || placeholder}
            alt="profile"
          />
          <h2 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}, ${userAge}`}</h2>
          <p className="text-gray-400 font-light">{currentJob}</p>
          <div>
            <button
              type="button"
              onClick={() => openModalHandler(true)}
              className="bg-blue-400 hover:bg-blue-600 text-white 
              rounded-md text-sm font-semibold py-2 px-4 flex items-center gap-x-1"
            >
              <FaUserEdit />
              Edit Profile
            </button>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <UpdateUser
          isOpen={isModalOpen}
          setOpen={openModalHandler}
          user={user}
        />
      )}
    </>
  );
}

export default ProfileHeader;
