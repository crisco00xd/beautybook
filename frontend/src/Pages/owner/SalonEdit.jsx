import { NavbarStylist } from "../../components"
import styles from "../../style"
import { useState } from 'react';
import { Footer } from "../../components";
import { createSalon } from "../../queries";
import { useNavigate } from "react-router-dom";

const SalonEdit = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, 'test.png');
      formData.append('folder', './frontend/src/assetsUser');
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(response => {
        console.log('File uploaded successfully.');
      }).catch(error => {
        console.error('Error uploading file:', error);
      });
      setSelectedImage(file);
    }
  };

  const [selectedImage2, setSelectedImag2e] = useState(null);
  const [imageName2, setImageName2] = useState('');

  const handleImageChange2 = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setImageName2(e.target.files[0].name);
    }
  };

  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const data = { 
    //     salon_name: "Test",
    //     description: "Test Again",
    //     startTime: "8:00:00",
    //     closeTime: "8:00:00"
    // };

    const response = true // await createSalon(data)


    if (response){
      alert("Salon created successfully");
      navigate("/home@");
    }

  };

  return (
    <div className="bg-primary w-full overflow-hidden">

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>

        <div className={`${styles.boxWidth}`}>
          <NavbarStylist />
        </div>

      </div>

      <div className="bg-white flex flex-col items-center">

        <div className='font-poppins text-black font-semibold text-sm sm:text-lg uppercase mt-6'>
          want to give your salon page a new look?
        </div>

        <div className='font-poppins text-black uppercase font-semibold text-sm sm:text-lg'>
          edit your salon's info, add or remove images
        </div>

        <div className='font-poppins text-black uppercase font-semibold text-sm sm:text-lg'>
          and add new services if needed!
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="bg-white flex flex-col items-center">

            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
              logo
            </div>

            <div className='font-poppins text-black uppercase font-semibold text-sm sm:text-lg text-center mt-4'>
                {'(CHANGE THE LOGO DISPLAYED AT THE TOP LEFT CORNER OF YOUR WEBSITE) [SQUARE SIZE RECOMMENDED FOR BETTER QUALITY]'}
              </div>

              <div className="flex flex-col items-center justify-center">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded Image"
                    className="w-64 h-64 object-cover rounded-lg shadow-lg mb-4"
                  />
                ) : (
                  <div className="flex items-center justify-center mb-4 border-black border-2 h-32 w-96 ml-2 mt-8 sm:scale-100 scale-75">
                    <span className="text-black font-poppins uppercase font-semibold">Upload an image</span>
                  </div>
                )}
                <label htmlFor="image-upload" className="flex items-center justify-center px-4 py-2 bg-black text-white font-poppins rounded-lg cursor-pointer hover:bg-gray-500 transition-colors duration-200 ease-in-out">
                  Choose File
                  <input
                    type="file"
                    id="image-upload"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
        </div>

        </div>

        <div className="bg-white flex flex-col items-center">

            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
              About
            </div>

            <div className='flex flex-col items-center'>
              
              <div className='font-poppins text-black uppercase font-semibold text-sm sm:text-lg text-center mt-4'>
                {'(WHATEVER YOU TYPE HERE, WILL BE SHOWN IN THE "WELCOME TO [SALON NAME HERE] SECTION OF YOUR PAGE)'}
              </div>
            
              <input
                type="about"
                name="about"
                id="about"
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                className="border-2 border-black p-2 h-32 w-96 ml-2 mt-8 sm:scale-100 scale-75"
                required
              />

            </div>

        </div>

        <div className="bg-white flex flex-col items-center">

            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
              image
            </div>

        </div>

        <div className="bg-white flex flex-col items-center">
            
            <div className="flex flex-col items-center">

              <div className="flex items-center sm:scale-100 scale-75">

                <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                  email
                </div>

                <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border-2 border-black p-2 rounded-md h-6 ml-2 mt-8"
                required
              />
              

              </div>

              <button className="flex justify-center items-center bg-black h-10 w-32 mt-8 mb-8">

                  <div className="font-poppins text-white font-medium text-sm uppercase">
                    Save Changes
                  </div>

                </button>

            </div>

        </div>

      </form>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>

          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
          
        </div>

    </div>
  )

}

export default SalonEdit