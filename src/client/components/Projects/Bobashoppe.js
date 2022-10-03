import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./projects.css";

const BOBA_SHOPPE_QUERY = gql`
  query {
    user(login: "jordyy") {
      repository(name: "boba-shoppe") {
        languages(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

export default function BobaShoppe() {
  const { data, loading, error } = useQuery(BOBA_SHOPPE_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="title-container">
        <h1 className="project-title">Boba-Shoppe</h1>
      </div>
      <div className="project-img-container">
        <img
          className="project-img"
          src="images/bobaeditaccount.png"
          alt="boba-shoppe-edit-account-page"
        />
        <img
          className="project-img"
          src="images/bobaproducts.png"
          alt="boba-shoppe-products-page"
        />
        <img
          className="project-img"
          src="images/bobastripe.png"
          alt="boba-shoppe-stripe-integration"
        />
        <img
          className="project-img"
          src="images/bobajwt.png"
          alt="boba-shoppe-jwt-auth-page"
        />
      </div>

      <ul className="language-list">
        Languages used for this project include:
        {data.user.repository.languages.edges.map((language) => (
          <li key={language.node.color}>{language.node.name}</li>
        ))}
        <a href="https://github.com/GraceShopperBoba/Boba-Shoppe">
          <button className="github-button">
            <span className="text">Link to Github</span>
          </button>
        </a>
      </ul>
      <div></div>
    </>
  );
}
