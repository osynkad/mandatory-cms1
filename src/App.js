import React, { useState } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Articles from './components/Articles';
import Article from './components/Article';
import Authors from './components/Authors';

const API_KEY = '0f60f94685f8b2f2f5bd808fe6c324';

function App() {
  const [articleId, setArticleId] = useState("");

  function getArticleId (e) {
    setArticleId(e.target.parentNode.id);
  }
  //emm check router here pathing is bad
  return (
    <Router>
      <div className={styles.App}>
        <header className={styles.header}>
          <Link className={styles.link} to="/">Home</Link>
          <Link className={styles.link} to="/authors">Authors</Link>
        </header>
        <Switch>
          <Route exact path="/" render={() => <Articles API_KEY={API_KEY} getArticleId={getArticleId}/>}/>
          <Route exact path="/authors" render={() => <Authors API_KEY={API_KEY}/>}/>
          <Route path="/" render={() => <Article API_KEY={API_KEY} id={articleId} />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
