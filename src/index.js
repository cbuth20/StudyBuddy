import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { Amplify } from 'aws-amplify';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const fetchConfig = async () => {
//   const response = await fetch('https://study-buddy-max.netlify.app/.netlify/functions/server/api/config');
//   if (!response.ok) {
//     throw new Error('Failed to fetch config');
//   }
//   return response.json();
// };

const Main = () => {
  // const [config, setConfig] = useState(null);

  // useEffect(() => {
  //   fetchConfig().then(setConfig).catch(console.error);
  // }, []);

  // useEffect(() => {
  //   if (config) {
  //     Amplify.configure({
  //       Auth: {
  //         Cognito: {
  //           region: 'us-east-1',
  //           userPoolId: config.userPoolId,
  //           userPoolClientId: config.userPoolClientId,
  //           loginWith: {
  //             oauth: {
  //               domain: 'https://collaborateandmarinate.auth.us-east-1.amazoncognito.com',
  //               scopes: ['openid', 'email'],
  //               redirectSignIn: config.redirectSignIn,
  //               responseType: 'code', // or 'token' if using Implicit Grant
  //             },
  //             email: 'true', // Optional
  //           },
  //         }
  //       }
  //     });
  //   }
  // }, [config]);

  // if (!config) {
  //   return <div>Loading...</div>;
  // }

  return <App />;
};

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
