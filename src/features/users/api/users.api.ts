import axiosInstance from '../../../api/axiosInstance';

export async function getAllUsers(): Promise<IUser[]> {
  const res = await axiosInstance.get<IUser[]>('/users');
  return res.data;
}

export async function getUser(userId: string): Promise<IUser> {
  const res = await axiosInstance.get<IUser>(`/users/${userId}`);
  return res.data;
}

export async function createUser(user: IUserDto): Promise<IUser> {
  const res = await axiosInstance.post<IUser>('/users', user);
  return res.data;
}

export async function updateUser(
  userId: string,
  user: IUserDto
): Promise<IUser> {
  const res = await axiosInstance.put<IUser>(`/users/${userId}`, user);
  return res.data;
}

export async function deleteUser(userId: string): Promise<void> {
  await axiosInstance.delete<void>(`/users/${userId}`);
}
