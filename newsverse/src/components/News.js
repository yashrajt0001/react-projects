import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

function News(props) {
  
      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
      const [totalResults, setTotalResults] = useState(0)

  const fetchData = async()=> {
    let data = await axios.get(`https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=1c72fd98543e4a009d6e40ecb691fd4e&page=${page + 1}&pageSize=${props.pageSize}`)
    setPage(page + 1)
    setArticles(articles.concat(data.data.articles))
  }

  function uppercaseCategory(category)
  {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  useEffect(() => {
      document.title = uppercaseCategory(props.category) + ' - Newsverse'
      updateNews()
  }, [])

  const updateNews = async() => {
    // let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=1c72fd98543e4a009d6e40ecb691fd4e&page=${page}&pageSize=${props.pageSize}`;
    //   props.handleProgress(10)
    //   let data = await fetch(url);
    //   props.handleProgress(100);
    //   let parsedData = await data.json();

    //   setLoading(false)
    //   setArticles(parsedData.articles)
    //   setTotalResults(parsedData.totalResults)
    //   props.handleProgress(100);
    props.handleProgress(10);
    let data = await axios.get(`https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=1c72fd98543e4a009d6e40ecb691fd4e&page=${page}&pageSize=${props.pageSize}`)
    props.handleProgress(100);
    setLoading(false);
    setArticles(data.data.articles)
    setTotalResults(data.data.totalResults);
  }

  // const handlePrevClick = async () => {
  //     await setPage(page-1)
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   await setPage(page+1)
  //   updateNews();
  // };

    return (
      <>
        <h1 className="heading">Newsverse - Top {uppercaseCategory(props.category)} headlines</h1>
        {loading && <Loading />}
        {!loading && 
          <div className="main-container">
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchData}
              hasMore={articles.length !== totalResults}
              loader={<Loading />}
            >
              <div className="container">
                {articles.map((element) => {
                  return (
                    <NewsItem
                      key={element.url}
                      title={element.title}
                      publishedAt={element.publishedAt}
                      description={element.description}
                      url={element.url}
                      urlToImage={element.urlToImage}
                      source={element.source.name}
                    />
                  );
                })}
              </div>
            </InfiniteScroll>

            {/* <div className="buttons">
              <button
                className={`nav-btn ${
                  page <= 1 ? "btn-disable" : ""
                }`}
                disabled={page <= 1}
                onClick={handlePrevClick}
              >
                &larr; Previous
              </button>
              <button
                className={`nav-btn ${
                  page >= Math.ceil(totalResults / 12)
                    ? "btn-disable"
                    : ""
                }`}
                disabled={
                  page >= Math.ceil(totalResults / 12)
                }
                onClick={handleNextClick}
              >
                Next &rarr;
              </button>
            </div> */}
          </div>
        }
      </>
    );
}
News.defaultProps = {
    country: "in",
    pageSize: 12,
    page: 1,
    category: 'general'
  };

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
export default News;