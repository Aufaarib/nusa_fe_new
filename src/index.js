import React from 'react';
import ReactDOM from 'react-dom';
import { registerLicense } from '@syncfusion/ej2-base';

import './index.css';
import App from './App';
import { ContextProviderAdminPMB } from './contexts/ContextProviderAdminPMB';
import { ContextProvider } from './contexts/ContextProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt/QHRqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9iS3xRd0xhUXxbdHRXRQ==;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xSdEdhWHZceHdQQmFaUg==;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhW35XcnxWQ2ReWEc=;ODAzODAzQDMyMzAyZTM0MmUzMEl3NHh6RUtyOWdReDUxU2R1QkR2SVdLcHgyRTVyd2FRc1VOZERrRHhYUWM9;ODAzODA0QDMyMzAyZTM0MmUzMGYxMThhMzFGSm01NTlwNXJDbTgraHRrdHRPN2RKUzZ6UnZOamVhbmhZZ0U9;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdERhW31feXZdRWVZUUd1;ODAzODA2QDMyMzAyZTM0MmUzMEhoSkt1cVBkenQzUTBsSTFLTnFUalBST3B4eS9GSU8raHhaWlRyUk5lekk9;ODAzODA3QDMyMzAyZTM0MmUzMGkzeTlIU1dZSUtTMmZ5NEVybjhYbm8vRnBqNjUzUUg0L2NEYi9WOEd6REE9;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhW35XcnxWQ2ZcVUc=;ODAzODA5QDMyMzAyZTM0MmUzMFVycnArbk1wU2ozL0JaUVBHa2c2bWNhOUhpZHhOWUNISXUrVVBpYVg0QUE9;ODAzODEwQDMyMzAyZTM0MmUzMGZJTzgzbm9xendtNEVza01sWnQ4TzRIMldmc3NhVUpiRVl1RHlnV3ZXalU9;ODAzODExQDMyMzAyZTM0MmUzMEhoSkt1cVBkenQzUTBsSTFLTnFUalBST3B4eS9GSU8raHhaWlRyUk5lekk9');

ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <AuthProvider>
        <ContextProviderAdminPMB>
          <ContextProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ContextProvider>
        </ContextProviderAdminPMB>
      </AuthProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root'),
);
