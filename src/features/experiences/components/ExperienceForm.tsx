import cx from 'classnames';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import TextArea from 'components/form-inputs/TextArea';
import Checkbox from 'components/form-inputs/Checkbox';
import Button from 'components/ui/Button';
import ImageDisplay from 'components/form-inputs/ImageDisplay';
import Input from 'components/form-inputs/Input';
import FilePicker from 'components/form-inputs/FilePicker';
import LoadingSpinner from 'components/ui/LoadingSpinner';

import { usePersistForm } from 'hooks/use-persist-form';

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

  const setCompanyLogoHandler = useCallback(
    (imageUrl: string): void => {
      setValue('companyLogo', imageUrl);
    },
    [setValue]
  );

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

  const setCurrentJob = useCallback(() => {
    setValue('isCurrent', !isCurrent, { shouldValidate: true });
  }, [isCurrent, setValue]);

  const removeImageHandler = useCallback(() => {
    setValue('companyLogo', null);
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-y-1 px-2 py-2"
    >
      <div className="h-[27rem] overflow-y-auto">
        {companyLogo && companyLogo.length ? (
          <ImageDisplay
            imageSrc={companyLogo}
            imageAlt="company-logo"
            onRemoveImage={removeImageHandler}
          />
        ) : null}
        {/* JOB TITLE */}
        <Input
          label="Job Title"
          register={register}
          error={errors.jobTitle}
          required
          errorMessage="Job title is required"
          name="jobTitle"
          placeholder="Job Title"
        />

        {/* COMPANY NAME */}
        <Input
          label="Company Name"
          register={register}
          error={errors.companyName}
          required
          errorMessage="Company name is required"
          name="companyName"
          placeholder="Company Name"
        />

        {/* COMPANY LOGO */}
        <FilePicker label="Company Logo" onSetImage={setCompanyLogoHandler} />

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
        <TextArea
          label="Job Description"
          register={register}
          placeholder="A few words about your job"
          name="jobDescription"
        />

        {/* CURRENT JOB */}
        <Checkbox
          label="I'm currently working here"
          onCheck={setCurrentJob}
          register={register}
          name="isCurrent"
        />
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
        <Button onClick={() => {}} buttonType="submit">
          {isLoading ? <LoadingSpinner /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default ExperienceForm;
