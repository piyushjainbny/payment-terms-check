import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import{AiOutlineArrowRight} from'react-icons/ai';
import {BsArrowRightCircleFill,BsArrowRightShort} from 'react-icons/bs';
import HashLoader from "react-spinners/HashLoader";
import axios from 'axios';
import PaymentInfo from './PaymentInfo'
function Form(props) {
  const navigate = useNavigate()
  const [details, setDetails] = useState(false)
  const [receivedData, setReceivedData] = useState()
  const[loading,setLoading]=useState(false)
  const [data, setData] = useState({
    paymentFrom: '',
    paymentTo: '',
    paymentFromSector: '',
    paymentToSector: '',
    paymentFromCountry: '',
    paymentToCountry: '',
    invoiceDate: ''
  })

  function onChange(e) {
    e.preventDefault()
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  async function onSubmit(e) {
    
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('https://paymentbackend.netlify.app/', data, { withCredentials: true }).then((res) => {
        setReceivedData(res.data)
        navigate('/details', { state: res.data })
        setLoading(false)
      })

    } catch {
      e => {
        console.log(e.message)
      }
    }

  }
  if(!loading){
  return (
    <div className='web'>
      <div className='content'>
        <h2>Check the Best <span className='sp'>payment</span><br></br>terms through us.</h2>
        <p>Never too early nor too late</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className='details-form'>
          <div className='form-column'>
            <h2>Payment from : </h2>
            <p>Company Name</p>
            <input type='text' placeholder='Company Name' name='paymentFrom' value={data.paymentFrom} onChange={onChange} required />
            <p>Sector</p>
            <select name='paymentFromSector' onChange={onChange} required>
              <option value=''>Select</option>
              <option value='IT'>IT</option>
              <option value='Food and Beverage'>Food & Beverages</option>
              <option value='Iron and Steel'>Iron & Steel</option>
              <option value='Textiles'>Textiles</option>
              <option value='Transportation'>Transportation</option>
            </select >
            <p>Country</p>
            <select name='paymentFromCountry' onChange={onChange} required>
              <option value=''>Select</option>
              <option value='India'>India</option>
              <option value='Australia'>Australia</option>
              <option value='USA'>USA</option>
            </select>
            <p>Invoice Date</p>
            <input type='date' name='invoiceDate' value={data.invoiceDate} onChange={onChange} required/>
          </div>
          <div className='form-column'>
            <h2>Payment to : </h2>
            <p>Company Name</p>
            <input type='text' placeholder='Company Name' name='paymentTo' value={data.paymentTo} onChange={onChange} required/>
            <p>Sector</p>
            <select name='paymentToSector' onChange={onChange} required>
              <option value=''>Select</option>
              <option value='IT'>IT</option>
              <option value='Food and Beverage'>Food & Beverages</option>
              <option value='Iron and Steel'>Iron & Steel</option>
              <option value='Textiles'>Textiles</option>
              <option value='Transportation'>Transportation</option>
            </select >
            <p>Country</p>
            <select name='paymentToCountry' onChange={onChange} required>
              <option value=''>Select</option>
              <option value='India'>India</option>
              <option value='Australia'>Australia</option>
              <option value='USA'>USA</option>
            </select>
          </div>
        </div>
        <button id='submit-button' type='submit'>Check <BsArrowRightShort size={30}/></button>
      </form>
    </div>
  )
  }else{
    return(
    <div className='loading'>
    <HashLoader
       color='#8ee4af'
       loading={loading}
       size={50}
       aria-label="Loading..."
       data-testid="loader"
    />
      </div>
      )
  }
}
export default Form;