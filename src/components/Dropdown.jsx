import Select from "react-select";

export const DropdownCostCenter = ({label, name, onChange, required, options, defaultValue, isClearable, handleOnClick}) =>
{
  return (
    <div>
      <form className='grid-container'>
        {label && (
        <label htmlFor={name}>
          {label} {required && <span className="ml-1 text-merah">*</span>} 
        </label>
        )}
        <span>:</span> 
        <div>
          <Select
            className="ml-20"
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
          />
          <p><a style={{ fontSize : "12px", borderBottom : "1px solid #8F0D1E" }} className="block text-merah float-right" onClick={handleOnClick}>Tambah Cost Center</a></p>
        </div>
      </form>
    </div>
  );
};

export const DropdownSiswa = ({ label, type, id, name, ref, autoComplete, onChange, options, required, rows, isClearable, defaultValue}) =>
{
    return (
      <div>
        <form className='grid-container'>
          {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
          )}
          <span>:</span>  
            <Select
              className="ml-20"
              isClearable={isClearable}
              defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={options}
              onChange={onChange}
            />
        </form>
      </div>
    );
  };

  export const DropdownJenisTransaksi = ({isSearchable, label, type, id, name, ref, autoComplete, onChange, required, options, isClearable, defaultValue}) =>
  {
      return (
        <div>
          <form className='grid-container'>
            {label && (
            <label htmlFor={name}>
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
            )}
            <span>:</span>  
            <Select
              className="ml-20"
              isSearchable={isSearchable}
              isClearable={isClearable}
              defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={options}
              onChange={onChange}
            />
          </form>
        </div>
      );
    };

  export const DropdownDebitKredit = ({isSearchable, label, type, id, name, ref, autoComplete, onChange, required, rows, defaultValue, isClearable}) =>
  {
    const options = [
      { value: 'Debit', label: 'Debit'},
      { value: 'Kredit', label: 'Kredit'}
    ];

      return (
        <div>
          <form className='grid-container'>
            {label && (
            <label htmlFor={name} className="mt-2">
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
            )}
            <span className="mt-2">:</span>  
            <Select
              className="ml-20"
              isSearchable={isSearchable}
              isClearable={isClearable}
              defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={options}
              onChange={onChange}
            />
          </form>
        </div>
      );
    };

  export const DropdownBank = ({isSearchable, label, type, id, name, ref, autoComplete, onChange, required, options, defaultValue, isClearable}) =>
  {
      return (
        <div>
          <form className='grid-container'>
            {label && (
            <label htmlFor={name} className="mt-1">
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
            )}
            <span className="mt-1">:</span>  
            <Select
              className="ml-20"
              isSearchable={isSearchable}
              isClearable={isClearable}
              defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={options}
              onChange={onChange}
            />
          </form>
        </div>
      );
    };
    export const DropdownPendaftaran = ({isSearchable, label, type, id, name, ref, autoComplete, onChange, required, options, defaultValue, isClearable}) =>
    {
      return (
        <div>
          <form className='grid-container'>
            {label && (
            <label htmlFor={name} className="mt-2">
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
            )}
            <span className="mt-2">:</span>  
            <Select
              className="ml-20"
              isSearchable={isSearchable}
              isClearable={isClearable}
              defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={options}
              onChange={onChange}
            />
          </form>
        </div>
      );
    };
  