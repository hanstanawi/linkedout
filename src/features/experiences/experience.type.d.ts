interface IExperienceDto {
  jobTitle: string;
  startDate: string;
  endDate: string | null;
  companyName: string;
  companyLogo: string | null;
  jobDescription: string | null;
  isCurrent: boolean;
  userId: string;
}

interface IExperience extends IExperienceDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface IExperienceForm {
  jobTitle: string;
  startDate: Date;
  endDate: Date | null;
  companyName: string;
  companyLogo: string | null;
  jobDescription: string | null;
  isCurrent: boolean;
}
