import React from 'react';
import styles from './Article.module.css'
import ReactMarkdown from 'react-markdown'
import { Redirect } from 'react-router-dom';

function Article(props) {
  return (
    <div className={styles.article}>
      {
        !props.article ? <Redirect to="/"/> :
          <div key={props.article._id} className={styles.article__post}>
            <span className={styles["article__post-title"]}>{props.article.title}</span>
            <div>
              <span>Posted by </span>
              <ul>
                {
                  props.article.author.map(author => {
                    return (
                      <li key={author._id}>{author.display}</li>
                    )
                  })
                }
              </ul>
            </div>
            <span>{props.article.published_on}</span>
            <ReactMarkdown source={props.article.markdown}></ReactMarkdown>
          </div>
      }
    </div>
  );
}

export default Article;
