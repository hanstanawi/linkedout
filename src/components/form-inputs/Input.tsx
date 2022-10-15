import cx from 'classnames';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  label: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  name: Path<T>;
  required: boolean;
  placeholder: string;
  errorMessage: string;
};

function Input<T extends FieldValues>({
  label,
  register,
  error,
  name,
  placeholder,
  required,
  errorMessage,
}: InputProps<T>) {
  return (
    <div className="flex flex-1 flex-col gap-y-1.5">
      <label htmlFor={name} className="md:text-sm text-xs text-gray-600">
        {label}
      </label>
      <input
        type="text"
        {...register(name, {
          required: required ? errorMessage : false,
        })}
        id={name}
        placeholder={placeholder}
        className={cx(
          error ? 'border-red-600' : 'border-gray-200',
          'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400'
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

export default Input;
