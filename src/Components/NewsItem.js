import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card" >
          <div>
          <span className="badge rounded-pill bg-danger" style={{display:"flex", justifyContent:"flex-end",position:"absolute",right:"0",top:"1px" }}>{source}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            <div className="card-footer my-2">
              <small className="text-body-secondary">By {author ? author:"Unknown"} On {new Date(date).toGMTString()}</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
