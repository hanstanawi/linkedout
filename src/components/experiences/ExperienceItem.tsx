import { useState } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import placeholder from 'assets/profile-placeholder.png';
import { formatDate } from 'helpers/format.helpers';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { deleteExperience } from 'app/slices/users.slice';
import UpdateExperience from './UpdateExperience';

type ExperienceItemProps = {
  experience: IExperience;
  userId: string;
};

function ExperienceItem({ experience, userId }: ExperienceItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const deleteExperienceHandler = async () => {
    try {
      await dispatch(deleteExperience(experience)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <>
      <li className="w-full flex justify-between gap-x-4">
        <div className="flex-shrink-0">
          <img
            className="inline-block h-16 w-16 object-cover rounded-full"
            src={experience.companyLogo || placeholder}
            alt="profile"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{experience.jobTitle}</h3>
            <div className="flex items-start">
              <button
                type="button"
                onClick={() => openModalHandler(true)}
                className="bg-transparent py-1 px-3"
              >
                <FaPen color="rgb(107 114 128)" />
              </button>
              <button
                type="button"
                onClick={deleteExperienceHandler}
                className="bg-transparent py-1 px-3"
              >
                <FaTrashAlt color="rgb(220 38 38)" />
              </button>
            </div>
          </div>
          <h4 className="text-base">{experience.companyName}</h4>
          <p className="text-gray-400 font-light text-sm py-1">{`${startDate} - ${endDate}`}</p>
          <p className="text-sm">{experience.jobDescription}</p>
        </div>
      </li>
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
