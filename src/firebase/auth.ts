import { signIn, signOut } from 'next-auth/react';

export const singUp = async () => {
  await signIn();
};

export const singIn = async () => {
  try {
    await signIn('google');    
  } catch (error) {
    console.log('signin: ', error);
  }
};

export const singOut = async () => {
  try {
    await signOut();    
  } catch (error) {
    console.log('signout: ', error);
  }
};