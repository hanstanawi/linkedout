import ReactDatePicker from 'react-datepicker';
import cx from 'classnames';
import {
  FieldValues,
  Controller,
  FieldError,
  Path,
  Validate,
  Control,
} from 'react-hook-form';

type DatePickerProps<T extends FieldValues, U> = {
  control: Control<T>;
  label: string;
  error: FieldError | undefined;
  name: Path<T>;
  required: boolean;
  errorMessage: string;
  validation?: Record<string, Validate<U>>;
  isDisabled?: boolean;
  placeholder: string;
};

function DatePicker<T extends FieldValues, U>({
  control,
  name,
  label,
  error,
  required,
  errorMessage,
  validation,
  isDisabled = false,
  placeholder,
}: DatePickerProps<T, U>) {
  return (
    <div className="flex flex-1 flex-col gap-y-1">
      <label htmlFor={name} className="md:text-sm text-xs text-gray-600">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? errorMessage : false,
          validate: validation,
        }}
        render={({ field: { value, ...fieldProps } }) => {
          return (
            <div>
              <ReactDatePicker
                {...fieldProps}
                className={cx(
                  error ? 'border-red-600' : 'border-gray-200',
                  'border p-2 rounded-md field-input font-light md:text-sm text-xs outline-blue-400 w-full'
                )}
                placeholderText={placeholder}
                selected={value}
                dateFormat="yyyy/MM/dd"
                disabled={isDisabled}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          );
        }}
      />
      <p
        className={cx(
          'text-[10px] font-light text-red-600',
          error ? 'opacity-100' : 'opacity-0'
        )}
      >
        {error?.message}
      </p>
    </div>
  );
}

export default DatePicker;
