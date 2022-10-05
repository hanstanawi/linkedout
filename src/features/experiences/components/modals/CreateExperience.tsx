import moment from 'moment';
import cx from 'classnames';
import ReactDatePicker from 'react-datepicker';
import { useEffect, useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from 'components/ui/Button';
import Modal from 'components/modals/Modal';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import placeholder from 'assets/profile-placeholder.png';

import * as cloudinaryApi from 'api/cloudinary.api';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { createExperience } from 'features/users/users.slice';
import { usePersistForm } from 'hooks/use-persist-form';
import { CREATE_EXPERIENCE_LOCALSTORAGE_KEY } from '../../experiences.constants';

type CreateExperienceProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  userId: string;
};

type FormValues = {
  jobTitle: string;
  startDate: Date;
  endDate: Date | null;
  companyName: string;
  companyLogo: string | null;
  jobDescription: string | null;
  isCurrent: boolean;
};

function CreateExperience({ isOpen, setOpen, userId }: CreateExperienceProps) {
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const getDataFromLocalStorage = () => {
    const dataFromLocaleStorage = localStorage.getItem(
      CREATE_EXPERIENCE_LOCALSTORAGE_KEY
    );
    if (dataFromLocaleStorage) {
      try {
        const dataObj = JSON.parse(dataFromLocaleStorage) as FormValues & {
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
    value: { ...watch(), userId },
    localStorageKey: CREATE_EXPERIENCE_LOCALSTORAGE_KEY,
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

  const createExperienceHandler: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      const experienceBody = {
        ...data,
        userId,
        companyLogo: data.companyLogo || null,
        startDate: moment(data.startDate).format('YYYY-MM-DD'),
        endDate: data.endDate
          ? moment(data.endDate).format('YYYY-MM-DD')
          : null,
      };

      await dispatch(createExperience(experienceBody)).unwrap();
      toast.success('Experience created!');
      reset();
      setOpen(false);
      localStorage.removeItem(CREATE_EXPERIENCE_LOCALSTORAGE_KEY);
    } catch (err: any) {
      console.error(err);
      toast.error(`Something wrong happened! ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const closeModalHandler = () => {
    setOpen(false);
    reset();
    localStorage.removeItem(CREATE_EXPERIENCE_LOCALSTORAGE_KEY);
  };

  const setCurrentJob = () => {
    setValue('isCurrent', !isCurrent, { shouldValidate: true });
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold md:text-xl text-lg pb-2">
          Add New Experience
        </h3>
        <hr />
        <section>
          <form
            onSubmit={handleSubmit(createExperienceHandler)}
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
                              errors.startDate
                                ? 'border-red-600'
                                : 'border-gray-200',
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
                              errors.endDate
                                ? 'border-red-600'
                                : 'border-gray-200',
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
        </section>
      </div>
    </Modal>
  );
}

export default CreateExperience;
