import { useEffect, useState } from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { Recipe } from '../types'
import Card from '../components/Card'

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
        const { id, image, title } = item
        return (
          <Card id={id} image={image} title={title} key={id} />
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

export default Cuisine