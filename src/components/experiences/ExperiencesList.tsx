import ExperienceItem from './ExperienceItem';

type ExperiencesListProps = {
  experiences: IExperience[];
};

function ExperiencesList({ experiences }: ExperiencesListProps) {
  return (
    <section className="flex flex-col gap-y-6 justify-center items-center w-3/4 h-full mx-auto bg-white px-6 py-8 rounded-md">
      <div className="flex justify-between w-full items-center">
        <h4 className="text-2xl font-semibold">Experience</h4>
        <button
          type="button"
          className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-semibold py-2 px-4"
        >
          Add New Experience
        </button>
      </div>
      <ul className="flex flex-col w-full gap-y-4">
        {experiences.map((experience, i) => (
          <>
            <ExperienceItem key={experience.id} experience={experience} />
            {i !== experiences.length - 1 && <hr />}
          </>
        ))}
      </ul>
    </section>
  );
}

export default ExperiencesList;
