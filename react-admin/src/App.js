import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {

  const nav = useNavigate()

  useEffect(() => {
    //check if user is logged in or not
    let token = localStorage.getItem('token')
    console.log('token',token)
    if (token == 'null') {
      nav('/login')
    }
    
  },[])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
