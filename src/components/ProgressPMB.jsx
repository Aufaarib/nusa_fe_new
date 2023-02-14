import InfoTahapanPMB from "./InfoTahapanPMB";

const ProgressPMB = ({ students, number }) => {
  
  return (
    <article className='grid xs:grid-cols-1 md:grid-cols-2 gap-6 mt-7'>
      <section className='grid grid-cols-1 grid-rows-3 gap-6'>
        <InfoTahapanPMB step="1" status={students[number].register} title="Pendaftaran Akun" />
        <InfoTahapanPMB step="2" status={students[number].register_payment} title="Pembayaran Registrasi PMB" />
        <InfoTahapanPMB step="3" status={students[number].fill_form} title="Pengisian Formulir" />
      </section>
      <section className='grid grid-cols-1 grid-rows-3 gap-6'>
        <InfoTahapanPMB step="4" status={students[number].test} title="Tes dan Hasil Tes" />
        <InfoTahapanPMB step="5" status={students[number].payment_education} title="Pembayaran Biaya Pendidikan" />
      </section>
    </article>
  );
};

export default ProgressPMB;
