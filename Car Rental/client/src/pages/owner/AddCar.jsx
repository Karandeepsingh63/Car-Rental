import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddCar = () => {

  const {axios, currency} = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData)

      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>

      <Title title="Add New Car" subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."/>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* Car Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="car-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
            <input type="file" id="car-image" accept="image/*" hidden onChange={e=> setImage(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input type="text" placeholder="e.g. BMW, Mercedes, Audi..." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.brand} onChange={e=> setCar({...car, brand: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input type="text" placeholder="e.g. X5, E-Class, M4..." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.model} onChange={e=> setCar({...car, model: e.target.value})}/>
          </div>
          
        </div>

        {/* Car Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input type="number" placeholder="2025" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.year} onChange={e=> setCar({...car, year: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input type="number" placeholder="100" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.pricePerDay} onChange={e=> setCar({...car, pricePerDay: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select onChange={e=> setCar({...car, category: e.target.value})} value={car.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a category</option>
               <option value="HatchBack">HatchBack</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

         {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Transmission</label>
            <select onChange={e=> setCar({...car, transmission: e.target.value})} value={car.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Fuel Type</label>
            <select onChange={e=> setCar({...car, fuel_type: e.target.value})} value={car.fuel_type} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Seating Capacity</label>
            <input type="number" placeholder="4" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.seating_capacity} onChange={e=> setCar({...car, seating_capacity: e.target.value})}/>
          </div>
        </div>

         {/* Car Location */}
         <div className='flex flex-col w-full'>
            <label>Location</label>
            <select onChange={e=> setCar({...car, location: e.target.value})} value={car.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
             <option value="">Select a location</option>



<option value="Abohar">Abohar</option>
<option value="Ambala">Ambala</option>
<option value="Amritsar">Amritsar</option>
<option value="Bahadurgarh">Bahadurgarh</option>
<option value="Barnala">Barnala</option>
<option value="Bathinda">Bathinda</option>
<option value="Bhiwani">Bhiwani</option>
<option value="Bilaspur">Bilaspur</option>
<option value="Chamba">Chamba</option>
<option value="Charkhi Dadri">Charkhi Dadri</option>
<option value="Dharamshala">Dharamshala</option>
<option value="Faridabad">Faridabad</option>
<option value="Faridkot">Faridkot</option>
<option value="Fatehabad">Fatehabad</option>
<option value="Fatehgarh Sahib">Fatehgarh Sahib</option>
<option value="Firozpur">Firozpur</option>
<option value="Gohana">Gohana</option>
<option value="Gurdaspur">Gurdaspur</option>
<option value="Gurugram">Gurugram</option>
<option value="Hamirpur">Hamirpur</option>
<option value="Hisar">Hisar</option>
<option value="Hoshiarpur">Hoshiarpur</option>
<option value="Jagraon">Jagraon</option>
<option value="Jalandhar">Jalandhar</option>
<option value="Jhajjar">Jhajjar</option>
<option value="Jind">Jind</option>
<option value="Kaithal">Kaithal</option>
<option value="Kangra">Kangra</option>
<option value="Kapurthala">Kapurthala</option>
<option value="Karnal">Karnal</option>
<option value="Khanna">Khanna</option>
<option value="Kullu">Kullu</option>
<option value="Kurukshetra">Kurukshetra</option>
<option value="Ludhiana">Ludhiana</option>
<option value="Mahendragarh">Mahendragarh</option>
<option value="Malerkotla">Malerkotla</option>
<option value="Mandi">Mandi</option>
<option value="Mansa">Mansa</option>
<option value="Moga">Moga</option>
<option value="Mohali">Mohali</option>
<option value="Muktsar">Muktsar</option>
<option value="Nahan">Nahan</option>
<option value="Narnaul">Narnaul</option>
<option value="Palampur">Palampur</option>
<option value="Palwal">Palwal</option>
<option value="Panchkula">Panchkula</option>
<option value="Panipat">Panipat</option>
<option value="Pathankot">Pathankot</option>
<option value="Patiala">Patiala</option>
<option value="Phagwara">Phagwara</option>
<option value="Rewari">Rewari</option>
<option value="Rohtak">Rohtak</option>
<option value="Rupnagar (Ropar)">Rupnagar (Ropar)</option>
<option value="Sangrur">Sangrur</option>
<option value="Shimla">Shimla</option>
<option value="Sirsa">Sirsa</option>
<option value="Solan">Solan</option>
<option value="Sonipat">Sonipat</option>
<option value="Talwara">Talwara</option>
<option value="Tarn Taran">Tarn Taran</option>
<option value="Una">Una</option>
<option value="Yamunanagar">Yamunanagar</option>
<option value="Zirakpur">Zirakpur</option>
            </select>
         </div>
        {/* Car Description */}
         <div className='flex flex-col w-full'>
            <label>Description</label>
            <textarea rows={5} placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.description} onChange={e=> setCar({...car, description: e.target.value})}></textarea>
          </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Car'}
        </button>


      </form>

    </div>
  )
}

export default AddCar
