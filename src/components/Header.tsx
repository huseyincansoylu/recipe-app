import { GiKnifeFork } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = () => {
    return (
        <Nav>
            <GiKnifeFork />
            <Logo to="/" >Recipe App</Logo>
        </Nav>
    )
}

export default Header


const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`


const Nav = styled.div`
 padding: 1.5rem 0rem 2.5rem 0rem;
 display: flex;
 justify-content: flex-start;
 align-items: center;

 svg {
  font-size: 2rem;
 }
`