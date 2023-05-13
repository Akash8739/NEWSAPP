import React, { useEffect,useState } from 'react'

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  const[articles,setAeticcles]=useState([])
  const[loading,setloading]=useState([true])
  const[page,setpage]=useState(1)
  const[totalResults,settotalResult]=useState(0)
 // document.title=`${this.capitalizeFirstLetter(props.category)}-NEWSAPP`;
 const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
  const updateNews =async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setAeticcles(parsedData.articles)
    settotalResult(parsedData.totalResults)
    setloading(false)
    
  props.setProgress(100);
}
useEffect(() =>{
  updateNews();
},[])
  
 const handleprevClick = async()=>{
setpage(page-1)
updateNews();

  }
 const handlenextClick= async()=>{
setpage(page+1)
updateNews();
}
 const fetchMoreData =  async() => {
  setpage(page+1)
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
  
  let data = await fetch(url);
  let parsedData = await data.json()
  setAeticcles(articles.concat(parsedData.articles))
  settotalResult(parsedData.totalResults)
  
};
  
  
    return (
      <>
        <h2 className='text-center'style={{margin:'35px 0px', marginTop:'90px'}}>New-Top Heading on {capitalizeFirstLetter(props.category)}</h2>
        {loading &&<Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container my-3'>
        <div className='row'>
        { articles.map((element)=>{

          return <div className='col-md-4' key={element.url}>
        <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage}
        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>

        })}
        
       
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    )
  
}


News.defaultProps={
  country:"in",
  pageSize:8,
  category:'general',
}
News.propTypes= {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category: PropTypes.string,
}

export default News
