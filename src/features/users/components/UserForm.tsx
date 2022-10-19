import { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import LoadingSpinner from 'components/ui/LoadingSpinner';
import Input from 'components/form-inputs/Input';
import FilePicker from 'components/form-inputs/FilePicker';
import TextArea from 'components/form-inputs/TextArea';
import ImageDisplay from 'components/form-inputs/ImageDisplay';
import DatePicker from 'components/form-inputs/DatePicker';
import Button from 'components/ui/Button';

import { usePersistForm } from 'hooks/use-persist-form';

type UserFormProps = {
  localStorageKey: string;
  onGetFromLocalStorage: () => IUserForm | undefined;
  actionHandler: SubmitHandler<IUserForm>;
  onSetOpen: (state: boolean) => void;
};

function UserForm({
  onGetFromLocalStorage,
  localStorageKey,
  onSetOpen,
  actionHandler,
}: UserFormProps) {
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IUserForm>({
    mode: 'onSubmit',
    defaultValues: onGetFromLocalStorage(),
  });

  usePersistForm({
    value: watch(),
    localStorageKey,
  });

  const profileImage = getValues('profileImage');

  const setProfileImageHandler = useCallback(
    (imageUrl: string) => {
      setValue('profileImage', imageUrl);
    },
    [setValue]
  );

  const submitHandler: SubmitHandler<IUserForm> = async (data) => {
    try {
      setLoading(true);
      await actionHandler(data);
      reset();
      onSetOpen(false);
      localStorage.removeItem(localStorageKey);
    } catch (err: any) {
      console.error(err);
      toast.error(`Something wrong happened! ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const closeModalHandler = () => {
    onSetOpen(false);
    reset();
    localStorage.removeItem(localStorageKey);
  };

  const removeImageHandler = useCallback(() => {
    setValue('profileImage', null);
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-y-2 px-2 py-2"
    >
      <div className="h-96 overflow-y-auto">
        {profileImage && profileImage.length ? (
          <ImageDisplay
            imageSrc={profileImage}
            imageAlt="profile"
            onRemoveImage={removeImageHandler}
          />
        ) : null}
        {/* USER NAME */}
        <div className="flex gap-x-4 w-full py-1">
          <Input
            label="First Name"
            name="firstName"
            register={register}
            placeholder="Your first name"
            error={errors.firstName}
            errorMessage="First name is required"
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            register={register}
            placeholder="Your last name"
            error={errors.lastName}
            errorMessage="Last name is required"
            required
          />
        </div>

        {/* BIRTH DATE */}
        <DatePicker
          control={control}
          label="Birth Date"
          name="birthDate"
          required
          errorMessage="Birth date is required"
          placeholder="Select date"
          error={errors.birthDate}
        />

        {/* PROFILE IMAGE */}
        <FilePicker label="Profile Image" onSetImage={setProfileImageHandler} />

        {/* ABOUT */}
        <TextArea
          label="About you"
          placeholder="A few words to describe you"
          register={register}
          name="about"
          required={false}
        />
      </div>
      {/* CTA */}
      <div className="flex gap-x-2 pt-4 pb-1">
        <Button
          onClick={closeModalHandler}
          buttonType="button"
          layout="full"
          actionType="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {}}
          buttonType="submit"
          layout="full"
          actionType="primary"
        >
          {isLoading ? <LoadingSpinner /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
