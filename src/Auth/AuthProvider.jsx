import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.ini';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null)

    const [loader, setLoader] = useState(true)

    const [theme, setTheme] = useState(() => {
        // Load from localStorage or fallback to false (light mode)
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'true'; // stored as string
    });

    // Save to localStorage when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
        const currentTheme = theme ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [theme]);

    const google = () => {
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (userProfile) => {
        setLoader(true)
        return updateProfile(auth.currentUser, userProfile)
    }

    const Logout = () => {
        setLoader(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscibe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoader(false)
            if (currentUser?.email) {
                const userData = { email: currentUser.email }
                axios.post('https://group-study-platform-backend.vercel.app/jwt', userData, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data)
                        // const token=res.data.token
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
        return () => {
            unSubscibe
        }
    }, [])

    const info = {
        theme,
        user,
        loader,
        setLoader,
        setTheme,
        google,
        Logout,
        createUser,
        updateUser,
        signIn
    }
    return (
        <AuthContext value={info}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;