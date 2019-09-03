import React, { useEffect } from 'react';
import styles from './Blog.module.css';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

function Blog(props) {

  function formatUrl(title) {
    return title.split(" ").join("-").toLowerCase();
  }

  useEffect(() => {
    props.getArticles();
  }, []);

  return (
    <div className={styles.article}>
      {
        props.entries.map(entry => {
          return (
            <div id={entry._id} key={entry._id} className={styles.article__post}>
              <Link className={styles["article__post-title"]} to={"/article/" + formatUrl(entry.title)} onClick={(e) => props.getArticle(e)}>{entry.title}</Link>
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

export default Blog;
