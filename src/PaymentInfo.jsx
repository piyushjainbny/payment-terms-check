import React, { useState, useEffect } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useLocation } from 'react-router-dom';
function PaymentInfo() {

  const location = useLocation()
  const receivedData = location.state;


  if (receivedData.paymentFromTerms && receivedData.paymentToTerms) {

    const [data, setData] = useState({
      minDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) - 2,
      maxDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) + 2
    })
    const minDate = new Date(receivedData.invoiceDate)
    const maxDate = new Date(receivedData.invoiceDate)
    const bestTermsMinDays = minDate.setDate(minDate.getDate() + data.minDays)
    const bestTermsMaxDays = maxDate.setDate(maxDate.getDate() + data.maxDays)
    const finalBestMin = new Date(bestTermsMinDays).toDateString()
    const finalBestMax = new Date(bestTermsMaxDays).toDateString()

    useEffect(() => {
      setData({
        minDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) - 2,
        maxDays: Math.floor((receivedData.paymentToTerms.minDays + receivedData.paymentToTerms.maxDays) / 2) + 2
      })
    }, [receivedData])

    return (
      <div className='payment-info'>
        <div className='row'>
          <div className='sector-info'>
            <h2>Sector Info (Payer)</h2>
            <p>In <span className='an'>{receivedData.paymentFromTerms.Country + ', ' + receivedData.paymentFromTerms.sector} Sector</span> payment dues are cleared between <span className='an'>{receivedData.paymentFromTerms.minDays} to {receivedData.paymentFromTerms.maxDays} days</span> from the date of invoice.</p>
          </div>
          <div className='sector-info'>
            <h2>Sector Info (Payee)</h2>
            <p>In <span className='an'>{receivedData.paymentToTerms.Country + ', ' + receivedData.paymentToTerms.sector} Sector</span> payment dues are cleared between <span className='an'>{receivedData.paymentToTerms.minDays} to {receivedData.paymentToTerms.maxDays} days</span> from the date of invoice.</p>
          </div>
        </div>
        <div className='row'>
          <div className='regulation sector-info'>
            <h2>Regulations on {receivedData.paymentFromTerms.sector} sector in {receivedData.paymentFromTerms.Country} (Payer)</h2>
            <p>{receivedData.regulationsFrom ? receivedData.regulationsFrom.regulation : "No regulations"}</p>
          </div>
          <div className='regulation sector-info'>
            <h2>Regulations on {receivedData.paymentToTerms.sector} sector in {receivedData.paymentToTerms.Country} (Payee)</h2>
            <p>{receivedData.regulationsTo ? receivedData.regulationsTo.regulation : 'No regulations'}</p>
          </div>
        </div>
        <div className='best-payment-terms'>
          <div className='sector-info'>
            <h2>Best payment terms between payer and payee</h2>
            <p><span className='an'>{receivedData.paymentFrom}</span> should pay <span className='an'>{receivedData.paymentTo}</span> between <span className='an'>{data.minDays} to {data.maxDays} days</span> from the date of Invoice.</p>
          </div>
          <div className='sector-info'>
            <h2>Best dates to clear payments</h2>
            <p>Anywhere between <span className='an'>{finalBestMin} to {finalBestMax}</span></p>
          </div>
          <div className='sector-info'>
            <h2>Penalties</h2>
            <p style={{ color: receivedData.regulationsTo ? 'red' : 'black' }}>{receivedData.regulationsTo ? '*Payer have to pay a penalty of ' + receivedData.regulationsTo.penaltyPer + '% to Payee if the payment is delayed by ' + receivedData.regulationsTo.penaltyAfter + ' days.' : 'No penalties will be charged if ' + receivedData.paymentFrom + ' delays the payment based on regulations for ' + receivedData.paymentToTerms.sector + ' in ' + receivedData.paymentToTerms.Country}</p>
          </div>
        </div>
        <div className='footer'>
          <h2>Footer of the website</h2>
          <p>This is a footer of the website</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className='loading'>
        <h1>No Data Found for selected sectors or country</h1>
      </div>
    )
  }
}
export default PaymentInfo