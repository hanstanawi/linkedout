import moment from 'moment';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';

import Modal from 'components/modals/Modal';

import { useAppDispatch } from 'hooks/use-app-dispatch';
import { createExperience } from 'features/users/users.slice';
import { CREATE_EXPERIENCE_LOCALSTORAGE_KEY } from '../../experiences.constants';
import ExperienceForm from '../ExperienceForm';

type CreateExperienceProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  userId: string;
};

function CreateExperience({ isOpen, setOpen, userId }: CreateExperienceProps) {
  const dispatch = useAppDispatch();

  const getDataFromLocalStorage = () => {
    const dataFromLocaleStorage = localStorage.getItem(
      CREATE_EXPERIENCE_LOCALSTORAGE_KEY
    );
    if (dataFromLocaleStorage) {
      try {
        const dataObj = JSON.parse(dataFromLocaleStorage) as IExperienceForm & {
          userId: string;
        };
        // for the same user, set the data from local storage
        if (dataObj.userId === userId) {
          // Parse the string date to Date object to satisfy ReactDatePicker
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
        localStorage.removeItem(CREATE_EXPERIENCE_LOCALSTORAGE_KEY);
      } catch (err) {
        return undefined;
      }
    }
    return undefined;
  };

  const createExperienceHandler: SubmitHandler<IExperienceForm> = async (
    data
  ) => {
    const experienceBody = {
      ...data,
      userId,
      companyLogo: data.companyLogo || null,
      startDate: moment(data.startDate).format('YYYY-MM-DD'),
      endDate: data.endDate ? moment(data.endDate).format('YYYY-MM-DD') : null,
    };

    await dispatch(createExperience(experienceBody)).unwrap();
    toast.success('Experience created!');
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold md:text-xl text-lg pb-2">
          Add New Experience
        </h3>
        <hr />
        <section>
          <ExperienceForm
            onSetOpen={setOpen}
            onGetFromLocalStorage={getDataFromLocalStorage}
            actionHandler={createExperienceHandler}
            userId={userId}
            localStorageKey={CREATE_EXPERIENCE_LOCALSTORAGE_KEY}
          />
        </section>
      </div>
    </Modal>
  );
}

export default CreateExperience;
