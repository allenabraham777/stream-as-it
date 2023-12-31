import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type Props = {};

const SignUpForm = (props: Props) => {
    return (
        <div className="flex items-center justify-center bg-white px-8 py-10">
            <div className="w-full">
                <h2 className="text-3xl font-bold leading-tight text-black">
                    Create a new account
                </h2>
                <p className="my-4 text-sm text-gray-600 ">
                    Already have an account?{' '}
                    <Link
                        to="/signin"
                        className="font-semibold text-black transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                <form action="#" method="POST" className="mt-2">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                {' '}
                                Name{' '}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Name"
                                ></input>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                {' '}
                                Email address{' '}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                ></input>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Password{' '}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                ></input>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Confirm Password{' '}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                ></input>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="inline-flex text-xl w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 gap-4"
                            >
                                Create Account <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
