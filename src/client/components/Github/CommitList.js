import { Octokit } from "@octokit/core";
import React, { useEffect, useState } from "react";
import Projects from "../Projects/Projects";

function CommitList() {
  const [commits, setCommits] = useState([]);

  const openSource = {
    githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
    githubUserName: "jordyy",
    githubRepo: "jortfolio",
  };

  useEffect(() => {
    const octokit = new Octokit({ auth: openSource.githubConvertedToken });
    const owner = openSource.githubUserName,
      repo = openSource.githubRepo,
      perPage = 25;
    async function fetchMostRecentCommits() {
      const fiveMostRecent = await octokit.request(
        `GET /repos/{owner}/{repo}/commits`,
        { owner, repo, per_page: perPage }
      );
      setCommits(fiveMostRecent.data);
    }
    fetchMostRecentCommits();
  }, [
    openSource.githubRepo,
    openSource.githubUserName,
    openSource.githubConvertedToken,
  ]);
  return (
    <>
      <ul>
        <div>
          The following {commits.length} commits were made by{" "}
          {openSource.githubUserName} within the {openSource.githubRepo}{" "}
          repository
        </div>
        {commits.map((commit, index) => (
          <li key={index}>
            {commit.author.login}: {commit.commit.message}
          </li>
        ))}
      </ul>
    </>
  );
}

export default CommitList;
