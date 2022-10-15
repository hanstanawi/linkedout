import moment from 'moment';
import { SubmitHandler } from 'react-hook-form';

import { toast } from 'react-toastify';

import Modal from 'components/modals/Modal';

import { useAppDispatch } from 'hooks/use-app-dispatch';
import { updateExperience } from 'features/users/users.slice';
import { UPDATE_EXPERIENCE_LOCALSTORAGE_KEY } from 'features/experiences/experiences.constants';
import ExperienceForm from '../ExperienceForm';

type UpdateExperienceProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  experience: IExperience;
  userId: string;
};

function UpdateExperience({
  isOpen,
  setOpen,
  experience,
  userId,
}: UpdateExperienceProps) {
  const dispatch = useAppDispatch();

  const defaultExperienceValue = {
    ...experience,
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : null,
  };

  const getDataFromLocalStorage = () => {
    const dataFromLocaleStorage = localStorage.getItem(
      UPDATE_EXPERIENCE_LOCALSTORAGE_KEY
    );
    if (dataFromLocaleStorage) {
      try {
        const dataObj = JSON.parse(dataFromLocaleStorage) as IExperienceForm & {
          id: string;
        };

        if (dataObj.id === experience.id) {
          const formattedStartDate = dataObj.startDate
            ? moment(dataObj.startDate).format('YYYY-MM-DD')
            : null;
          const formattedEndDate = dataObj.endDate
            ? moment(dataObj.endDate).format('YYYY-MM-DD')
            : null;

          return {
            ...dataObj,
            startDate: formattedStartDate
              ? new Date(formattedStartDate)
              : new Date(),
            endDate: formattedEndDate ? new Date(formattedEndDate) : null,
          };
        }

        // removing local storage data if updating different experience
        localStorage.removeItem(UPDATE_EXPERIENCE_LOCALSTORAGE_KEY);
      } catch (err) {
        return defaultExperienceValue;
      }
    }
    // return default experience object from props
    return defaultExperienceValue;
  };

  const updateExperienceHandler: SubmitHandler<IExperienceForm> = async (
    data
  ) => {
    if (experience) {
      const experienceBody = {
        ...data,
        id: experience.id,
        companyLogo: data.companyLogo || null,
        startDate: moment(data.startDate).format('YYYY-MM-DD'),
        endDate: data.endDate
          ? moment(data.endDate).format('YYYY-MM-DD')
          : null,
        userId,
      };

      await dispatch(updateExperience(experienceBody)).unwrap();

      toast.success('Experience updated!');
    }
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold md:text-xl text-lg pb-2">
          Update Experience
        </h3>
        <hr />
        <section>
          <ExperienceForm
            onSetOpen={setOpen}
            onGetFromLocalStorage={getDataFromLocalStorage}
            actionHandler={updateExperienceHandler}
            userId={userId}
            localStorageKey={UPDATE_EXPERIENCE_LOCALSTORAGE_KEY}
          />
        </section>
      </div>
    </Modal>
  );
}

export default UpdateExperience;
