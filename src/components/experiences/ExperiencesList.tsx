import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ExperienceItem from './ExperienceItem';
import CreateExperience from './CreateExperience';

type ExperiencesListProps = {
  userId: string;
  experiences: IExperience[];
};

function ExperiencesList({ experiences, userId }: ExperiencesListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = (state: boolean) => {
    setIsModalOpen(state);
  };

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
        <ul className="flex flex-col w-full gap-y-4 p-4 h-full overflow-y-auto">
          {experiences.map((experience, i) => (
            <>
              {/* TODO: FIX THIS */}
              <ExperienceItem
                key={experience.id}
                experience={experience}
                userId={userId}
              />
              {i !== experiences.length - 1 && <hr />}
            </>
          ))}
        </ul>
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
