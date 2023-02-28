import Select from "react-select";
import TextInput from "./TextInput";
import { useState } from 'react';
import Modal from 'react-modal';
import { CustomStylesStatus } from "./CustomStyles";

export function DropdownCostCenter({label, setCode, setGroup, name, setSubGroup, setItem, onChange, required, setDebitKredit, options, defaultValueDK, defaultValue, isClearable, post})
{

  const [isOpen, setisOpen] = useState(false);

  const onRequestOpen = () => {
    setisOpen(true);
  }

  const onRequestClose = () => {
    setisOpen(false);
  }

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
            <a className="block text-merah float-right mt-1" onClick={onRequestOpen}>Tambah Cost Center</a>
          </div>
          <Modal
              isOpen={isOpen}
              onRequestClose={onRequestClose}
              style={CustomStylesStatus}
              contentLabel="Modal Status"
              ariaHideApp={false}
              >
              <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Cost Center</p>
              <article>
                <TextInput
                    label="Code"
                    type="number"
                    id="group"
                    name="code"
                    onChange={setCode}
                    required={true}
                />
                <TextInput
                    label="Group"
                    type="text"
                    id="group"
                    onChange={setGroup}
                    required={true}
                />
                <TextInput
                    label="Sub Group"
                    type="text"
                    id="group"
                    onChange={setSubGroup}
                    required={true}
                />
                <TextInput
                    label="Item"
                    type="text"
                    id="group"
                    onChange={setItem}
                    required={true}
                />
                <DropdownDebitKredit
                    label="Debit/Kredit"
                    required={true}
                    isClearable={true}
                    defaultValue={defaultValueDK}
                    isSearchable={false}
                    onChange={setDebitKredit}
                />

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={post}>
                        Simpan
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5" onClick={onRequestClose}>
                        Batal
                    </button>
                </div>
              </article>
          </Modal>
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
  