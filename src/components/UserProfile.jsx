import React, { useState, useRef, useContext, useMemo } from 'react';
import { firestore, storage } from '../firebase';
import { UserContext } from '../Providers/UserProvider';

const UserProfile = () => {
  const user = useContext(UserContext);
  const imageInput = useRef();
  const uid = useMemo(() => user && user.uid);
  const [state, setState] = useState({ displayName: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { displayName } = state;

    if (displayName) {
      firestore.doc(`users/${uid}`).update({ displayName });
      setState({ displayName: '' });
    }

    if (imageInput.current.files.length > 0) {
      console.warn(imageInput.current.files.length > 0);
      storage
        .ref()
        .child('user-profiles')
        .child(uid)
        .child(imageInput.current.files[0].name)
        .put(imageInput.current.files[0])
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => firestore.doc(`users/${uid}`).update({ photoURL }));
    }
  };

  const { displayName } = state;
  return (
    <section className='UserProfile'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={displayName}
          name='displayName'
          placeholder='Display Name'
          onChange={handleChange}
        />
        <input type='file' ref={imageInput} />
        <input type='Submit' className='update' />
      </form>
    </section>
  );
};

export default UserProfile;
