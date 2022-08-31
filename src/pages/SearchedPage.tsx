import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { Recipe } from "../types";
import Card from "../components/Card";

type CuisineResult = {
  number: number;
  offset: number
  results: Recipe[]
  totalResults: number
}

const SearchedPage = () => {
  const { search } = useParams()
  const [meals, setMeals] = useState<Recipe[]>([])

  useEffect(() => {
    if (search) {
      getSearched(search)
    }
  }, [search])

  const getSearched = async (name: string) => {
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
    const data: CuisineResult = await res.json()
    setMeals(data.results)
  }

  return (
    <Grid>
      {meals.map(item => {
        const { id, image, title } = item
        return (
          <Card id={id} image={image} title={title} key={id} />
        )
      })}
    </Grid>
  )
}

export default SearchedPage

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 3rem;
`
