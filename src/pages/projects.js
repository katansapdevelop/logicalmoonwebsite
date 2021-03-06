import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import Layout from "components/Layout";
import Container from "components/Container";

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
              type
            }
            html
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Layout pageName="projects">
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <Container>
        <h1>FAQ</h1>
        <ol>
          {data.allMarkdownRemark.edges.map((edge) => {
            return (
              <li>
                <AniLink
                  cover
                  direction="up"
                  to={`/faq/${edge.node.fields.slug}`}
                  bg="#6666ff"
                  duration={0.5}
                >
                  <div className="project-card">
                    <h2>{edge.node.frontmatter.title}</h2>
                    {/* <p>{edge.node.frontmatter.date}</p>
                    <p>{edge.node.frontmatter.type}</p> */}
                  </div>
                </AniLink>
              </li>
            );
          })}
        </ol>
      </Container>
    </Layout>
  );
};

export default ProjectsPage;
