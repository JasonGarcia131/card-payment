import './App.css';
import { useState } from 'react';

function App() {

  //State for card info form
  const [cardInfo, setCardInfo] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    cvv: "",
    expirationDate: ""
  });

  //State for error messages 
  const [errorMessage, setErrorMessage] = useState("");

  //State for boolean to conditionally render the side of the card.
  const [isBackSide, setIsBackSide] = useState(false);

  //Watches the changes for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
    if(name === "cvv") return setIsBackSide(true);
    setIsBackSide(false);
  }

  //Regex expression grouping card number into groups of 4. ex: ["1234", "5678", ...];
  const cardNum = cardInfo.cardNumber.toString().match(/\d{1,4}/g);
  const mappedCardNum = cardNum?.map((nums) => <p>{nums}</p>)

  //Conditionally renders the side of the card 
  const cardSide = isBackSide ? (
    <div className=' flip-animation'>
      <p className='black-strip'>Black strip</p>
      <div className='cvv'>
        <p></p>
        <p>{cardInfo.cvv}</p>
      </div>
    </div>
  ) : (
    <div className='card column flip-animation'>
      <p className='bold'>Bank</p>
      <div className='row'>
        <p className='chip'>
          <hr />
          <hr />
          <hr />
        </p>
        <p className='bold visa'>VISA</p>
      </div>
      <div className='card-number-container row'>
        {mappedCardNum}
      </div>
      <div className='row'>
        <p className='name-container'>{cardInfo.firstName} {cardInfo.lastName}</p>
        <div className='expiration-date-container'>
          <p>Exp: </p>
          <p> {cardInfo.expirationDate}</p>
        </div>

      </div>
    </div>
  );

  return (
    <div className="App mobile row">
      <div className='card-container'>
        {cardSide}
      </div>
      <div className='form-container'>
        <form className='column'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name="firstName"
            value={cardInfo.firstName}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name="lastName"
            value={cardInfo.lastName}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor='cardNumber'>Card Number</label>
          <input
            type='text'
            name="cardNumber"
            maxLength="16"
            value={cardInfo.cardNumber}
            onChange={(e) => handleChange(e)}
          />
          {mappedCardNum?.length > 4 ? <p>Card number cannot exceed 16 digits</p> : ""}
          <label htmlFor='expirationDate'>Expiration Date</label>
          <input
            type='month'
            name="expirationDate"
            value={cardInfo.expirationDate}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor='cvv'>CVV</label>
          <input
            type='text'
            name="cvv"
            className='cvv'
            maxLength="3"
            value={cardInfo.cvv}
            onChange={(e) => handleChange(e)}
          />
          {cardInfo.cvv.length > 3 ? <p>Card number cannot exceed 3 digits</p> : ""}
          <button>Book Now!</button>
        </form> 
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
