import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import appStore from './utils/appStore'
import { Provider, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import { addUser, removeUser } from './utils/userSlice'

function AppContent() {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
      } else {
        dispatch(removeUser());
      }

    });
    return () => unsubscribe();

  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <AppContent />
    </Provider>
  )
}

export default App