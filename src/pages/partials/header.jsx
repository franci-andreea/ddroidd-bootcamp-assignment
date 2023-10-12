import { useNavigate } from 'react-router-dom'
import './header.scss'

export default function Header({showButton}) {
    let navigate = useNavigate();

    function navigateToJoinUs() {
        navigate('/join-us');
    }

    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img src='src/assets/ddroidd_logo.svg' className='logo-icon'/>
            </div>
            
            <div className='title-container'>
                <p className='header-center-title'>Autumn - Winter Bootcamp</p>
            </div>

            {showButton 
                ? <div className='join-us-button-container'>
                    <button className='join-us-button' onClick={navigateToJoinUs}>Join Us</button>
                  </div> 
                : <div className='grow-container'></div>
            }
        </div>
    )
}
