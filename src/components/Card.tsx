import { Link } from 'react-router-dom';
import styled from 'styled-components'

type CardProps = {
  image: string;
  title: string;
  id: any;
}

const Card = ({ image, title, id }: CardProps) => {
  return (
    <RecipeCard>
      <Link to={"/recipe/" + id}>
        <img src={image} alt="" />
        <h4>{title}</h4>
      </Link>
    </RecipeCard>
  )
}

export default Card

const RecipeCard = styled.div`
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