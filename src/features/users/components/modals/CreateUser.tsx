import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Modal from 'components/modals/Modal';

import { useAppDispatch } from 'hooks/use-app-dispatch';
import { createUser } from 'features/users/users.slice';
import { CREATE_USER_LOCALSTORAGE_KEY } from 'features/users/users.constants';
import { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import UserForm from '../UserForm';

type CreateUserProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
};

function CreateUser({ isOpen, setOpen }: CreateUserProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getDataFromLocalStorage = useCallback(() => {
    const dataFromLocaleStorage = localStorage.getItem(
      CREATE_USER_LOCALSTORAGE_KEY
    );
    if (dataFromLocaleStorage) {
      try {
        const dataObj = JSON.parse(dataFromLocaleStorage) as IUserForm;
        const formattedBirthDate = moment(dataObj.birthDate).format(
          'YYYY-MM-DD'
        );

        return {
          ...dataObj,
          birthDate: new Date(formattedBirthDate),
        };
      } catch (err) {
        return undefined;
      }
    }
    return undefined;
  }, []);

  const createUserHandler: SubmitHandler<IUserForm> = useCallback(
    async (data) => {
      const userBody: IUserDto = {
        ...data,
        profileImage: data.profileImage || null,
        birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
      };

      const createdUser = await dispatch(createUser(userBody)).unwrap();
      toast.success('User created!');
      navigate(`/user/${createdUser.id}`);
    },
    [dispatch, navigate]
  );

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold md:text-xl text-lg pb-2">
          Add New Member
        </h3>
        <hr />
        <section>
          <UserForm
            onSetOpen={setOpen}
            localStorageKey={CREATE_USER_LOCALSTORAGE_KEY}
            onGetFromLocalStorage={getDataFromLocalStorage}
            actionHandler={createUserHandler}
          />
        </section>
      </div>
    </Modal>
  );
}

export default CreateUser;
