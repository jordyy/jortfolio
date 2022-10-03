import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./github.css";

import {
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
} from "@chakra-ui/react";

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

  console.log("Jordy", data.user.repositoriesContributedTo.totalCount);

  return (
    <>
      <div id="container">
        <h1 className="jordy-h1">Jordy can do lots of things.</h1>
        <h1 className="jordy-h1">Jordy can do lots of things.</h1>
        <h1 className="jordy-h1">Jordy can do lots of things.</h1>
      </div>
      <div id="container">
        <h1 className="jordy-h1">You can do lots of things too.</h1>
        <h1 className="jordy-h1">You can do lots of things too.</h1>
        <h1 className="jordy-h1">You can do lots of things too.</h1>
      </div>

      <Flex>
        <StatGroup border="1px solid gray" p={2} borderRadius={8} w="auto">
          <Stat>
            <StatLabel>Repositories Contributed To</StatLabel>
            <StatNumber>
              {data.user.repositoriesContributedTo.totalCount}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Flex>
      <div>
        <ul>
          {data.user.repositoriesContributedTo.nodes.map((repo) => (
            <li key={repo.name}>{repo.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RepoList;
