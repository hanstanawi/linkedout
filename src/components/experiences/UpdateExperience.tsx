import moment from 'moment';
import cx from 'classnames';
import ReactDatePicker from 'react-datepicker';

import { useEffect, useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Modal from 'components/modals/Modal';
import LoadingSpinner from 'components/layout/LoadingSpinner';
import placeholder from 'assets/profile-placeholder.png';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateExperience } from 'app/slices/users.slice';
import * as cloudinaryApi from 'api/cloudinary.api';
import { usePersistForm } from 'hooks/usePersistForm';

type UpdateExperienceProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  experience: IExperience;
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

const FORM_DATA_KEY = 'updateExperience';

function UpdateExperience({
  isOpen,
  setOpen,
  experience,
  userId,
}: UpdateExperienceProps) {
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const defaultExperienceValue = {
    ...experience,
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : null,
  };

  const getDataFromLocalStorage = () => {
    const dataFromLocaleStorage = localStorage.getItem(FORM_DATA_KEY);
    if (dataFromLocaleStorage) {
      try {
        const dataObj = JSON.parse(dataFromLocaleStorage) as FormValues & {
          id: string;
        };

        if (dataObj.id === experience.id) {
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

        // removing local storage data if updating different experience
        localStorage.removeItem(FORM_DATA_KEY);
      } catch (err) {
        console.log(err);
        return defaultExperienceValue;
      }
    }
    // return default experience object from props
    return defaultExperienceValue;
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
    reValidateMode: 'onSubmit',
    defaultValues: getDataFromLocalStorage(),
  });

  usePersistForm({
    value: { ...watch(), id: experience.id },
    localStorageKey: FORM_DATA_KEY,
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

  const updateExperienceHandler: SubmitHandler<FormValues> = async (data) => {
    if (experience) {
      try {
        setLoading(true);

        const experienceBody = {
          ...data,
          id: experience.id,
          companyLogo: data.companyLogo || null,
          startDate: moment(data.startDate).format('YYYY-MM-DD'),
          endDate: data.endDate
            ? moment(data.endDate).format('YYYY-MM-DD')
            : null,
          userId,
        };

        await dispatch(updateExperience(experienceBody)).unwrap();

        toast.success('Experience updated!');
        reset();
        setOpen(false);
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
  };

  const setCurrentJob = () => {
    setValue('isCurrent', !isCurrent, { shouldValidate: true });
  };

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold text-xl pb-2">Update Experience</h3>
        <hr />
        <section>
          <form
            onSubmit={handleSubmit(updateExperienceHandler)}
            className="flex flex-col gap-y-1 px-2 py-2"
          >
            <div className="h-[27rem] overflow-y-auto">
              {companyLogo && companyLogo.length ? (
                <div className="flex justify-center py-3">
                  <img
                    src={companyLogo || placeholder}
                    alt="profile"
                    className="inline-block h-20 w-20 object-cover rounded-full"
                  />
                </div>
              ) : null}
              {/* JOB TITLE */}
              <div className="flex flex-1 flex-col gap-y-1 py-1">
                <label htmlFor="lastName" className="text-sm">
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
                    'border p-2 rounded-md field-input font-light text-sm outline-blue-400'
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
                <label htmlFor="lastName" className="text-sm">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  {...register('companyName', {
                    required: 'Company name is required',
                  })}
                  className={cx(
                    errors.companyName ? 'border-red-600' : 'border-gray-200',
                    'border p-2 rounded-md field-input font-light text-sm outline-blue-400'
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
                <label htmlFor="lastName">Company Logo</label>
                <div className="flex items-center gap-x-2">
                  <input
                    id="companyLogo"
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

              {/* PERIOD */}
              <div className="flex gap-x-4 w-full py-1">
                <div className="flex flex-1 flex-col gap-y-1">
                  <label htmlFor="firstName" className="text-sm text-gray-600">
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
                              'border p-2 rounded-md field-input font-light text-sm outline-blue-400 w-full'
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
                  <label htmlFor="lastName" className="text-sm text-gray-600">
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
                              'border p-2 rounded-md field-input font-light text-sm outline-blue-400 w-full'
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
                <label htmlFor="lastName">Job Description</label>
                <textarea
                  id="about"
                  {...register('jobDescription')}
                  rows={6}
                  className="border border-gray-200 p-2 rounded-md font-light text-sm outline-blue-400"
                />
              </div>

              {/* CURRENT JOB */}
              <div className="flex items-center my-2.5">
                <input
                  type="checkbox"
                  id="isCurrentJob"
                  className="h-4 w-4 cursor-pointer border-transparent"
                  onClick={setCurrentJob}
                  {...register('isCurrent')}
                />
                <label
                  htmlFor="preorder"
                  className="text-black text-sm ml-2 cursor-pointer"
                >
                  I&apos;m currently working here
                </label>
              </div>
            </div>

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
                className="bg-blue-400  hover:bg-blue-600 text-white
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

export default UpdateExperience;
