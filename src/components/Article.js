import React, { useState, useEffect } from 'react';
import styles from './Article.module.css'
import ReactMarkdown from 'react-markdown'
import { Redirect } from 'react-router-dom';
import axios from 'axios'

function Article(props) {
  const [article, setArticle] = useState({})

  useEffect(() => {
    if (props.id) {
      axios.get(`http://localhost:8080/api/collections/get/articles?token=${props.API_KEY}&filter[_id]=${props.id}`)
        .then(res => {
          setArticle(res.data.entries[0]);
        });
    }
  }, []);

  return (
    <div className={styles.article}>
      {
        !props.id ?
          <Redirect to="/"/>
          :
          Object.entries(article).length ?
            <div key={props.id} className={styles.article__post}>
              <span className={styles["article__post-title"]}>{article.title}</span>
              <div>
                <span>Posted by </span>
                <ul>
                  {
                    article.author.map(author => {
                      return (
                        <li key={author._id}>{author.display}</li>
                      )
                    })
                  }
                </ul>
              </div>
              <span>{article.published_on}</span>
              <ReactMarkdown source={article.markdown}></ReactMarkdown>
            </div>
            :
            <div style={{padding: "20px"}}>Loading...</div>
      }
    </div>
  );
}

export default Article;
