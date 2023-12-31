import React from 'react';
import AuthLayout from 'layouts/AuthLayout';
import SignUpForm from 'components/Authentication/SignUpForm';

type Props = {};

const SignUpPage = (props: Props) => {
    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    );
};

export default SignUpPage;
