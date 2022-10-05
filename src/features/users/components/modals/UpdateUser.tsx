import cx from 'classnames';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import Modal from 'components/modals/Modal';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import placeholder from 'assets/profile-placeholder.png';

import { useAppDispatch } from 'hooks/use-app-dispatch';
import { updateUser } from 'features/users/users.slice';
import * as cloudinaryApi from 'api/cloudinary.api';
import { usePersistForm } from 'hooks/use-persist-form';
import Button from 'components/ui/Button';

type UpdateUserModalProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  user: IUser;
};

type FormValues = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  about: string | null;
  profileImage: string | null;
};

const FORM_DATA_KEY = 'updateUser';

function UpdateUser({ isOpen, setOpen, user }: UpdateUserModalProps) {
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  // Need to initialize birthDate as Date type
  // to satisfy ReactDatePicker
  const defaultUserValue = {
    ...user,
    birthDate: new Date(user.birthDate),
  };

  const getDataFromLocalStorage = () => {
    const dataFromLocaleStorage = localStorage.getItem(FORM_DATA_KEY);
    if (dataFromLocaleStorage) {
      try {
        const dataObj = JSON.parse(dataFromLocaleStorage) as FormValues & {
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
        localStorage.removeItem(FORM_DATA_KEY);
      } catch (err) {
        return defaultUserValue;
      }
    }
    // return default user object from props
    return defaultUserValue;
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: getDataFromLocalStorage(),
  });

  usePersistForm({
    value: { ...watch(), id: user.id },
    localStorageKey: FORM_DATA_KEY,
  });

  const profileImage = getValues('profileImage');

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
    }
  };

  const uploadImageHandler = async () => {
    if (image) {
      try {
        setIsUploading(true);
        const uploadedImage = await cloudinaryApi.uploadImage(image);
        setValue('profileImage', uploadedImage.url);
      } catch (err: any) {
        toast.error(`Upload failed ${err.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const updateUserHandler: SubmitHandler<FormValues> = async (data) => {
    if (user) {
      try {
        setLoading(true);

        const userBody = {
          ...data,
          id: user.id,
          profileImage: data.profileImage || null,
          birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
        };

        await dispatch(updateUser(userBody)).unwrap();
        reset();
        setOpen(false);
        toast.success('User updated');
        localStorage.removeItem(FORM_DATA_KEY);
      } catch (err: any) {
        console.error(err);
        toast.error(`Something wrong happened! ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const closeModalHandler = () => {
    setOpen(false);
    reset();
    localStorage.removeItem(FORM_DATA_KEY);
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold md:text-xl text-lg pb-2">
          Update Profile
        </h3>
        <hr />
        <section>
          <form
            onSubmit={handleSubmit(updateUserHandler)}
            className="flex flex-col gap-y-2 px-2 py-2"
          >
            <div className="h-96 overflow-y-auto">
              {profileImage && profileImage.length ? (
                <div className="flex flex-col items-center justify-center py-3">
                  <img
                    src={profileImage || placeholder}
                    alt="profile"
                    className="inline-block md:h-20 h-16 md:w-20 w-16 object-cover rounded-full"
                  />
                  <button
                    type="button"
                    className="  bg-bgBlue hover:bg-bgDarkBlue text-white
                  rounded-sm text-[9px] font-semibold py-0.5 px-4 mt-1 flex justify-center"
                    onClick={() => setValue('profileImage', null)}
                  >
                    Remove
                  </button>
                </div>
              ) : null}
              {/* USER NAME */}
              <div className="flex gap-x-4 w-full py-1">
                <div className="flex flex-1 flex-col gap-y-1.5">
                  <label
                    htmlFor="firstName"
                    className="md:text-sm text-xs text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    id="firstName"
                    placeholder="Your first name"
                    className={cx(
                      errors.firstName ? 'border-red-600' : 'border-gray-200',
                      'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400'
                    )}
                  />
                  <p
                    className={cx(
                      'md:text-[10px] text-[8px] font-light text-red-600',
                      errors.firstName ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    {errors.firstName?.message}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-y-1.5">
                  <label
                    htmlFor="lastName"
                    className="md:text-sm text-xs text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    id="lastName"
                    placeholder="Your last name"
                    className={cx(
                      errors.lastName ? 'border-red-600' : 'border-gray-200',
                      'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400'
                    )}
                  />
                  <p
                    className={cx(
                      'md:text-[10px] text-[8px] font-light text-red-600 -pt-1',
                      errors.lastName ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>

              {/* BIRTH DATE */}
              <div className="flex flex-1 flex-col gap-y-1.5 py-1">
                <label
                  htmlFor="lastName"
                  className="md:text-sm text-xs text-gray-600"
                >
                  Birth Date
                </label>
                <Controller
                  control={control}
                  name="birthDate"
                  rules={{
                    required: 'Birth date is required',
                  }}
                  render={({ field: { value, ...fieldProps } }) => {
                    return (
                      <div>
                        <ReactDatePicker
                          {...fieldProps}
                          className={cx(
                            errors.birthDate
                              ? 'border-red-600'
                              : 'border-gray-200',
                            'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400 w-full'
                          )}
                          placeholderText="Select date"
                          selected={value}
                          dateFormat="yyyy/MM/dd"
                          showMonthDropdown
                          maxDate={new Date()}
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    );
                  }}
                />
                <p
                  className={cx(
                    'md:text-[10px] text-[8px] font-light text-red-600',
                    errors.birthDate ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {errors.birthDate?.message}
                </p>
              </div>

              {/* PROFILE IMAGE */}
              <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
                <label
                  htmlFor="lastName"
                  className="md:text-sm text-xs text-gray-600"
                >
                  Profile Image
                </label>
                <div className="flex items-center gap-x-2">
                  <input
                    id="profileImage"
                    type="file"
                    onChange={changeFileHandler}
                    className="border border-gray-200 flex-1 p-2 rounded-md font-light text-xs outline-blue-400"
                  />
                  <Button onClick={uploadImageHandler}>
                    {isUploading ? <LoadingSpinner /> : 'Upload'}
                  </Button>
                </div>
              </div>

              {/* ABOUT */}
              <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
                <label
                  htmlFor="lastName"
                  className="md:text-sm text-xs text-gray-600"
                >
                  About you
                </label>
                <textarea
                  id="about"
                  {...register('about')}
                  rows={5}
                  placeholder="A few words to describe you"
                  className="border border-gray-200 p-2 rounded-md font-light md:text-sm text-xs outline-blue-400"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-x-2 pt-4 pb-1">
              <button
                type="button"
                onClick={closeModalHandler}
                className="border border-gray-300 bg-white flex-1 hover:bg-gray-50 text-gray-700 
                rounded-md md:text-sm text-xs font-semibold py-2 px-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" bg-bgBlue hover:bg-bgDarkBlue text-white
                  flex-1 rounded-md md:text-sm text-xs font-semibold py-2 px-4 flex justify-center"
              >
                {isLoading ? <LoadingSpinner /> : 'Submit'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
}

export default UpdateUser;
