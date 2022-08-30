import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { Recipe } from "../types";

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

export default SearchedPage


const Grid = styled.div`
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