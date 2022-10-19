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
      <section
        className="flex flex-col flex-shrink justify-between items-center lg:w-1/3 
      w-11/12 mx-auto bg-white px-10 py-8 lg:h-[80vh] h-[50vh] rounded-md shadow-md"
      >
        <div className="flex flex-col items-center md:gap-y-2 gap-y-1.5 h-1/2">
          <img
            className="inline-block md:h-20 h-14 md:w-20 w-14 object-cover rounded-full"
            src={user.profileImage || placeholder}
            alt="profile"
          />
          <h2 className="lg:text-2xl text-lg font-semibold">{`${user.firstName} ${user.lastName}, ${userAge}`}</h2>
          <p className="text-gray-400 lg:text-base text-sm font-light">
            {currentJob}
          </p>
          <div>
            <Button
              buttonType="button"
              onClick={() => openModalHandler(true)}
              actionType="primary"
            >
              <FaUserEdit />
              Edit Profile
            </Button>
          </div>
        </div>
        {user.about ? (
          <div className="flex flex-col items-center md:justify-start justify-center md:h-1/2 w-full gap-y-4 overflow-auto md:pt-0 pt-20">
            <h2 className="font-semibold md:text-lg text-base">
              About {user.firstName}
            </h2>
            <p className="text-gray-500 md:text-sm text-xs text-justify">
              {user.about}
            </p>
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
