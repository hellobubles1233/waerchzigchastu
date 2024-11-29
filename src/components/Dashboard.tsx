import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { Client } from '@microsoft/microsoft-graph-client';
import { loginRequest } from '../config/auth';
import { useStore } from '../store/useStore';
import { ProfileRoutes } from '../routes';


const Dashboard: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);
  const { user, setUser} = useStore();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
   const getGraphData = async () => {
  try {
    const account = accounts[0];
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });

    const graphClient = Client.init({
      authProvider: (done) => {
        done(null, response.accessToken);
      },
    });

    // Fetch user data
    const userData = await graphClient.api('/me').get();
    setUser(userData);

    // Fetch profile picture
    const photoResponse = await graphClient
      .api('/me/photo/$value')
      .responseType('blob') // Ensures response is returned as a Blob
      .get();

    const photoUrl = URL.createObjectURL(photoResponse);
    setProfilePicture(photoUrl);
    
  } catch (error) {
    console.error('Error fetching data from Microsoft Graph:', error);
  } finally {
    setLoading(false);
  }
};


    getGraphData();
  }, [instance, accounts, setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-primary">Laden...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-light p-6 rounded-lg flex items-center">
        <div className='flex items-center'>
                  {profilePicture ? (
          <img
            src={profilePicture}
            alt={`${user?.displayName}'s profile`}
            className="w-16 h-16 rounded-full mr-4"
            draggable="false"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mr-4">
            N/A
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-dark gap-2">
            Willkommen, <span className='text-primary'>{user?.displayName}</span>
          </h1>
          <h6 className='flex text-dark mt-2'>
          <Link to="/settings">
            <button className='flex items-center gap-3 px-3 py-1 bg-dark text-light hover:bg-primary rounded-lg mt-auto mr-3'>
              <small>Einstellungen</small>
            </button>
          </Link>
            <button className='flex items-center gap-3 px-3 py-1 bg-dark text-light hover:bg-primary rounded-lg mt-auto'>
              <small>Profil</small>
            </button>
          </h6>
        </div>

          <h2 className='text-primary font-bold text-4xl px-6'>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <hr className='text-primary text-2xl px-3'/>
            <small>
            <div>{`${new Date().getDate().toString().padStart(2, '0')}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getFullYear()}`}</div>
            </small>
          </h2>
        </div>
      </div>
      <div className="bg-light p-6 rounded-lg flex items-center">
       <h1 className='text-primary ml-2 mt-2 text-4xl font-bold mb-4'>Apps</h1>
      </div>
    </div>
  );
};

export default Dashboard;
