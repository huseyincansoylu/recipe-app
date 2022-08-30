import { useEffect, useState } from 'react'
import { Recipe } from '../types'
import { Splide, SplideSlide } from "@splidejs/react-splide"
import { Card, Gradient, Wrapper } from '../ui'
import { Link } from 'react-router-dom'

const Veggie = () => {
    const [veggie, setVegie] = useState<Recipe[]>([])

    useEffect(() => {
        getVegie()
    }, [])

    const getVegie = async () => {

        const check = localStorage.getItem("veggie")

        if (check) {
            setVegie(JSON.parse(check))
        } else {
            const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
            const data: { recipes: Recipe[] } = await res.json()

            console.log(data, "xx11")

            setVegie(data.recipes)
            localStorage.setItem("veggie", JSON.stringify(data.recipes))
        }
    }

    return (
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>
            <Splide
                options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "2rem",
                }}
            >
                {veggie.map(recipe => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card key={recipe.id}>
                                <Link to={"/recipe/" + recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt="" />
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </Wrapper>
    )
}

export default Veggie