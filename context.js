//context <API></>
//useContext hooks


//context (warehouse)
//Provider  (delivery boy s)
//consumer / (useContext( you ))
import React, { useContext, useEffect, useState } from 'react';

const API_URL = 'http://www.omdbapi.com/?apikey=fb8a209&s';
//const API_URL = 'https://www.omdbapi.com/?apikey=fb8a209&s=the%20dark%20night';
//const API_URL ='http://www.omdbapi.com/?apikey=fb8a209&s=Lagaan';

const AppContext = React.createContext();

//we need to create a provider fun == we present the globally


//AppProvoder cover full area
const AppProvider = ({children}) =>{

    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState([]);
    const [isError, setIsError] =  useState({ show:"false", msg:"" });
    const [query, setQuery] = useState("titanic")

    const  getMovies = async(url) =>{
    try{
        const res =await  fetch (url);
        const data =await  res.json();
        console.log(data);
        if(data.Response === "True"){
            setIsLoading(false);
            setIsError({
                show:false,
                msg:"",
            })
            setMovie(data.Search);
        }else{
        setIsError({
            show:true,
            msg:data.Error,
        })
        }
    }catch(error){
        console.log(error)
    }
    }
 //Debounce  
useEffect(()=>{
   let timeOut = setTimeout(() =>{
        getMovies(`${API_URL}&s=${query}`);
    },500);
  return ()=> clearTimeout(timeOut);
    
},[query])

    return <AppContext.Provider value={{isLoading, isError, movie,query, setQuery}}>
        {children}
        </AppContext.Provider>

};

//global custom hooks

const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalContext}

