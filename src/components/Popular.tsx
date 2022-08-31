import { useEffect, useState } from 'react'
import { Recipe } from '../types'
import { Splide, SplideSlide } from "@splidejs/react-splide"
import { Gradient, SlideCard, Wrapper } from '../ui'
import { Link } from 'react-router-dom'

const Popular = () => {
    const [popular, setPopular] = useState<Recipe[]>([])

    useEffect(() => {
        getPopular()
    }, [])

    const getPopular = async () => {

        const check = localStorage.getItem("popular")

        if (check) {
            setPopular(JSON.parse(check))
        } else {
            const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
            const data: { recipes: Recipe[] } = await res.json()
            setPopular(data.recipes)
            localStorage.setItem("popular", JSON.stringify(data.recipes))
        }
    }

    return (
        <Wrapper>
            <h3>Popular</h3>
            <Splide
                options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "2rem",
                }}
            >
                {popular.map(recipe => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <SlideCard key={recipe.id}>
                                <Link to={"/recipe/" + recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt="" />
                                </Link>
                                <Gradient />
                            </SlideCard>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </Wrapper>
    )
}

export default Popular

