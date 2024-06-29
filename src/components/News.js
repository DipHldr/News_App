import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{

    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(false)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)
    
    
    const updateNews=async ()=>{
        props.setProgress(10)
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data=await fetch(url)
        props.setProgress(30)
        let parsedData=await data.json()
        props.setProgress(50)
        console.log(parsedData)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    useEffect(()=>{
        document.title=`${capitalizeFirstLetter(props.category)}-News Monkey`
        updateNews()

    },[])
    const componentDidMount=async ()=>{
        updateNews()
    }
    const handlePrevClick=async ()=>{       
        setPage(page-1)
        updateNews()        
    }

    const handleNextClick=async ()=>{      
        setPage(page+1)
        updateNews()
    }
    
   const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    const fetchMoreData =async () => {        
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        setLoading(true)
        let data=await fetch(url)
        let parsedData=await data.json()
        console.log(parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        
    }
    
        return(
            <>
                
                    <h1 className="text-center" style={{margin:'34px 0px',marginTop:'90px'}}>{capitalizeFirstLetter(props.category)}-Top Headlines</h1>
                    {loading&&<Spinner/>}
                    <InfiniteScroll
                            dataLength={articles.length}
                            next={fetchMoreData}
                            hasMore={articles.length!==totalResults}
                            loader={<Spinner/>}
                            >
                                <div className="container">
                        <div className="row">
                            { articles.map((element,index)=>{
                            return <div className="col-md-4" key={index}>
                              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
                            </div>                                
                            })}
                            
                        </div>
                        </div>
                        </InfiniteScroll>
                        {/* <div className="container d-flex justify-content-between">
                        <button type="button" disabled={page<=1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Prev</button>
                        <button type="button" disabled={page + 1>Math.ceil(totalResults/props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                        </div>*/}
                </>
            
        )
    
}
News.defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
}
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
    apiKey:PropTypes.string
}
export default News