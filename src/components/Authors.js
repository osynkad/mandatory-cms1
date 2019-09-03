import React, { useEffect } from 'react';
import axios from 'axios'

function Authors(props) {

  useEffect(() => {
    axios.get(`http://localhost:8080/api/collections/get/authors?token=${props.API_KEY}`)
      .then(res => console.log(res));
  }, [])

  return (
    <div>
      <p>Authors Component</p>
    </div>
  );
}

export default Authors;
