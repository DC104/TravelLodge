/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos = [], onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/upload-by-link/', { link: photoLink });
      const filePath = response.data.filePath;
      onChange(prev => [...(prev || []), filePath]);
      setPhotoLink('');
    } catch (error) {
      console.error('Error adding photo by link:', error.message);
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('http://localhost:5000/uploads/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => {
      const { data: fileNames } = response;
      onChange(prev => [...(prev || []), ...fileNames]);
    })
    .catch(error => {
      console.error('Upload error:', error.message);
    });
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange(prev => (prev ? prev.filter(photo => photo !== filename) : []));
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    const newAddedPhotos = [filename, ...addedPhotos.filter(photo => photo !== filename)];
    onChange(newAddedPhotos);
  }

  return (
    <>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={photoLink}
          onChange={ev => setPhotoLink(ev.target.value)}
          placeholder="Add using a link ....jpg"
          className="flex-grow px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary transition"
        >
          Add photo
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
          <div className="relative group" key={index}>
            <img
              className="rounded-xl w-full h-32 object-cover"
              src={`http://localhost:5000/${link}`}
              alt={`Uploaded photo ${index}`}
            />
            <button
              onClick={ev => removePhoto(ev, link)}
              className="absolute bottom-2 right-2 text-white bg-red-600 bg-opacity-75 rounded-full p-2 hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={ev => selectAsMainPhoto(ev, link)}
              className="absolute bottom-2 left-2 text-white bg-green-600 bg-opacity-75 rounded-full p-2 hover:bg-green-700 transition opacity-0 group-hover:opacity-100"
            >
              {link === addedPhotos[0] ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 2.75l3.093 6.264 6.907 1.004-5 4.873L17.59 21.25 12 18.347 6.41 21.25l1.59-6.359-5-4.873 6.907-1.004L12 2.75z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2" />
                </svg>
              )}
            </button>
          </div>
        ))}
        <label className="h-32 cursor-pointer flex items-center justify-center border-2 border-dashed rounded-xl p-2 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10"
          >
            <path
              fillRule="evenodd"
              d="M12 4a.75.75 0 01.75.75v6.5h6.5a.75.75 0 110 1.5h-6.5v6.5a.75.75 0 01-1.5 0v-6.5h-6.5a.75.75 0 110-1.5h6.5v-6.5A.75.75 0 0112 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2">Upload</span>
        </label>
      </div>
    </>
  );
}
