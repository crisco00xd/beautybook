import { statsImage } from "../../assets"
import { NavbarStylist, Footer } from "../../components"
import styles from "../../style"

const StatisticsStylist = () => (
  <div className='w-full overflow-hidden'>

    <div className={`bg-black ${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxWidth}`}>
				<NavbarStylist />
			</div>
		</div>

    <img src = {statsImage} alt = 'viewAppts'
      className = 'sm:mt-16 mt-6 mb-6 w-full h-auto' />

      <div className="mt-10 flex justify-center ">

        <button className="flex justify-center items-center bg-black h-14 w-32">
          <div className="font-poppins text-white font-medium text-xl">
            ALL TIME
          </div>
        </button>

        <button className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            THIS MONTH
          </div>
        </button>

        <button className="flex justify-center items-center h-14 w-40 ml-6">
          <div className="font-poppins text-black font-medium text-base hover:text-gray-500">
            CUSTOM TIMELINE
          </div>
        </button> 

      </div>

      <div className="mt-10 flex justify-center">

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium sm:text-lg">
            STYLIST
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ACCEPTED APPOINTMENTS
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            CANCELED APPOINTMENTS
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            PENDING APPOINTMENTS
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            TOTAL
          </div>
        </div>

      </div>

      <div className="flex justify-center">

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            STYLIST 1
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            ##
          </div>
        </div>

      </div>

      <div className="flex justify-center">

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            STYLIST 2
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            ##
          </div>
        </div>

      </div>

      <div className="flex justify-center">

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            STYLIST 3
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-60 border-4 border-black">
          <div className="font-poppins text-black font-medium text-sm">
            ##
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
          <div className="font-poppins text-black font-medium text-lg">
            ##
          </div>
        </div>

      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} mt-10`}>
			  <div className={`${styles.boxWidth}`}>
				<Footer />
			</div>
			
		  </div>

  </div>
  )

export default StatisticsStylist