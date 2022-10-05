import { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';

import placeholder from 'assets/profile-placeholder.png';
import UpdateUser from 'features/users/components/modals/UpdateUser';
import {
  formatBirthDateAsAge,
  formatCurrentExperience,
} from 'features/users/helpers/format.helpers';
import Button from 'components/ui/Button';

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
      <section className="flex flex-col flex-shrink justify-between items-center w-1/3 mx-auto bg-white px-10 py-8 h-[80vh] rounded-md shadow-md">
        <div className="flex flex-col items-center gap-y-2 h-1/2">
          <img
            className="inline-block h-20 w-20 object-cover rounded-full"
            src={user.profileImage || placeholder}
            alt="profile"
          />
          <h2 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}, ${userAge}`}</h2>
          <p className="text-gray-400 font-light">{currentJob}</p>
          <div>
            <Button onClick={() => openModalHandler(true)}>
              <FaUserEdit />
              Edit Profile
            </Button>
          </div>
        </div>
        {user.about ? (
          <div className="flex flex-col items-center justify-start h-1/2 w-full gap-y-4 overflow-auto">
            <h2 className="font-semibold text-lg">About {user.firstName}</h2>
            <p className="text-gray-500 text-sm text-justify">{user.about}</p>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center w-full gap-y-1">
            <h3 className="text-md font-semibold">No Description</h3>
            <p className="text-xs font-light">
              Click Edit Profile to tell more about yourself
            </p>
          </div>
        )}
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
