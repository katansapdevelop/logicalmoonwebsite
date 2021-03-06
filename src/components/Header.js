import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Container from "components/Container";


const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <header>
      <Container>
        <p>{data.site.siteMetadata.title}</p>
        {/* uncomment the line below to add your name in the header */}
        {/* <p>{data.site.siteMetadata.author}</p> */}
        <ul>
          <li>
            <AniLink
              cover
              to="/"
              bg="#6666ff"
              duration={0.7}
              className="header-link"
            >
              Home
            </AniLink>
          </li>
          <li>
            <a
              
              direction="right"
              href="https://radixlogicalmoon.gitbook.io/radix-logical-moon-docs/"
              bg="#6666ff"
              duration={0.7}
              className="header-link"
            >
              About
            </a>
          </li>
          
          <li>
            <a
              
              direction="right"
              href="https://radixlogicalmoon.gitbook.io/radix-logical-moon-docs/staking/why-stake-with-us#partnerships"
              bg="#6666ff"
              duration={0.7}
              className="header-link"
            >
              Partners
            </a>
          </li>
          
          <li>
            <AniLink
              cover
              direction="right"
              to="/status/"
              bg="#00d9ff"
              duration={0.7}
              className="header-link"
            >
              Status
            </AniLink>
          </li>
          
          
          <li>
            <AniLink
              cover
              to="/dashboard/"
              bg="#6666ff"
              duration={0.7}
              className="header-link"
            >
              Dashboard
            </AniLink>
          </li>


  
        </ul>
      </Container>
    </header>
  );
};

export default Header;
