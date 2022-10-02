import { useState } from 'react';
import placeholder from 'assets/profile-placeholder.png';
import { formatDate } from 'helpers/format.helpers';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { deleteExperience } from 'app/slices/users.slice';
import ExperienceModal from './ExperienceModal';

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
      <li className="w-full flex gap-x-4">
        <div className="">
          <img
            className="inline-block h-20 w-20 object-cover rounded-full"
            src={experience.companyLogo || placeholder}
            alt="profile"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{experience.jobTitle}</h3>
          <h4 className="text-base">{experience.companyName}</h4>
          <p className="text-gray-400 font-light text-sm py-1">{`${startDate} - ${endDate}`}</p>
          <p className="text-sm">{experience.jobDescription}</p>
        </div>
        <div className="flex ">
          <button
            type="button"
            onClick={() => openModalHandler(true)}
            className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-semibold py-2 px-4"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={deleteExperienceHandler}
            className="bg-red-600 hover:bg-red-800 text-white rounded-md text-sm font-semibold py-2 px-4"
          >
            Delete
          </button>
        </div>
      </li>
      <ExperienceModal
        userId={userId}
        isOpen={isModalOpen}
        setOpen={openModalHandler}
        mode="update"
        experience={experience}
      />
    </>
  );
}

export default ExperienceItem;
