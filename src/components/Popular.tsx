import { useEffect, useState } from 'react'
import { Recipe } from '../types'

const Popular = () => {
    const [popular, setPopular] = useState<Recipe[]>([])

    useEffect(() => {
        getPopular()
    }, [])

    const getPopular = async () => {
        const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
        const data: { recipes: Recipe[] } = await res.json()
        setPopular(data.recipes)
    }

    return (
        <div>
            {popular.map(recipe => {
                return (
                    <div>
                        <p>{recipe.title}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Popular