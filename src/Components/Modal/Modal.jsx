

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className=" fixed w-full inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="rounded-lg z-50 bg-white p-6  w-100 h-100 shadow-md">
            <div className="w-full flex justify-end">
              <button onClick={onClose} type="button" className="bg-white rounded-md p-2 inline-flex
              items-center justify-end text-gray-400 hover:text-red-500 hover:bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ml-auto">
                <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      )}  
    </>
  );
};


export default Modal
