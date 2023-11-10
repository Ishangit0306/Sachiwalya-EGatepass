import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';
import DashboardRoutes from './DashboardRoutes';

const AppNavigation = () => {
    const data = useAppSelector(selectAuthenticated);
    const { isLoggedIn, role } = useAppSelector(selectAuthenticated);
    console.log("islogin",isLoggedIn)
    console.log('authentication state are*************',data)
    return (
        <NavigationContainer>
            {!isLoggedIn ? <AuthNavigation /> : <DashboardRoutes role={role} />}
            {/* <DashboardRoutes role={role} /> */}

        </NavigationContainer>
    );
};

export default AppNavigation;
