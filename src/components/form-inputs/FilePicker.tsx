import { useState, ChangeEvent } from 'react';
import Button from 'components/ui/Button';
import LoadingSpinner from 'components/ui/LoadingSpinner';

type FilePickerProps = {
  label: string;
  isUploading: boolean;
  onUploadImage: (image: File | null) => Promise<void>;
};

function FilePicker({ label, isUploading, onUploadImage }: FilePickerProps) {
  const [image, setImage] = useState<File | null>(null);

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
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
        <Button onClick={() => onUploadImage(image)}>
          {isUploading ? <LoadingSpinner /> : 'Upload'}
        </Button>
      </div>
    </div>
  );
}

export default FilePicker;
