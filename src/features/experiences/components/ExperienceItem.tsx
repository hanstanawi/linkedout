import { useState } from 'react';
import { FaTrashAlt, FaPen, FaSuitcase } from 'react-icons/fa';
import { formatDate } from 'features/users/helpers/format.helpers';

import UpdateExperience from './modals/UpdateExperience';
import DeleteExperience from './modals/ConfirmDelete';

type ExperienceItemProps = {
  experience: IExperience;
  userId: string;
};

function ExperienceItem({ experience, userId }: ExperienceItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const checkEndDate = () => {
    if (experience.isCurrent && !experience.endDate) {
      return 'Current';
    }
    return formatDate(experience.endDate || '');
  };
  const startDate = formatDate(experience.startDate);
  const endDate = checkEndDate();

  const openModalHandler = (state: boolean) => {
    setIsModalOpen(state);
  };

  const openConfirmDeleteHandler = (state: boolean) => {
    setIsConfirmDelete(state);
  };

  return (
    <>
      <li
        className="w-full flex md:flex-row flex-col md:justify-between md:items-start items-center 
      md:gap-x-4 md:gap-y-0 gap-x-0 gap-y-4 pb-4"
      >
        <div className="flex-shrink-0">
          {experience.companyLogo ? (
            <img
              className="inline-block md:h-16 h-12 md:w-16 w-12 object-cover rounded-full"
              src={experience.companyLogo}
              alt="profile"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-100  flex justify-center items-center">
              <FaSuitcase size={40} color="rgb(75 85 99)" />
            </div>
          )}
        </div>
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center">
            <h3 className="md:text-lg text-base font-semibold">
              {experience.jobTitle}
            </h3>
            <div className="flex items-start">
              <button
                type="button"
                onClick={() => openModalHandler(true)}
                className="bg-transparent py-1 px-3 md:text-sm text-xs"
              >
                <FaPen color="rgb(107 114 128)" />
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmDelete(true)}
                className="bg-transparent py-1 px-3 md:text-sm text-xs"
              >
                <FaTrashAlt color="rgb(220 38 38)" />
              </button>
            </div>
          </div>
          <h4 className="md:text-base text-sm">{experience.companyName}</h4>
          <p className="text-gray-400 font-light md:text-sm text-xs py-1">{`${startDate} - ${endDate}`}</p>
          <p className="md:text-sm text-xs text-gray-500">
            {experience.jobDescription}
          </p>
        </div>
      </li>
      {isConfirmDelete && (
        <DeleteExperience
          experience={experience}
          isOpen={isConfirmDelete}
          setOpen={openConfirmDeleteHandler}
        />
      )}
      {isModalOpen && (
        <UpdateExperience
          userId={userId}
          isOpen={isModalOpen}
          setOpen={openModalHandler}
          experience={experience}
        />
      )}
    </>
  );
}

export default ExperienceItem;
