export const TextInput = ({
  placeholder,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  value,
  required,
  disable,
  min,
  max,
  onInput,
}) => {
  return (
    <>
      <div>
        <form className="grid-container">
          {label && (
            <label htmlFor={name}>
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
          )}

          <span>:</span>

          <input
            className="w-auto ml-20 px-3 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
            type={type}
            id={id}
            name={name}
            ref={ref}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onInput={onInput}
            onChange={onChange}
            value={value}
            required={required}
            min={min}
            max={max}
            disabled={disable}
          />
        </form>
      </div>
    </>
  );
};

export const TextArea = ({
  index,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  value,
  required,
  rows,
  min,
  max,
  onInput,
}) => {
  return (
    <>
      <div>
        <form className="grid-container">
          {label && (
            <label htmlFor={name}>
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
          )}

          <span>:</span>

          <textarea
            className="w-auto ml-20 px-3 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
            type={type}
            id={id}
            name={name}
            ref={ref}
            autoComplete={autoComplete}
            onInput={onInput}
            onChange={onChange}
            value={value}
            required={required}
            min={min}
            max={max}
          />
        </form>
      </div>
    </>
  );
};

export default TextInput;
