import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ExperienceItem from './ExperienceItem';
import ExperienceModal from './ExperienceModal';

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
      <section className="flex flex-col gap-y-6 justify-center items-center w-3/4 h-full mx-auto bg-white px-6 py-8 rounded-md shadow-md">
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
        <ul className="flex flex-col w-full gap-y-4 h-3/4 overflow-y-auto">
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
        <ExperienceModal
          userId={userId}
          isOpen={isModalOpen}
          setOpen={openModalHandler}
          mode="create"
          experience={null}
        />
      )}
    </>
  );
}

export default ExperiencesList;
