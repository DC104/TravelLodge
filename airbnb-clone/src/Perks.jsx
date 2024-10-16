/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export default function Perks({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter(selectedName => selectedName !== name));
    }
  }

  return (
    <>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected.includes('wifi')}
          name='wifi'
          onChange={handleCbClick} // Use onChange instead of onClick
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
        </svg>
        <span>Wifi</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected.includes('parking spot')}
          name='parking spot'
          onChange={handleCbClick}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        <span>Free parking spot</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected.includes('Tv')}
          name='Tv'
          onChange={handleCbClick}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        <span>TV</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected.includes('Radio')}
          name='Radio'
          onChange={handleCbClick}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM12 9.75a48.924 48.924 0 0 0-7.684.621c-.079.012-.142.075-.142.155v9.057c0 .097.079.176.176.176h15.392a.176.176 0 0 0 .176-.176V10.526c0-.08-.063-.143-.142-.155A48.923 48.923 0 0 0 12 9.75Zm-3.683 3.443 2.39 2.39a.75.75 0 0 0 1.06 0l4.39-4.39" />
        </svg>
        <span>Radio</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected.includes('Private entrance')}
          name='Private entrance'
          onChange={handleCbClick}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75V5.25M5.636 5.636l1.06 1.06M3.75 12H5.25m13.364-6.364l-1.06 1.06M18.75 12h1.5M6.75 17.25l.53-.53m10.97.53l-.53-.53m-8.97 3.03v.72M12 16.5v4.5M7.5 15.375a4.125 4.125 0 0 0 8.25 0M4.5 13.5c0 3.193 2.557 5.75 5.75 5.75S16 16.693 16 13.5" />
        </svg>
        <span>Private Entrance</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected.includes('Pets')}
          name='Pets'
          onChange={handleCbClick}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.82 12.907c-.23-.4-.653-1.038-.82-1.407-.332-.768-.44-1.633-.317-2.455a3.045 3.045 0 0 1 1.878-2.35c.747-.28 1.562-.251 2.3.082.533.245.992.64 1.278 1.142.19.336.38.842.426 1.172.061.392.042 1.024-.02 1.424a5.28 5.28 0 0 1-.505 1.501l-1.207 2.064a5.2 5.2 0 0 0-1.261-.606 5.048 5.048 0 0 0-1.777-.317c-.762.027-1.521.173-2.206.432m16.36 0a5.048 5.048 0 0 0-1.777-.317 5.2 5.2 0 0 0-1.261.606l-1.207-2.064a5.28 5.28 0 0 1-.505-1.501c-.062-.4-.08-1.032-.02-1.424.046-.33.236-.836.426-1.172a3.095 3.095 0 0 1 1.278-1.142c.738-.333 1.553-.362 2.3-.082a3.045 3.045 0 0 1 1.878 2.35c.122.822.015 1.687-.317 2.455-.167.369-.59 1.007-.82 1.407m-4.666-8.354c-.52-.424-1.177-.712-1.872-.816-.99-.159-1.995-.017-2.884.401-.597.271-1.15.676-1.585 1.173-.436-.497-.988-.902-1.585-1.173-.89-.418-1.894-.56-2.884-.401a3.045 3.045 0 0 0-1.872.816 2.943 2.943 0 0 0-.932 2.63c.127.822.56 1.585 1.25 2.118.836.633 1.896.968 2.96 1.003.75.025 1.499-.13 2.2-.43.701.3 1.45.455 2.2.43 1.064-.035 2.124-.37 2.96-1.003.69-.533 1.123-1.296 1.25-2.118.099-.53.099-1.08 0-1.61a2.943 2.943 0 0 0-.932-2.63m-8.34 7.597c-.486.304-.918.69-1.27 1.135-.338.425-.591.913-.735 1.44-.065.225-.116.454-.183.678-.066-.224-.118-.453-.183-.678a4.898 4.898 0 0 0-.735-1.44c-.352-.445-.784-.83-1.27-1.135a3.045 3.045 0 0 0-2.336-.381c-.663.15-1.266.515-1.723 1.018a3.04 3.04 0 0 0-.53 3.743c.39.626.998 1.111 1.703 1.34.484.155 1.008.151 1.483-.012.481-.164.917-.46 1.258-.857a4.898 4.898 0 0 0 1.196-3.144c.04-.755.171-1.506.412-2.224a3.094 3.094 0 0 0-1.054-3.558c.444-.314.91-.58 1.384-.812.427-.208.876-.351 1.336-.43.481-.082.969-.045 1.447.108a3.045 3.045 0 0 0 2.384-.732c.285.245.584.466.888.669a3.094 3.094 0 0 0-1.054 3.558c.241.718.372 1.469.412 2.224a4.898 4.898 0 0 0 1.196 3.144c.341.397.777.693 1.258.857.475.163.999.167 1.483.012a3.04 3.04 0 0 0 1.703-1.34 3.04 3.04 0 0 0-.53-3.743c-.457-.503-1.06-.868-1.723-1.018a3.045 3.045 0 0 0-2.336.381Z" />
        </svg>
        <span>Pets</span>
      </label>
    </>
  );
}
