import moment from 'moment';
import cx from 'classnames';
import ReactDatePicker from 'react-datepicker';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Modal from 'components/modals/Modal';
import LoadingSpinner from 'components/layout/LoadingSpinner';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { createExperience, updateExperience } from 'app/slices/users.slice';

type ExperienceModalProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  mode: 'update' | 'create';
  experience: IExperience | null;
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

function ExperienceModal({
  isOpen,
  setOpen,
  mode,
  experience,
  userId,
}: ExperienceModalProps) {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
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
    defaultValues:
      mode === 'update' && experience
        ? {
            ...experience,
            startDate: new Date(experience.startDate),
            endDate: new Date(experience.endDate || ''),
          }
        : undefined,
  });

  const { isCurrent } = watch();

  useEffect(() => {
    if (isCurrent) {
      setValue('endDate', null, { shouldValidate: true });
    }
  }, [isCurrent, setValue]);

  const createExperienceHandler: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      const experienceBody = {
        ...data,
        companyLogo: null, // fix this
        userId,
        startDate: moment(data.startDate).format('YYYY-MM-DD'),
        endDate: data.endDate
          ? moment(data.endDate).format('YYYY-MM-DD')
          : null,
      };

      await dispatch(createExperience(experienceBody)).unwrap();
      toast.success('Experience created!');
      reset();
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(`Something wrong happened! ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateExperienceHandler: SubmitHandler<FormValues> = async (data) => {
    if (experience) {
      try {
        setLoading(true);

        const experienceBody = {
          ...data,
          id: experience.id,
          companyLogo: null,
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

  const modalTitle =
    mode === 'create' ? 'Add New Experience' : 'Update Experience';

  const submitHandler =
    mode === 'create' ? createExperienceHandler : updateExperienceHandler;

  return (
    <Modal setOpen={setOpen} isOpen={isOpen}>
      <div className="w-full">
        <h3 className="font-semibold text-xl pb-2">{modalTitle}</h3>
        <hr />
        <section>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-y-1 px-2 py-2"
          >
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
                className="border border-gray-200 p-2 rounded-md font-light text-sm"
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

export default ExperienceModal;
