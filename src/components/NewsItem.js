import React from 'react'

const NewsItem=(props)=>{
    
        let {title,description,imageUrl,newsUrl,date,author}=props
        return(
            <div className="container my-3">
                <div className="card" >
                <img src={imageUrl===null?"https://cdn.mos.cms.futurecdn.net/bRMEu7XwrkEyJ6bYdkjDwn-1200-80.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    
                    
                    <p className="card-text"><small className="text-body-secondary">By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
                    
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
                </div>
            </div>
        )
    
}
export default NewsItem