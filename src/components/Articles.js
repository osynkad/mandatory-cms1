import React, { useState, useEffect } from 'react';
import styles from './Articles.module.css';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios'

const articles = 5;

function Articles(props) {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(0);

  function formatUrl(title) {
    return title.split(" ").join("-").toLowerCase();
  }

  function getArticles(page) {
    axios.get(`http://localhost:8080/api/collections/get/articles?limit=${articles}&skip=${articles * page}&token=${props.API_KEY}`)
      .then(res => {
        setEntries(res.data.entries);
      });
  }

  function changePage (e) {
    let currentPage;
    if (e.target.id === "next") {
      currentPage = page + 1;
    } else {
      currentPage = page - 1;
    }
    setPage(currentPage);
    getArticles(currentPage);
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={styles.articles}>
      <p className={styles.articles__page}>Page: {page + 1}</p>
      <div className={styles.articles__buttons}>
        {
          page > 0 ?
            <button id="previous" onClick={changePage} className={styles.articles__button}>Previous page</button>
            :
            <button id="previous" onClick={changePage} className={styles.articles__button} disabled="disabled">Previous page</button>
        }
        <button id="next" onClick={changePage} className={styles.articles__button}>Next page</button>
      </div>
      {
        entries.map(entry => {
          return (
            <div id={entry._id} key={entry._id} className={styles.articles__post}>
              <Link className={styles["articles__post-title"]} to={"/" + formatUrl(entry.title)} onClick={props.getArticleId}>{entry.title}</Link>
              <div>
                <span>Posted by </span>
                <ul>
                  {
                    entry.author.map(author => {
                      return (
                        <li key={author._id}>{author.display}</li>
                      )
                    })
                  }
                </ul>
              </div>
              <span>{entry.published_on}</span>
              <ReactMarkdown source={entry.markdown}></ReactMarkdown>
            </div>
          )
        })
      }
    </div>
  );
}

export default Articles;
