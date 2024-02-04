

import React from 'react';

const ReUsableTable = ({ columns, data, onEditClick, onDeleteClick, onCreateUserClick }) => {
  return (
    <div className='mt-16  overflow-x-auto'>
      <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
        <thead className="border-b bg-indigo-950 text-white font-medium dark:border-neutral-500">
          <tr className='border-b dark:border-neutral-500'>
            {columns.map((column, index) => (
              <th key={index} scope="col" className={`border-r px-6 py-4 dark:border-neutral-500`}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className='border-b dark:border-neutral-500'>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border-r px-6 py-4">
                  {column === 'Edit' || column === 'Delete' || column === 'CreateAccount' || column === 'Block' ? (
                    // Conditionally render "Created" button if email_sent is true
                    item['email_sent'] && column === 'CreateAccount' ? (
                      <button
                        onClick={() => {
                          onCreateUserClick(item); // Call your function here
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Created
                      </button>
                    ) : (
                      // Render "Create Account" button if email_sent is false
                      column === 'Edit' ? (
                        <button
                          onClick={() => {
                            onEditClick(item); // Call your edit function here
                          }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      ) : column === 'Delete' ? (
                        <button
                          onClick={() => {
                            onDeleteClick(item); // Call your delete function here
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      ) : column === 'Block' ? (
                        <button
                          onClick={() => {
                            onDeleteClick(item); // Call your block function here
                          }}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onCreateUserClick(item); // Call your function here
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          {column}
                        </button>
                      )
                    )
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
