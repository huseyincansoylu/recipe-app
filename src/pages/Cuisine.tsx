import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import { Recipe } from '../types'

type CuisineResult = {
  number: number;
  offset: number
  results: Recipe[]
  totalResults: number
}

const Cuisine = () => {
  const { type } = useParams()

  const [cuisine, setCuisine] = useState<Recipe[]>([])

  useEffect(() => {
    if (type) {
      getCuisine(type)
    }
  }, [type])


  const getCuisine = async (name: string) => {
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
    const data: CuisineResult = await res.json()
    console.log(data)
    setCuisine(data.results)
  }

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map(item => {
        return (
          <Card key={item.id}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 3rem;
`

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 1.5rem;
  }

  a {
    text-decoration: none;
  }
  
  h4 {
    text-align: center;
    padding: 1rem;
  }
`

export default Cuisine