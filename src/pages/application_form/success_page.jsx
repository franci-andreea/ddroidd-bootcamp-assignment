import { useLocation } from "react-router-dom";
import Footer from "../partials/footer";
import Header from "../partials/header";

import './success_page.scss'

export default function SuccessPage() {
    
    const user = useLocation().state;
    console.log(useLocation().state);

    return(
        <div>
            <Header showButton={false}></Header>

            <div className='details-container'>

                <div className='success-message-container'>
                    <p className='success-message'>Excellent!<br />See you in November 2023!</p>
                </div>

                <div className='submission-summary-container'>
                    <p className='submission-summary-title'>Submission summary:</p>

                    <p>First name: {user.firstName}</p>
                    <p>Last name: {user.lastName}</p>
                    <p>Phone number: {user.phoneNumber}</p>
                    <p>Email address: {user.emailAddress}</p>
                    <p>Address: {user.addressLine1}, {user.addressLine2}</p>
                    <p>Country: {user.country}</p>
                    <p>State: {user.state === "" ? 'None' : user.state}</p>
                    <p>City: {user.city}</p> 
                </div>
                
            </div>

            <Footer></Footer>
        </div>
    )
}
