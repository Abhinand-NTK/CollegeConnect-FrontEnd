// import React, { useState } from 'react';

// const ReUsableForm = ({ fieldNames, onSubmit }) => {
//   const [formData, setFormData] = useState(
//     fieldNames.reduce((acc, fieldName) => {
//       acc[fieldName] = '';
//       return acc;
//     }, {})
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <>
//           <form className="mx-auto  bg-white p-10" onSubmit={handleSubmit}>
//             {fieldNames.map((fieldName) => (
//               <div key={fieldName} className="mb-4">
//                 <label htmlFor={fieldName} className="block text-gray-700 text-sm font-bold mb-2">
//                   {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
//                 </label>
//                 <input
//                   type="text"
//                   id={fieldName}
//                   name={fieldName}
//                   value={formData[fieldName]}
//                   onChange={handleInputChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   required
//                 />
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Submit
//             </button>
//           </form>
//     </>
//   );
// };

// export default ReUsableForm;


import React, { useState } from 'react';

const ReUsableForm = ({ fieldNames, onSubmit }) => {
  const [formData, setFormData] = useState(
    fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = '';
      return acc;
    }, {})
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form className="mx-auto bg-white p-10" onSubmit={handleSubmit}>
        {fieldNames.map((fieldName) => (
          <div key={fieldName} className="mb-4">
            <label htmlFor={fieldName} className="block text-gray-700 text-sm font-bold mb-2">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            </label>
            {fieldName === 'department' ? (
              <select
                id={fieldName}
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                {/* Add your select options here */}
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            ) : (
              <input
                type="text"
                id={fieldName}
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ReUsableForm;
