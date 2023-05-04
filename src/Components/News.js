import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import "./app/News.css";
import PropTypes from 'prop-types'

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
    constructor() {
        super();

        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22c5698b65814a788ff82f768f2f7a66&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let pasrsedData = await data.json();

        this.setState({
            articles: pasrsedData.articles,
            totalResults: pasrsedData.totalResults,
            loading: false
        })
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
    render() {
        return (
            <div>
                <div className="container my-3">
                    <h3 className='text-center text-danger' style={{ margin: "30px" }}>NewsRoom : Top {(this.props.category).toUpperCase()} Headlines</h3>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-3 my-3" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 75) : ""} imageUrl={!element.urlToImage ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7pfxHYqsggRqsmfpztD-IvhBLvzSjmQnjQ&usqp=CAU" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
                <div className="container navigation_buttons" style={this.state.loading ? { display: 'none' } : {
                    displ
                        : 'block'
                }}>
                    <button disabled={this.state.page <= 1} className="button_navigation" type='button' onClick={this.handlePreviosClick} >&#8592; Previous</button>
                    <button className="button_navigation" type='button' onClick={this.handleNextClick} style={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ? { display: 'none' } : { display: 'block' }}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News
// 22c5698b65814a788ff82f768f2f7a66