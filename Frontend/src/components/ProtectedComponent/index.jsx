import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthorizedPerson } from '../../utils/CookiesService';

export default function ProtectedRoute({children}) {

    useEffect(()=>{

    },[isAuthorizedPerson()]);
    if (!isAuthorizedPerson()) {
        // If the user is not authenticated, redirect to the sign-in page
        return <Navigate to="/signin" replace />;
      }
    
      // If the user is authenticated, render the children (protected component)
      return children;
}
