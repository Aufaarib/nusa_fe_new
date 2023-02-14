const TextInput = ({ index, label, type, id, name, ref, autoComplete, onChange, value, required, rows, min, max }) => {

  return (
    <div>
      {label && (
      <label htmlFor={name} className="block mt-4 mb-1 ">
        {label} {required && <span className="ml-1 text-merah">*</span>}
      </label>
      )}
      {type === "textarea" ?
        <textarea
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
          rows={rows}
          id={id}
          name={name}
          ref={ref}
          autoComplete={autoComplete}
          onChange={onChange}
          value={value}
          required={required}
        />
      :
        <input
          className="block w-full px-3 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
          type={type}
          id={id}
          name={name}
          ref={ref}
          autoComplete={autoComplete}
          onChange={onChange}
          value={value}
          required={required}
          min={min}
          max={max}
        />
      }
    </div>
  );
};

export default TextInput;
