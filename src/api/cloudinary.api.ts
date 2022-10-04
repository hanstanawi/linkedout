import axios from 'axios';

const UPLOAD_PRESET_NAME = 'linkedout';
const CLOUD_NAME = 'dbuvuwofy';

const axiosInstance = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
});

export async function uploadImage(image: File): Promise<ICloudinaryResponse> {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', UPLOAD_PRESET_NAME);
  data.append('cloud_name', CLOUD_NAME);
  const res = await axiosInstance.post<ICloudinaryResponse>('/', data);
  return res.data;
}
