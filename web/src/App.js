import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const responseFacebook = async(response) => {
  if(response.accessToken){
    console.log('log in with access_token' + response.accessToken);
    let result = axios.post('http://localhost:8080/api/login',{
      token: response.accessToken
    })
    console.log(result.data)
  } 
}

function App() {
  return (
    <div>
      <FacebookLogin
        appId="489794862593025"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook} />
  </div>

  );
}

export default App;
  