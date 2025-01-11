import logo from './logo.svg';
import './App.css';
import CareersCard from './Components/CareersCard/CareersCard.jsx';

function App() {
  return (
  <div className="App">
    <CareersCard 
      isElementary={true}
      title={"Agricultural Architect"} 
      headerColor={'green'}
      description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}/>
  </div>
  );
}

export default App;
