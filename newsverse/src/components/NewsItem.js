import React from "react";
import noImage from './noImage.png';

function NewsItem(props) {
  
    let { title, description, url, urlToImage, publishedAt, source } = props;
    return (
      <>
        <div className="news-card-container">
          <span className="source">{source}</span>
          <div className="img">
            <img src={urlToImage ? urlToImage : noImage} alt="" />
          </div>
          <span className="time">{new Date(publishedAt).getDate() + '-' + new Date(publishedAt).getMonth()+1 + '-' + new Date(publishedAt).getUTCFullYear()}</span>
          <h3 className="news-title">{title ? title : "No title available"}</h3>
          <p className="news-desc">
            {description ? description : "No description available"}
          </p>
          <a href={url} target="_blank" rel="noreferrer" className="news-btn">
            Read more
          </a>
        </div>
      </>
    );
}

export default NewsItem;
