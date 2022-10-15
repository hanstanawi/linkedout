import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextAreaProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
};

const TEXTAREA_ROWS = 5;

function TextArea<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
}: TextAreaProps<T>) {
  return (
    <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
      <label htmlFor={name} className="md:text-sm text-xs text-gray-600">
        {label}
      </label>
      <textarea
        id={name}
        {...register}
        rows={TEXTAREA_ROWS}
        placeholder={placeholder}
        className="border border-gray-200 p-2 rounded-md font-light md:text-sm text-xs outline-blue-400"
      />
    </div>
  );
}

export default TextArea;
