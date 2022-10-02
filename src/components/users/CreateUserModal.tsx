import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Modal from 'components/modals/Modal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { createUser, updateUser } from 'app/slices/users.slice';

type CreateUserModalProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  mode: 'update' | 'create';
  user: IUser | null;
};

function CreateUserModal({
  isOpen,
  setOpen,
  mode,
  user,
}: CreateUserModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<IUserDto>({
    mode: 'onBlur',
    defaultValues: mode === 'update' && user ? user : undefined,
  });

  const createUserHandler: SubmitHandler<IUserDto> = async (data) => {
    try {
      const createdUser = await dispatch(
        createUser({ ...data, profileImage: null })
      ).unwrap();
      reset();
      setOpen(false);
      navigate(`/user/${createdUser.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserHandler: SubmitHandler<IUserDto> = async (data) => {
    if (user) {
      try {
        await dispatch(
          updateUser({ ...data, profileImage: null, id: user.id })
        ).unwrap();
        reset();
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const modalTitle = mode === 'create' ? 'Add New Member' : 'Update Profile';

  const submitHandler =
    mode === 'create' ? createUserHandler : updateUserHandler;

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold text-2xl pb-2">{modalTitle}</h3>
        <hr />
        <section>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-y-2 px-2 py-2"
          >
            {/* USER NAME */}
            <div className="flex gap-x-4 w-full py-1">
              <div className="flex flex-1 flex-col gap-y-2">
                <label htmlFor="firstName" className="text-sm text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  id="firstName"
                  placeholder="Your first name"
                  className="border border-gray-200 p-2 rounded-md field-input font-light text-sm"
                />
              </div>
              <div className="flex flex-1 flex-col gap-y-2">
                <label htmlFor="lastName" className="text-sm text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  id="lastName"
                  placeholder="Your last name"
                  className="border border-gray-200 p-2 rounded-md font-light text-sm"
                />
              </div>
            </div>
            {/* BIRTH DATE */}
            <div className="flex flex-1 flex-col gap-y-2 py-1">
              <label htmlFor="lastName" className="text-sm">
                Birth Date
              </label>
              <input
                type="text"
                id="birthDate"
                {...register('birthDate')}
                className="border border-gray-200 p-2 rounded-md font-light text-sm"
              />
            </div>
            {/* ABOUT */}
            <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
              <label htmlFor="lastName">About you</label>
              <textarea
                id="about"
                {...register('about')}
                className="border border-gray-200 p-2 rounded-md font-light text-sm"
              />
            </div>
            {/*  */}

            <div className="flex gap-x-2 pt-4 pb-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-100 flex-1 hover:bg-gray-300 text-black rounded-md text-sm font-semibold py-2 px-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-400 flex-1 hover:bg-blue-600 text-white rounded-md text-sm font-semibold py-2 px-4"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
}

export default CreateUserModal;
