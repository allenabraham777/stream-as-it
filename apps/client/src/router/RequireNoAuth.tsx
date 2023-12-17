import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userState from 'selectors/userSelectors/userState';

type Props = {
    children: JSX.Element;
};

const RequireNoAuth = ({ children }: Props) => {
    const user = useRecoilValue(userState);
    const location = useLocation();
    if (user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireNoAuth;
