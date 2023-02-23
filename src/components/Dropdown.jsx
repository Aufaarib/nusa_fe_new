import Select from "react-select";

export function DropdownCostCenter({label, type, id, name, ref, autoComplete, onChange, required, rows, options, defaultValue, isClearable})
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
            <a className="block text-merah float-right mt-1" href="/admin/tambah-cost-center">Tambah Cost Center</a>
          </div>
        </form>
      </div>
    );
  };

export function DropdownSiswa({ label, type, id, name, ref, autoComplete, onChange, options, required, rows, isClearable, defaultValue})
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

  export function DropdownJenisTransaksi({isSearchable, label, type, id, name, ref, autoComplete, onChange, required, rows, isClearable, defaultValue})
  {
    const options = [
      { value: 'Cash', label: 'Cash'},
      { value: 'Transfer', label: 'Transfer'}
    ];

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

  export function DropdownDebitKredit({isSearchable, label, type, id, name, ref, autoComplete, onChange, required, rows, defaultValue, isClearable})
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
  