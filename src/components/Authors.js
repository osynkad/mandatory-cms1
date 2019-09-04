import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styles from './Authors.module.css';

function Authors(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/collections/get/authors?token=${props.API_KEY}`)
      .then(res => {
        console.log(res.data.entries);
        setUsers(res.data.entries)
      });
  }, [])

  return (
    <ul className={styles.users}>
      {
        users.length ?
          users.map(user => {
            return (
              <li key={user._id} className={styles.user}>
                <span className={styles.user__avatar}><img className={styles.user__avatar} src={user.avatar.path} alt="profile pic"/></span>
                <div className={styles.user__details}>
                  <span className={styles.user__name}>{user.name}</span>
                  <span className={styles.user__description}>{user.description}</span>
                </div>
              </li>
            )
          }) : <div style={{padding: "20px"}}>Loading...</div>
      }
    </ul>
  );
}

export default Authors;
