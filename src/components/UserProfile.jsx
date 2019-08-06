import React, { useState, useRef, useContext, useMemo } from 'react';
import { firestore } from '../firebase';
import { UserContext } from '../Providers/UserProvider';

const UserProfile = () => {
  const user = useContext(UserContext);
  const uid = useMemo(() => user && user.uid);
  const [state, setState] = useState({ displayName: '' });
  const imageInput = useRef();

  const handleChange = event => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { displayName } = state;

    if (displayName) {
      firestore.doc(`users/${uid}`).update({ displayName });
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
        <input type='file' ref={imageInput} onChange={handleChange} />
        <input type='Submit' className='update' />
      </form>
    </section>
  );
};

export default UserProfile;
