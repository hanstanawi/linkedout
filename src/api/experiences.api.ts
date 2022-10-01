import axiosInstance from './axiosInstance';

export async function getExperience(
  experienceId: string
): Promise<IExperience> {
  const res = await axiosInstance.get<IExperience>(
    `/experiences/${experienceId}`
  );
  return res.data;
}

export async function createExperience(
  experience: IExperience
): Promise<IExperience> {
  const res = await axiosInstance.post<IExperience>('/experiences', experience);
  return res.data;
}

export async function updateUser(
  experienceId: string,
  experience: IExperienceDto
): Promise<IExperience> {
  const res = await axiosInstance.put<IExperience>(
    `/experiences/${experienceId}`,
    experience
  );
  return res.data;
}

export async function deleteUser(experienceId: string): Promise<void> {
  await axiosInstance.delete<void>(`/experiences/${experienceId}`);
}
