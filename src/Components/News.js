import React, { useEffect, useState } from 'react'
import "./app/News.css";
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
        props.setprogress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        props.setprogress(30)
        let parsedData = await data.json();
        props.setprogress(70)
        console.log(parsedData);
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)

        props.setprogress(100)

    }

    useEffect(() => {
    document.title = ` NewsRoom - ${capitalizeFirstLetter(props.category)}`
        updateNews();
    }, [])


    // const handlePreviosClick = async () => {
    //     setpage(page + 1)
    //     updateNews()
    // }

    // const handleNextClick = async () => {
    //     setpage(page - 1)
    //     updateNews()

    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setpage(page + 1)

        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)


    };


    return (
        <>
            <h3 className='text-center text-danger' style={{ margin: "30px" }}>NewsRoom : Top {capitalizeFirstLetter(props.category)} Headlines</h3>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-3 my-3" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7pfxHYqsggRqsmfpztD-IvhBLvzSjmQnjQ&usqp=CAU"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
// 22c5698b65814a788ff82f768f2f7a66