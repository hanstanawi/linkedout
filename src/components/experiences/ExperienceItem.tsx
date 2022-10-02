import placeholder from 'assets/profile-placeholder.png';
import { formatDate } from 'helpers/format.helpers';

type ExperienceItemProps = {
  experience: IExperience;
};

function ExperienceItem({ experience }: ExperienceItemProps) {
  const checkEndDate = () => {
    if (experience.isCurrent && !experience.endDate) {
      return 'Current';
    }
    return formatDate(experience.endDate || '');
  };
  const startDate = formatDate(experience.startDate);
  const endDate = checkEndDate();

  return (
    <li className="w-full flex gap-x-4">
      <div className="">
        <img
          className="inline-block h-20 w-20 object-cover rounded-full"
          src={experience.companyLogo || placeholder}
          alt="profile"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{experience.jobTitle}</h3>
        <h4 className="text-base">{experience.companyName}</h4>
        <p className="text-gray-400 font-light text-sm py-1">{`${startDate} - ${endDate}`}</p>
        <p className="text-sm">{experience.jobDescription}</p>
      </div>
      <hr className="bg-black" />
    </li>
  );
}

export default ExperienceItem;
