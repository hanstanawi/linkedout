import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import Button from 'components/ui/Button';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import * as cloudinaryApi from 'api/cloudinary.api';

type FilePickerProps = {
  label: string;
  onSetImage: (imageUrl: string) => void;
};

function FilePicker({ label, onSetImage }: FilePickerProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
    }
  };

  const uploadImageHandler = async () => {
    if (image) {
      try {
        setIsUploading(true);
        const uploadedImage = await cloudinaryApi.uploadImage(image);
        onSetImage(uploadedImage.url);
      } catch (err: any) {
        toast.error(`Upload failed ${err.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
      <label htmlFor="lastName" className="md:text-sm text-xs text-gray-600">
        {label}
      </label>
      <div className="flex items-center gap-x-2">
        <input
          id="profileImage"
          type="file"
          onChange={changeFileHandler}
          className="border border-gray-200 flex-1 p-2 rounded-md font-light text-xs outline-blue-400"
        />
        <Button
          buttonType="button"
          onClick={uploadImageHandler}
          actionType="primary"
        >
          {isUploading ? <LoadingSpinner /> : 'Upload'}
        </Button>
      </div>
    </div>
  );
}

export default FilePicker;
