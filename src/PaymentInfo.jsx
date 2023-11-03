import React, { useState, useEffect } from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { useLocation } from 'react-router-dom';
function PaymentInfo() {

  const location = useLocation()
  const receivedData = location.state;

  if(receivedData){
 
  const [data, setData] = useState({
    minDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) - 2,
    maxDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) + 2
  })
  const minDate=new Date(receivedData.invoiceDate)
  const maxDate=new Date(receivedData.invoiceDate)
  const bestTermsMinDays=minDate.setDate(minDate.getDate()+data.minDays)
  const bestTermsMaxDays=maxDate.setDate(maxDate.getDate()+data.maxDays)
  const finalBestMin=new Date(bestTermsMinDays).toDateString()
  const finalBestMax=new Date(bestTermsMaxDays).toDateString()
  
  useEffect(() => {
    setData({
      minDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) - 2,
      maxDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) + 2
    })
  }, [receivedData])

  return (
    <div className='payment-info'>
      
      <div className='sector-info'>
        <h2>Sector Info (Payer)</h2>
        <p>In <span className='an'>{receivedData.paymentFromTerms.Country + ', ' + receivedData.paymentFromTerms.sector} Sector</span> payment dues are cleared between <span className='an'>{receivedData.paymentFromTerms.minDays} to {receivedData.paymentFromTerms.maxDays} days</span> from the date of invoice.</p>
      </div>
      <div className='sector-info'>
        <h2>Sector Info (Payee)</h2>
        <p>In <span className='an'>{receivedData.paymentToTerms.Country + ', ' + receivedData.paymentToTerms.sector} Sector</span> payment dues are cleared between <span className='an'>{receivedData.paymentToTerms.minDays} to {receivedData.paymentToTerms.maxDays} days</span> from the date of invoice.</p>
      </div>
      <div className='regulation sector-info'>
        <h2>Regulations in {receivedData.paymentFromTerms.Country}</h2>
        <p>{receivedData.regulationsFrom ? receivedData.regulationsFrom.regulation : "No regulations"}</p>
      </div>
      <div className='regulation sector-info'>
        <h2>Regulations in {receivedData.paymentToTerms.Country}</h2>
        <p>{receivedData.regulationsTo ? receivedData.regulationsTo.regulation : 'No regulations'}</p>
      </div>
      <div className='best-payment-terms sector-info'>
        <h2>Best payment terms between payer and payee</h2>
        <p><span className='an'>{receivedData.paymentFrom}</span> should pay <span className='an'>{receivedData.paymentTo}</span> between <span className='an'>{data.minDays} to {data.maxDays} days</span> from the date of Invoice.</p>
        <h3>Best dates to clear payments</h3>
        <p>Anywhere between <span className='an'>{finalBestMin} to {finalBestMax}</span></p>
        <h4>Penalties</h4>
        <p>{receivedData.regulationsTo ? 'Payer have to pay a penalty of ' + receivedData.regulationsTo.penaltyPer + '% to Payee if the payment is delayed by ' + receivedData.regulationsTo.penaltyAfter + ' days.' : 'No penalties will be charged if '+receivedData.paymentFrom+' delays the payment based on regulations for ' + receivedData.paymentToTerms.sector + ' in ' + receivedData.paymentToTerms.Country}</p>
      </div>
    </div>
  )
  }else{
    return(
      <div className='loading'>
      <h1>Enter companies details to see details here...</h1>
        </div>
    )
  }
}
export default PaymentInfo