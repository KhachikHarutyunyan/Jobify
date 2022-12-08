import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components';
import main from "../assets/images/main.svg";
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Landing = () => {
  const {token} = useAppContext();
  if (token) {
    return <Navigate to="/"/>
}
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
            <h1>job <span>tracking</span>App</h1>
            <p>
            I'm baby tattooed cronut la croix butcher, direct trade health goth hoodie cloud bread praxis same letterpress polaroid cray flexitarian. 
            Whatever vape DIY, art party everyday carry fanny pack lomo migas bitters biodiesel. Irony celiac normcore forage pitchfork polaroid flannel
             coloring book raw denim heirloom scenester DIY farm-to-table. Ethical hashtag food truck next level portland humblebrag viral cred tattooed 
             forage deep v yuccie banh mi selvage. Squid four dollar toast pour-over live-edge fit.
            </p>
            <Link to="/register" className='btn btn-hero'>Login / Register</Link>
        </div>
        <img src={main} alt="job hunt" className='img main-img' />
      </div>
    </Wrapper>
  )
}


export default Landing
