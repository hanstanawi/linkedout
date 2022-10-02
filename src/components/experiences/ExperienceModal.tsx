import { useForm, SubmitHandler } from 'react-hook-form';

import Modal from 'components/modals/Modal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { createExperience, updateExperience } from 'app/slices/users.slice';

type ExperienceModalProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  mode: 'update' | 'create';
  experience: IExperience | null;
  userId: string;
};

function ExperienceModal({
  isOpen,
  setOpen,
  mode,
  experience,
  userId,
}: ExperienceModalProps) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<IExperienceDto>({
      mode: 'onBlur',
      defaultValues: mode === 'update' && experience ? experience : undefined,
    });

  const { isCurrent } = watch();

  const createExperienceHandler: SubmitHandler<IExperienceDto> = async (
    data
  ) => {
    try {
      await dispatch(
        createExperience({ ...data, companyLogo: null, userId })
      ).unwrap();
      reset();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateExperienceHandler: SubmitHandler<IExperienceDto> = async (
    data
  ) => {
    if (experience) {
      try {
        await dispatch(
          updateExperience({
            ...data,
            id: experience.id,
            companyLogo: null,
            userId,
          })
        ).unwrap();
        reset();
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const setCurrentJob = () => {
    setValue('isCurrent', !isCurrent, { shouldValidate: false });
  };

  const modalTitle =
    mode === 'create' ? 'Add New Experience' : 'Update Experience';

  const submitHandler =
    mode === 'create' ? createExperienceHandler : updateExperienceHandler;

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
            {/* JOB TITLE */}
            <div className="flex flex-1 flex-col gap-y-2 py-1">
              <label htmlFor="lastName" className="text-sm">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                {...register('jobTitle', {
                  required: 'Job title is required',
                })}
                className="border border-gray-200 p-2 rounded-md font-light text-sm"
              />
            </div>
            {/* COMPANY NAME */}
            <div className="flex flex-1 flex-col gap-y-2 py-1">
              <label htmlFor="lastName" className="text-sm">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                {...register('companyName', {
                  required: 'Company name is required',
                })}
                className="border border-gray-200 p-2 rounded-md font-light text-sm"
              />
            </div>
            {/* PERIOD */}
            <div className="flex gap-x-4 w-full py-1">
              <div className="flex flex-1 flex-col gap-y-2">
                <label htmlFor="firstName" className="text-sm text-gray-600">
                  Start Date
                </label>
                <input
                  type="text"
                  {...register('startDate', {
                    required: 'Start date is required',
                  })}
                  id="startDate"
                  placeholder="Start date"
                  className="border border-gray-200 p-2 rounded-md field-input font-light text-sm"
                />
              </div>
              <div className="flex flex-1 flex-col gap-y-2">
                <label htmlFor="lastName" className="text-sm text-gray-600">
                  End Date
                </label>
                <input
                  type="text"
                  {...register('endDate', {
                    required: !isCurrent ? 'End date is required' : false,
                  })}
                  disabled={isCurrent}
                  id="endDate"
                  placeholder="End date"
                  className="border border-gray-200 p-2 rounded-md font-light text-sm"
                />
              </div>
            </div>
            {/* ABOUT */}
            <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
              <label htmlFor="lastName">Job Description</label>
              <textarea
                id="about"
                {...register('jobDescription')}
                className="border border-gray-200 p-2 rounded-md font-light text-sm"
              />
            </div>
            {/* CURRENT JOB */}
            <div className="flex items-center my-2.5" onClick={setCurrentJob}>
              <input
                type="checkbox"
                id="isCurrentJob"
                className="h-4 w-4 cursor-pointer green-accent border-transparent"
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

export default ExperienceModal;
