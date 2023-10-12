import { useEffect, useState } from 'react'
import Footer from '../partials/footer'
import Header from '../partials/header'
import './application_form.scss'
import { useNavigate } from 'react-router-dom'

export default function ApplicationForm() {

    let navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    const [disableState, setDisableState] = useState(true);
    const [foundErrors, setFoundErrors] = useState(false);

    let phoneError = [];

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/flag/unicode')
            .then(response => response.json())
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));
    }, [])

    function handleSelectedCountry(e) {
        setCountryName(e.target.value);
        let country = e.target.value.toLowerCase();

        if (country === 'united states') {
            setDisableState(false);

            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: country })
            };

            fetch('https://countriesnow.space/api/v0.1/countries/states', requestOptions)
                .then(response => response.json())
                .then(response => { setStates(response.data.states) })
                .catch(error => console.error(error));
        }
        else {
            setDisableState(true);

            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: country })
            };

            fetch('https://countriesnow.space/api/v0.1/countries/cities', requestOptions)
                .then(response => response.json())
                .then(response => { setCities(response.data) })
                .catch(error => console.error(error));
        }
    }

    function handleSelectedState(e) {
        setStateName(e.target.value);
        let state = e.target.value.toLowerCase();

        if (countryName === 'united states') {
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: countryName, state: state })
            };

            fetch('https://countriesnow.space/api/v0.1/countries/state/cities', requestOptions)
                .then(response => response.json())
                .then(response => { setCities(response.data) })
                .catch(error => console.error(error));
        }
    }

    function handleSelectedCity(e) {
        setCityName(e.target.value);
    }

    function handleJoinUsSubmit(e) {
        e.preventDefault();
        const validPhoneNumber = new RegExp("^(\\+4|)?(0(\\s|)?7[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\\s|)?([0-9]{3}(\\s|)){2}$");

        if (!validPhoneNumber.test(phoneNumber)) {
            phoneError = 'Wrong number format';
            setFoundErrors(true);

            return;
        }

        let newUser = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            country: countryName,
            state: stateName,
            city: cityName
        }

        navigate('/success', { state: newUser });
    }

    return (
        <div>
            <Header showButton={false}></Header>

            <div className='form-container'>
                <p className='application-form-title'>Application Form</p>

                <form onSubmit={handleJoinUsSubmit} className='form-component'>
                    <p className='contact-information'>Contact information</p>

                    <div className='name-container'>
                        <div className='field-container'>
                            <label className='form-label bold'>First Name<span className='mandatory-field-star'>*</span></label>
                            <input required type='text' className='input-field' placeholder='First Name' onChange={(e) => { setFirstName(e.target.value); }} />
                        </div>

                        <div className='field-container'>
                            <label className='form-label bold'>Last Name<span className='mandatory-field-star'>*</span></label>
                            <input required type='text' className='input-field' placeholder='Last Name' onChange={(e) => { setLastName(e.target.value); }} />
                        </div>
                    </div>

                    <div className='phone-email-container'>
                        <div className='field-container'>
                            <label className='form-label'>Phone number<span className='mandatory-field-star'>*</span></label>
                            <input required type='text' className='input-field' placeholder='+40 711 111 111' onChange={(e) => { setPhoneNumber(e.target.value); }} />
                        </div>

                        <div className='field-container'>
                            <label className='form-label'>Email address<span className='mandatory-field-star'>*</span></label>
                            <input required type='email' className='input-field' placeholder='john@doe.com' onChange={(e) => { setEmailAddress(e.target.value); }} />
                        </div>
                    </div>

                    <p className='address'>Address</p>

                    <div className='address-container'>
                        <div className='field-container'>
                            <label className='form-label'>Address Line 1<span className='mandatory-field-star'>*</span></label>
                            <input required type='text' className='input-field address-field' placeholder='Street name & number' onChange={(e) => { setAddressLine1(e.target.value); }} />
                        </div>

                        <div className='field-container'>
                            <label className='form-label'>Address Line 2</label>
                            <input type='text' className='input-field address-field' placeholder='Suite, apartament' onChange={(e) => { setAddressLine2(e.target.value); }} />
                        </div>
                    </div>

                    <div className='select-container'>
                        <div className='field-container'>
                            <label className='form-label'>Country<span className='mandatory-field-star'>*</span></label>
                            <select required className='select-field' onChange={handleSelectedCountry}>
                                {/* <option value="No country selected" className='select-placeholder-text'>Country</option> */}
                                {countries.map(country => <option value={country.name} key={country.name}>{country.name}</option>)}
                            </select>
                        </div>

                        <div className='field-container'>
                            <label className='form-label'>State</label>
                            <select className='select-field' onChange={handleSelectedState}>
                                {/* <option value="No state selected">State</option> */}
                                {disableState
                                    ? <option value="No state found" disabled className='select-placeholder-text'>No state available</option>
                                    : states.map(state => <option value={state.name} key={state.state_code}>{state.name}</option>)}
                            </select>
                        </div>

                        <div className='field-container'>
                            <label className='form-label'>City<span className='mandatory-field-star'>*</span></label>
                            <select required className='select-field' onChange={handleSelectedCity}>
                                {cities.map(city => <option value={city} key={city}>{city}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='submit-button-container'>
                        {foundErrors &&
                            <div className='error-list-container'>
                                <span>{phoneError}</span>
                            </div>
                        }
                        <input type='submit' value='Join Us' className='join-us-button' />
                    </div>
                </form>
            </div>

            <Footer></Footer>
        </div>
    )
}
