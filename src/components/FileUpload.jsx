export function FileUpload({ label, type, id, name, ref, autoComplete, onChange, value, required, rows})
{

    return (
      <div className='mt-10'>
        {label && (
        <label htmlFor="images" className="drop-container">
            <span className="drop-title">{label} {required && <span className="ml-1 text-merah">*</span>}</span>
            Atau
            <input type={type} id="images" accept="pdf/*" required={required} onChange={onChange}/>
        </label>
        )}
      </div>
    );
  };