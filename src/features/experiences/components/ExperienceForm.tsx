import moment from 'moment';
import { toast } from 'react-toastify';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';

import TextArea from 'components/form-inputs/TextArea';
import Checkbox from 'components/form-inputs/Checkbox';
import DatePicker from 'components/form-inputs/DatePicker';
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

  const startDateValidation: Record<string, Validate<Date>> = useMemo(() => {
    return {
      isBeforeEndDate: (v) => {
        const endDateVal = getValues('endDate');
        if (!endDateVal) {
          return true;
        }
        return moment(v).isBefore(endDateVal) || 'Must be before end date';
      },
    };
  }, [getValues]);

  const endDateValidation: Record<string, Validate<Date>> = useMemo(() => {
    return {
      isAfterStartDate: (v) => {
        const startDateVal = getValues('startDate');
        if (isCurrent) return true;
        return moment(v).isAfter(startDateVal) || 'Must be after start date';
      },
    };
  }, [getValues, isCurrent]);

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
          <DatePicker
            label="Start Date"
            control={control}
            name="startDate"
            required
            errorMessage="Start date is required"
            placeholder="Start date"
            error={errors.startDate}
            validation={startDateValidation}
          />
          <DatePicker
            label="End Date"
            control={control}
            name="endDate"
            required={!isCurrent}
            errorMessage="End date is required"
            placeholder="End date"
            error={errors.endDate}
            validation={endDateValidation}
          />
        </div>

        {/* JOB DESC */}
        <TextArea
          label="Job Description"
          register={register}
          placeholder="A few words about your job"
          name="jobDescription"
          required={false}
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

export default ExperienceForm;
