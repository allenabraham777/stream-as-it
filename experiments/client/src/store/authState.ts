import { atom } from 'recoil';

interface IUser {
    user: string;
}

const authState = atom({
    key: 'authState',
    default: {
        user: 'user@email.com'
    } as IUser
});

export default authState;
