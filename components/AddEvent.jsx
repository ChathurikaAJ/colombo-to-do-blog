import { useState} from "react";
import { AddImage } from ".";
import { submitEvent } from "../services";
import { FormProvider, useForm } from "react-hook-form";


const AddEvent = () => {
    const [error, setError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const methods = useForm({mode: 'onBlur'})
    

    const handleSubmit = methods.handleSubmit((data, event)=>{
        event.preventDefault()      

        const {name, date, time, desc, email, link, image} = data

        const formData = new FormData()
        formData.append('file_1', image[0])
        formData.append('name', name)
        formData.append('date', date)
        formData.append('time', time)
        formData.append('desc', desc)
        formData.append('email', email)
        formData.append('link', link)

        submitEvent(formData)
        .then((res) => {
            setShowSuccessMessage(true)
            setTimeout(() =>{
                setShowSuccessMessage(false)
            }, 5000)
        })

        event.target.reset()
    })


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h1 className="text-3xl mb-8 font-semibold border-b pb-4">
        Add an Event
      </h1>
      <p className="text-l mb-4">
        Have an event that you'd like to add to our list? <br></br>Share any
        events in Colombo by providing the details below.
      </p>
      <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="font-semibold">Event Name *</label>
          <input
            className="p-2 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="name"
            placeholder="Name of your event"
            required
          ></input>
        </div>

        <div className="mb-6">
          <label className="font-semibold">Date *</label>
          <input
            className="p-2 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="date"
            type="date"
            placeholder="When will the event be held?"
            required
          ></input>
        </div>

        <div className="mb-6">
          <label className="font-semibold">Time *</label>
          <input
            className="p-2 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="time"
            placeholder="Time of your event"
            required
          ></input>
        </div>

        <div className="mb-6">
          <label className="font-semibold">Description *</label>
          <textarea
            className="p-2 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="desc"
            placeholder="About your event..."
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="font-semibold">Website</label>
          <input
            className="p-2 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="link"
            placeholder="Event link"
          ></input>
        </div>

        <div className="mb-6">
          <label className="font-semibold">Email *</label>
          <input
            type="email"
            className="p-2 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="email"
            placeholder="Once your event is posted. We will email you at this address."
            required
          ></input>
        </div>

        <div className="mb-6">
          <label className="font-semibold">Image</label>
            <AddImage name="image"/>
          
        </div>
        <button className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-red-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer">
          Submit
        </button>
      </form>
      </FormProvider>
      
      {showSuccessMessage && <span className="text-xl font-semibold mt-3 text-green-500">Event submitted</span>}
      
    </div>
    

  );
};

export default AddEvent;
