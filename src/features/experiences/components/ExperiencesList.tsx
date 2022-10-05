import { useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import moment from 'moment';
import ExperienceItem from './ExperienceItem';
import CreateExperience from './modals/CreateExperience';

type ExperiencesListProps = {
  userId: string;
  experiences: IExperience[];
};

function ExperiencesList({ experiences, userId }: ExperiencesListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = (state: boolean) => {
    setIsModalOpen(state);
  };

  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      return moment(b.startDate).diff(moment(a.startDate));
    });
  }, [experiences]);

  let content = (
    <div className="h-full flex flex-col justify-center items-center w-full gap-y-1">
      <h3 className="text-lg font-semibold">No Experiences</h3>
      <p className="text-sm font-light">
        Click Add Experience to add your job experience
      </p>
    </div>
  );

  if (sortedExperiences.length) {
    content = (
      <ul className="flex flex-col w-full gap-y-4 p-4 h-full overflow-y-auto">
        {sortedExperiences.map((experience, i) => (
          <>
            <ExperienceItem
              key={experience.id}
              experience={experience}
              userId={userId}
            />
            {i !== sortedExperiences.length - 1 && <hr />}
          </>
        ))}
      </ul>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-y-6 justify-center items-center w-3/4 h-[80vh] mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between w-full items-center">
          <h4 className="text-2xl font-semibold">Experience</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-semibold py-2 px-4 flex items-center gap-x-1"
          >
            <FaPlus />
            Add Experience
          </button>
        </div>

        {content}
      </section>
      {isModalOpen && (
        <CreateExperience
          userId={userId}
          isOpen={isModalOpen}
          setOpen={openModalHandler}
        />
      )}
    </>
  );
}

export default ExperiencesList;