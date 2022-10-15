import moment from 'moment';
import { toast } from 'react-toastify';

import Modal from 'components/modals/Modal';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { updateUser } from 'features/users/users.slice';
import { UPDATE_USER_LOCALSTORAGE_KEY } from 'features/users/users.constants';
import { SubmitHandler } from 'react-hook-form';
import UserForm from '../UserForm';

type UpdateUserProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  user: IUser;
};

function UpdateUser({ isOpen, setOpen, user }: UpdateUserProps) {
  const dispatch = useAppDispatch();

  // Need to initialize birthDate as Date type
  // to satisfy ReactDatePicker
  const defaultUserValue = {
    ...user,
    birthDate: new Date(user.birthDate),
  };

  const getDataFromLocalStorage = () => {
    const dataFromLocaleStorage = localStorage.getItem(
      UPDATE_USER_LOCALSTORAGE_KEY
    );
    if (dataFromLocaleStorage) {
      try {
        const dataObj = JSON.parse(dataFromLocaleStorage) as IUserForm & {
          id: string;
        };

        if (dataObj.id === user.id) {
          const formattedBirthDate = moment(dataObj.birthDate).format(
            'YYYY-MM-DD'
          );
          return {
            ...dataObj,
            birthDate: new Date(formattedBirthDate),
          };
        }
        // removing local storage data if updating different user
        localStorage.removeItem(UPDATE_USER_LOCALSTORAGE_KEY);
      } catch (err) {
        return defaultUserValue;
      }
    }
    // return default user object from props
    return defaultUserValue;
  };

  const updateUserHandler: SubmitHandler<IUserForm> = async (data) => {
    if (user) {
      const userBody = {
        ...data,
        id: user.id,
        profileImage: data.profileImage || null,
        birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
      };

      await dispatch(updateUser(userBody)).unwrap();
      toast.success('User updated');
    }
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold md:text-xl text-lg pb-2">
          Update Profile
        </h3>
        <hr />
        <section>
          <UserForm
            onSetOpen={setOpen}
            onGetFromLocalStorage={getDataFromLocalStorage}
            actionHandler={updateUserHandler}
            localStorageKey={UPDATE_USER_LOCALSTORAGE_KEY}
          />
        </section>
      </div>
    </Modal>
  );
}

export default UpdateUser;
