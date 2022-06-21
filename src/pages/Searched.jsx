import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {Link} from "react-router-dom"
import { motion } from 'framer-motion';

const Searched = () => {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const params = useParams();


    const getSearched = async(name) => {
        const data = await fetch( `https://api.spoonacular.com/recipes/complexSearch?apiKey=827d59a43fce438d809d90db6e254ced&query=${name}`)
        const recipes = await data.json()
        setSearchedRecipes(recipes.results)
      };

      useEffect(() => {
        getSearched(params.search);
      },[params.search])

  return (
    <Grid
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity: 0}}
    transition={{duration: 0.5}}
    >
        {searchedRecipes?.map((item) => {
        return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
                </Link>
            </Card>
        )
})}
    </Grid>
  )
}
const Grid = styled(motion.div)`
display: grid; 
grid-template-columns: 1fr 1fr 1fr; 
grid-template-rows: 1fr 1fr 1fr; 
gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;

  }
  a {
    text-decoration: none;

  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`
export default Searched
