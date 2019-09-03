import React, { useState } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Blog from './components/Blog';
import Article from './components/Article';
import Authors from './components/Authors';
import axios from 'axios'

const API_KEY = '0f60f94685f8b2f2f5bd808fe6c324';

function App() {
  const [entries, setEntries] = useState([]);

  function getArticles() {
    axios.get(`http://localhost:8080/api/collections/get/articles?token=${API_KEY}`)
      .then(res => {
        setEntries(res.data.entries);
      });
  }

  function getArticle(e) {
    axios.get(`http://localhost:8080/api/collections/get/articles?token=${API_KEY}&filter[_id]=${e.target.parentNode.id}`)
      .then(res => {
        setEntries(res.data.entries);
      });
  }

  return (
    <Router>
      <div className={styles.App}>
        <header className={styles.header}>
          <Link className={styles.link} to="/">Home</Link>
          <Link className={styles.link} to="/authors">Authors</Link>
        </header>
        <Route exact path="/" render={() => <Blog getArticles={getArticles} getArticle={getArticle} entries={entries}/>}/>
        <Route path="/article" render={() => <Article API_KEY={API_KEY} article={entries[0]}/>}/>
        <Route path="/authors" render={() => <Authors API_KEY={API_KEY}/>}/>
      </div>
    </Router>
  );
}

export default App;
