import React,{Component} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component{
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
        apiKey:PropTypes.string
    }
    constructor(props){
        super(props);
        console.log("This is constructor")
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-News Monkey`
    }
    async updateNews(){
        this.props.setProgress(10)
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data=await fetch(url)
        this.props.setProgress(30)
        let parsedData=await data.json()
        this.props.setProgress(50)
        console.log(parsedData)
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
        this.props.setProgress(100)
    }
    async componentDidMount(){
        this.updateNews()
    }
     handlePrevClick=async ()=>{
        
        this.setState({page:this.state.page-1})
        this.updateNews()        
    }

     handleNextClick=async ()=>{        
        this.setState({page:this.state.page+1})
        this.updateNews()
    }
    
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    fetchMoreData =async () => {
        this.setState({page:this.state.page+1})
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data=await fetch(url)
        let parsedData=await data.json()
        console.log(parsedData)
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
        })

    }
    render(){
        return(
            <>
                
                    <h1 className="text-center">{this.capitalizeFirstLetter(this.props.category)}-Top Headlines</h1>
                    {this.state.loading&&<Spinner/>}
                    <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length!==this.state.totalResults}
                            loader={<Spinner/>}
                            >
                                <div className="container">
                        <div className="row">
                            { this.state.articles.map((element,index)=>{
                            return <div className="col-md-4" key={index}>
                              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
                            </div>                                
                            })}
                            
                        </div>
                        </div>
                        </InfiniteScroll>
                        {/* <div className="container d-flex justify-content-between">
                        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                        <button type="button" disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                        </div>*/}
                </>
            
        )
    }
}