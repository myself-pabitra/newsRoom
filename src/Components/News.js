import React, { Component } from 'react'
import "./app/News.css";
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults : 0
        }
        document.title = ` NewsRoom - ${this.capitalizeFirstLetter(this.props.category)}`

    }
    async updateNews() {
        this.props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        this.props.setProgress(70)
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100)

    }
    async componentDidMount() {
        this.updateNews()

    }
    handlePreviosClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()

    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
        
    };

    render() {
        return (
            <>
                <h3 className='text-center text-danger' style={{ margin: "30px" }}>NewsRoom : Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
                {this.state.loading && <Spinner />}
                <InfiniteScroll 
                dataLength={this.state.articles.length}
                 next={this.fetchMoreData}
                 hasMore={ this.state.articles.length !== this.state.totalResults }
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
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
}

export default News
// 22c5698b65814a788ff82f768f2f7a66