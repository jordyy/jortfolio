import React from "react";
import { useQuery, gql } from "@apollo/client";

const openSource = {
  githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
  githubUserName: "jordyy",
  githubRepo: "jortfolio",
};

const REPOS_QUERY = gql`
query{
    user(login: "${openSource.githubUserName}") {
      id
      repositoriesContributedTo(
          first: 100
          contributionTypes: [COMMIT]
          includeUserRepositories: true
        ) {
          nodes {
            name
            languages (first: 10) {
              edges {
                node {
                  name
                  __typename
                  color
                }
              }
            } 
            owner {
              login
            }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  }
  `;

function RepoList() {
  const { data, loading, error } = useQuery(REPOS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div>
        <ul>
          {data.user.repositoriesContributedTo.nodes.map((repo) => (
            <li key={repo.name}>{repo.name}</li>
          ))}
        </ul>
      </div>
      ;
    </>
  );
}

export default RepoList;
