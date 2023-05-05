import { beautyBookLogo } from "../assets"
import NavbarBB from "../components/NavbarBB"
import styles from "../style"
import { Link } from 'react-router-dom';

const Salons = () => (
    <div className="w-full overflow-hidden">

        <div className={`${styles.paddingX} ${styles.flexCenter} bg-black`}>
            <div className={`${styles.boxWidth}`}>
                <NavbarBB />
            </div>
        </div>

            <div className="flex justify-center">

                <div className="font-poppins text-black text-5xl font-bold mt-16 uppercase">
                    Salons
                </div>

            </div>

            <div className="flex justify-center mt-8 sm:scale-100 scale-75">

                <Link to="/home" className='h-72 w-72 bg-black ml-4 mb-8 hover:bg-gray-400'>
                </Link>

                <div className="h-72 w-72 bg-black ml-4 hover:bg-gray-400">
                </div>

                <div className="h-72 w-72 bg-black ml-4 mb-8 hover:bg-gray-400">
                </div>

            </div>
            
    </div>
  )

export default Salons