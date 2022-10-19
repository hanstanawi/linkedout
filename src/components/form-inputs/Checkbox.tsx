import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type CheckboxProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  onCheck: () => void;
  label: string;
};

function Checkbox<T extends FieldValues>({
  register,
  name,
  onCheck,
  label,
}: CheckboxProps<T>) {
  return (
    <div className="flex items-center my-2.5">
      <input
        type="checkbox"
        id={name}
        className="md:h-4 h-3 md:w-4 w-3 cursor-pointer border-transparent"
        onClick={onCheck}
        {...register}
      />
      <label
        htmlFor={name}
        className="text-black md:text-sm text-xs ml-2 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
