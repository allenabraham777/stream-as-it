import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userState from 'selectors/userSelectors/userState';

type Props = {
    children: JSX.Element;
};

const RequireAuth = ({ children }: Props) => {
    const user = useRecoilValue(userState);
    const location = useLocation();
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;
