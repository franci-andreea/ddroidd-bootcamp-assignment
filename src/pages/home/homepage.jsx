import { useNavigate } from "react-router-dom";
import Footer from "../partials/footer";
import Header from "../partials/header";
import './homepage.scss'

export default function Homepage() {
    let navigate = useNavigate();

    function navigateToJoinUs() {
        navigate('/join-us');
    }

    return(
        <div>
            <Header showButton={true}></Header>
            <div className='homepage-container'>
                <div className='icons-container'>
                    <div>
                        <img src='src/assets/destructuring.svg' />
                    </div>

                    <div>
                        <img src='src/assets/WebPage_logo.svg' />
                    </div>
                </div>

                <div className='join-us-button-container'>
                    <button className='join-us-button' onClick={navigateToJoinUs}>Join Us</button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
