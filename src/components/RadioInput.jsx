const RadioInput = ({ label, id, name, ref, onChange, value, required, checked }) => {

  return (
    <div>
      <input 
        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-merah checked:border-merah focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio" 
        name={name} 
        id={id}
        ref={ref}
        onChange={onChange}
        value={value}
        required={required} 
        checked={value === checked}
      />
      <label htmlFor={id} className="form-check-label inline-block text-gray-700  ">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
