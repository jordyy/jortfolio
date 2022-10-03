import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./projects.css";

const TASTE_APP_QUERY = gql`
  query {
    user(login: "jordyy") {
      repository(name: "taste-app") {
        languages(first: 10) {
          edges {
            node {
              name
              color
            }
          }
        }
      }
    }
  }
`;

function TasteApp() {
  const { data, loading, error } = useQuery(TASTE_APP_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="title-container">
        <h1 className="project-title">Taste App</h1>
      </div>
      <div className="project-img-container">
        <img
          className="project-img"
          src="images/tasteauth.png"
          alt="spotify-authorization-page"
        />
        <img
          className="project-img"
          src="images/tastelogin.png"
          alt="spotify-authorization-page"
        />
        <img
          className="project-img"
          src="images/tastetoptracks.png"
          alt="spotify-authorization-page"
        />
      </div>

      <ul className="language-list">
        Languages used for this project include:
        {data.user.repository.languages.edges.map((language) => (
          <li key={language.node.color}>{language.node.name}</li>
        ))}
        <a href="https://github.com/jordyy/taste-app">
          <button className="github-button">
            <span className="text">Link to Github</span>
          </button>
        </a>
      </ul>
      <div></div>
    </>
  );
}

export default TasteApp;
