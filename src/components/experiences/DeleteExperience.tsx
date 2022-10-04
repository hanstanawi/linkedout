import { FaExclamationTriangle } from 'react-icons/fa';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { deleteExperience } from 'app/slices/users.slice';
import Modal from 'components/modals/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from 'components/layout/LoadingSpinner';

type DeleteExperienceProps = {
  experience: IExperience;
  setOpen: (state: boolean) => void;
  isOpen: boolean;
};

function DeleteExperience({
  experience,
  setOpen,
  isOpen,
}: DeleteExperienceProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const deleteExperienceHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(deleteExperience(experience)).unwrap();
      toast.success('Experience deleted');
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(`Something wrong happened ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FaExclamationTriangle color="rgb(220 38 38)" size={30} />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Delete Experience
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this experience? This data will be
              permanently removed from our servers forever. This action cannot
              be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          onClick={deleteExperienceHandler}
        >
          {isLoading ? <LoadingSpinner /> : 'Delete'}
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default DeleteExperience;
