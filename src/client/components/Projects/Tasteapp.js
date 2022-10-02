import React from "react";
import { useQuery, gql } from "@apollo/client";

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
      <div>
        <ul>
          {data.user.repository.languages.edges.map((language) => (
            <li key={language.node.color}>
              {language.node.name}
              {language.node.name}
              {language.node.color}
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </>
  );
}

export default TasteApp;
