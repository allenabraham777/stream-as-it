import React from 'react';
import AuthLayout from 'layouts/AuthLayout';
import SignInForm from 'components/Authentication/SignInForm';

type Props = {};

const SignInPage = (props: Props) => {
    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    );
};

export default SignInPage;
