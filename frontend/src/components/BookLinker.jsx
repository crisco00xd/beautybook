import React from 'react'

const BookLinker = () => (
    <div className='flex flex-col mb-6 items-center scale-50 md:scale-100 sm:scale-100'>
        <div className='text-black font-poppins text-3xl uppercase font-semibold items'>
        Book your appointment today!
        </div>

        <div className='border-2 border-black w-[400px] flex flex-col items-left mb-2'>
            <div className = 'text-black font-poppins text-l uppercase'>
             {'[STYLIST 1]'}
            </div>
            
        </div>

        <div className='border-2 border-black w-[400px] flex flex-col items-left mb-2'>
            <div className = 'text-black font-poppins text-l uppercase'>
             {'[SERVICE 1]'}
            </div>
            
        </div>

        <button className = 'bg-black w-[200px] mb-10'>
          <div className = 'text-white font-poppins text-l uppercase'>
             {'GO TO CALENDAR'}
            </div>
        </button>
        
    </div>
  )

export default BookLinker