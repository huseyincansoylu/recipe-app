import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Recipe = () => {
    const [recipe, setRecipe] = useState<any>()
    const [activeTab, setActiveTab] = useState("ins")

    let { id } = useParams()

    console.log(id)

    useEffect(() => {
        id && fetchDetails(id)
    }, [id])

    const fetchDetails = async (id: string) => {
        const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)

        const data = await res.json()

        setRecipe(data)
    }

    return (
        <DetailWrapper>
            <div>
                <h2>{recipe?.title}</h2>
                <img src={recipe?.image} alt="" />
            </div>
            <Info>
                <Button className={activeTab === "ins" ? "active" : ""} onClick={() => setActiveTab("ins")}>Instructions</Button>
                <Button className={activeTab === "ing" ? "active" : ""} onClick={() => setActiveTab("ing")}>Ingredients</Button>

                {activeTab === "ins" ? <div>
                    <h3 dangerouslySetInnerHTML={{ __html: recipe?.summary }}></h3>
                    <h3 dangerouslySetInnerHTML={{ __html: recipe?.instructions }}></h3>
                </div> : <ul>
                    {recipe.extendedIngredients.map((i: any) => {
                        return (
                            <li key={i.id}>
                                {i.original}
                            </li>
                        )
                    })}
                </ul>}
            </Info>
        </DetailWrapper >
    )
}

export default Recipe



const DetailWrapper = styled.div`
 margin-top: 10rem;
 margin-bottom: 5rem;
 display: flex;

 .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
 }

 h2 {
    margin-bottom: 2rem;
 }

 li {
    font-size: 1.2rem;
    line-height: 2.5rem;
 }

 ul {
    margin-top: 2rem;
 }
`


const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left : 10rem;
`