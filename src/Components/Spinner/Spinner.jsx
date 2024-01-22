import React from 'react'

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="bg-white">
                <div role="status">
                    <div class="flex flex-row gap-2">
                        <div class="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:.7s]"></div>
                        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                        <div class="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Spinner
