import React from 'react';

const ReUsableTable = ({ columns, data }) => {
  const handleEditClick = (rowData) => {
    console.log('Edit button clicked for:', rowData);
  };

  const handleDeleteClick = (rowData) => {
    console.log('Delete button clicked for:', rowData);
  };

  console.log('This is the data from the table ', data);

  return (
    <div className='mt-16 rounded-lg overflow-x-auto'>
      <table className="border-collapse w-full bg-white">
        <thead className="border-b text-black font-medium dark:border-neutral-500">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className={`border-r px-6 py-4 dark:border-neutral-500`}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border-r px-6 py-4">
                  {column === 'Edit' || column === 'Delete' ? (
                    <button
                      onClick={() => (column === 'Edit' ? handleEditClick(item) : handleDeleteClick(item))}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      {column}
                    </button>
                  ) : (
                    item[column.toLowerCase()]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReUsableTable;
