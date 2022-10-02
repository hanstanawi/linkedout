// Data Transfer Object
// for POST and PUT requests
interface IUserDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  about: string | null;
  profileImage: string | null;
}

interface IUser extends IUserDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  workExperiences: IExperience[];
}
