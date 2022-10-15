import cx from 'classnames';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import LoadingSpinner from 'components/ui/LoadingSpinner';
import Button from 'components/ui/Button';
import placeholder from 'assets/profile-placeholder.png';
import { usePersistForm } from 'hooks/use-persist-form';
import * as cloudinaryApi from 'api/cloudinary.api';

type ExperienceFormProps = {
  localStorageKey: string;
  onGetFromLocalStorage: () => IExperienceForm | undefined;
  actionHandler: SubmitHandler<IExperienceForm>;
  onSetOpen: (state: boolean) => void;
  userId: string;
};

function ExperienceForm({
  localStorageKey,
  onGetFromLocalStorage,
  actionHandler,
  onSetOpen,
  userId,
}: ExperienceFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IExperienceForm>({
    mode: 'onSubmit',
    defaultValues: onGetFromLocalStorage(),
  });

  usePersistForm({
    value: { ...watch(), userId },
    localStorageKey,
  });

  const { isCurrent } = watch();
  const companyLogo = getValues('companyLogo');

  useEffect(() => {
    if (isCurrent) {
      setValue('endDate', null, { shouldValidate: true });
    }
  }, [isCurrent, setValue]);

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
        setValue('companyLogo', uploadedImage.url);
      } catch (err: any) {
        toast.error(`Upload failed ${err.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const submitHandler: SubmitHandler<IExperienceForm> = async (data) => {
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

  const setCurrentJob = () => {
    setValue('isCurrent', !isCurrent, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-y-1 px-2 py-2"
    >
      <div className="h-[27rem] overflow-y-auto">
        {companyLogo && companyLogo.length ? (
          <div className="flex flex-col items-center justify-center py-3">
            <img
              src={companyLogo || placeholder}
              alt="profile"
              className="inline-block md:h-20 h-16 md:w-20 w-16 object-cover rounded-full"
            />
            <button
              type="button"
              className="  bg-bgBlue hover:bg-bgDarkBlue text-white
    rounded-sm text-[9px] font-semibold py-0.5 px-4 mt-1 flex justify-center"
              onClick={() => setValue('companyLogo', null)}
            >
              Remove
            </button>
          </div>
        ) : null}
        {/* JOB TITLE */}
        <div className="flex flex-1 flex-col gap-y-1 py-1">
          <label
            htmlFor="lastName"
            className="md:text-sm text-xs text-gray-600"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            {...register('jobTitle', {
              required: 'Job title is required',
            })}
            placeholder="Job Title"
            className={cx(
              errors.jobTitle ? 'border-red-600' : 'border-gray-200',
              'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400'
            )}
          />
          <p
            className={cx(
              'text-[10px] font-light text-red-600',
              errors.jobTitle ? 'opacity-100' : 'opacity-0'
            )}
          >
            {errors.jobTitle?.message}
          </p>
        </div>

        {/* COMPANY NAME */}
        <div className="flex flex-1 flex-col gap-y-1 py-1">
          <label
            htmlFor="lastName"
            className="md:text-sm text-xs text-gray-600"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            {...register('companyName', {
              required: 'Company name is required',
            })}
            placeholder="Company Name"
            className={cx(
              errors.companyName ? 'border-red-600' : 'border-gray-200',
              'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400'
            )}
          />
          <p
            className={cx(
              'text-[10px] font-light text-red-600',
              errors.companyName ? 'opacity-100' : 'opacity-0'
            )}
          >
            {errors.companyName?.message}
          </p>
        </div>

        {/* COMPANY LOGO */}
        <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
          <label
            htmlFor="lastName"
            className="md:text-sm text-xs text-gray-600"
          >
            Company Logo
          </label>
          <div className="flex items-center gap-x-2">
            <input
              id="companyLogo"
              type="file"
              onChange={changeFileHandler}
              className="border border-gray-200 flex-1 p-2 rounded-md font-light md:text-sm text-xs outline-blue-400"
            />
            <Button onClick={uploadImageHandler}>
              {isUploading ? <LoadingSpinner /> : 'Upload'}
            </Button>
          </div>
        </div>

        {/* PERIOD */}
        <div className="flex gap-x-4 w-full py-1">
          <div className="flex flex-1 flex-col gap-y-1">
            <label
              htmlFor="firstName"
              className="md:text-sm text-xs text-gray-600"
            >
              Start Date
            </label>
            <Controller
              control={control}
              name="startDate"
              rules={{
                required: 'Start date is required',
                validate: {
                  isBeforeEndDate: (v) => {
                    const endDateVal = getValues('endDate');
                    if (!endDateVal) {
                      return true;
                    }
                    return (
                      moment(v).isBefore(endDateVal) ||
                      'Must be before end date'
                    );
                  },
                },
              }}
              render={({ field: { value, ...fieldProps } }) => {
                return (
                  <div>
                    <ReactDatePicker
                      {...fieldProps}
                      className={cx(
                        errors.startDate ? 'border-red-600' : 'border-gray-200',
                        'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400 w-full'
                      )}
                      placeholderText="Start date"
                      selected={value}
                      dateFormat="yyyy/MM/dd"
                      maxDate={new Date()}
                      showMonthDropdown
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
                errors.startDate ? 'opacity-100' : 'opacity-0'
              )}
            >
              {errors.startDate?.message}
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-y-1">
            <label
              htmlFor="lastName"
              className="md:text-sm text-xs text-gray-600"
            >
              End Date
            </label>
            <Controller
              control={control}
              name="endDate"
              rules={{
                required: !isCurrent ? 'End date is required' : false,
                validate: {
                  isAfterStartDate: (v) => {
                    const startDateVal = getValues('startDate');
                    if (isCurrent) return true;
                    return (
                      moment(v).isAfter(startDateVal) ||
                      'Must be after start date'
                    );
                  },
                },
              }}
              render={({ field: { value, ...fieldProps } }) => {
                return (
                  <div>
                    <ReactDatePicker
                      {...fieldProps}
                      className={cx(
                        errors.endDate ? 'border-red-600' : 'border-gray-200',
                        'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400 w-full'
                      )}
                      placeholderText="End date"
                      selected={value}
                      disabled={isCurrent}
                      maxDate={new Date()}
                      dateFormat="yyyy/MM/dd"
                      showMonthDropdown
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
                errors.endDate ? 'opacity-100' : 'opacity-0'
              )}
            >
              {errors.endDate?.message}
            </p>
          </div>
        </div>

        {/* JOB DESC */}
        <div className="flex flex-1 flex-col gap-y-1 text-sm py-1">
          <label
            htmlFor="lastName"
            className="md:text-sm text-xs text-gray-600"
          >
            Job Description
          </label>
          <textarea
            id="about"
            {...register('jobDescription')}
            rows={6}
            placeholder="A few words about your job"
            className="border border-gray-200 p-2 rounded-md font-light md:text-sm text-xs outline-blue-400"
          />
        </div>
        {/* CURRENT JOB */}
        <div className="flex items-center my-2.5">
          <input
            type="checkbox"
            id="isCurrentJob"
            className="md:h-4 h-3 md:w-4 w-3 cursor-pointer border-transparent"
            onClick={setCurrentJob}
            {...register('isCurrent')}
          />
          <label
            htmlFor="isCurrentJob"
            className="text-black md:text-sm text-xs ml-2 cursor-pointer"
          >
            I&apos;m currently working here
          </label>
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
  );
}

export default ExperienceForm;
