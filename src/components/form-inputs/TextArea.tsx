import cx from 'classnames';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

type TextAreaProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  required: boolean;
  errorMessage?: string;
};

const TEXTAREA_ROWS = 5;

function TextArea<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
  required,
  errorMessage,
}: TextAreaProps<T>) {
  return (
    <div className="flex flex-1 flex-col gap-y-2 text-sm py-1">
      <label htmlFor={name} className="md:text-sm text-xs text-gray-600">
        {label}
      </label>
      <textarea
        id={name}
        {...register(name, {
          required: required ? errorMessage : false,
        })}
        rows={TEXTAREA_ROWS}
        placeholder={placeholder}
        className={cx(
          error ? 'border-red-600' : 'border-gray-200 ',
          'border outline-blue-400 p-2 rounded-md font-light md:text-sm text-xs '
        )}
      />
      <p
        className={cx(
          'md:text-[10px] text-[8px] font-light text-red-600',
          error ? 'opacity-100' : 'opacity-0'
        )}
      >
        {error?.message}
      </p>
    </div>
  );
}

export default TextArea;
