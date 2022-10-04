import cx from 'classnames';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import Modal from 'components/modals/Modal';
import LoadingSpinner from 'components/layout/LoadingSpinner';
import placeholder from 'assets/profile-placeholder.png';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateUser } from 'app/slices/users.slice';
import * as cloudinaryApi from 'api/cloudinary.api';

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

function UpdateUser({ isOpen, setOpen, user }: UpdateUserModalProps) {
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: { ...user, birthDate: new Date(user.birthDate) },
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
          birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
        };

        await dispatch(updateUser(userBody)).unwrap();
        reset();
        setOpen(false);
        toast.success('User updated');
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
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold text-xl pb-2">Update Profile</h3>
        <hr />
        <section>
          <div className="flex justify-center py-2">
            {profileImage && profileImage.length ? (
              <img
                src={profileImage || placeholder}
                alt="profile"
                className="inline-block h-20 w-20 object-cover rounded-full"
              />
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit(updateUserHandler)}
            className="flex flex-col gap-y-2 px-2 py-2"
          >
            {/* USER NAME */}
            <div className="flex gap-x-4 w-full py-1">
              <div className="flex flex-1 flex-col gap-y-1.5">
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
                  className={cx(
                    errors.firstName ? 'border-red-600' : 'border-gray-200',
                    'border p-2 rounded-md field-input font-light text-sm outline-blue-400'
                  )}
                />
                <p
                  className={cx(
                    'text-[10px] font-light text-red-600',
                    errors.firstName ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {errors.firstName?.message}
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-y-1.5">
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
                  className={cx(
                    errors.lastName ? 'border-red-600' : 'border-gray-200',
                    'border p-2 rounded-md field-input font-light text-sm outline-blue-400'
                  )}
                />
                <p
                  className={cx(
                    'text-[10px] font-light text-red-600 -pt-1',
                    errors.lastName ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {errors.lastName?.message}
                </p>
              </div>
            </div>

            {/* BIRTH DATE */}
            <div className="flex flex-1 flex-col gap-y-1.5 py-1">
              <label htmlFor="lastName" className="text-sm">
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
                          'border p-2 rounded-md field-input font-light text-sm outline-blue-400 w-full'
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
                  'text-[10px] font-light text-red-600',
                  errors.birthDate ? 'opacity-100' : 'opacity-0'
                )}
              >
                {errors.birthDate?.message}
              </p>
            </div>

            {/* PROFILE IMAGE */}
            <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
              <label htmlFor="lastName">Profile Image</label>
              <div className="flex items-center gap-x-2">
                <input
                  id="profileImage"
                  type="file"
                  onChange={changeFileHandler}
                  className="border border-gray-200 flex-1 p-2 rounded-md font-light text-xs outline-blue-400"
                />
                <button
                  type="button"
                  onClick={uploadImageHandler}
                  className=" bg-blue-400  hover:bg-blue-600 text-white
                  flex-shrink-1 rounded-md text-sm font-semibold py-2 px-4 flex justify-center"
                >
                  {isUploading ? <LoadingSpinner /> : 'Upload'}
                </button>
              </div>
            </div>

            {/* ABOUT */}
            <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
              <label htmlFor="lastName">About you</label>
              <textarea
                id="about"
                {...register('about')}
                rows={3}
                placeholder="A few words to describe you"
                className="border border-gray-200 p-2 rounded-md font-light text-sm outline-blue-400"
              />
            </div>

            {/* CTA */}
            <div className="flex gap-x-2 pt-4 pb-1">
              <button
                type="button"
                onClick={closeModalHandler}
                className="bg-gray-100 flex-1 hover:bg-gray-300 text-black rounded-md text-sm font-semibold py-2 px-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" bg-blue-400  hover:bg-blue-600 text-white
                  flex-1 rounded-md text-sm font-semibold py-2 px-4 flex justify-center"
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
