import React from "react";
import CommitList from "../Github/CommitList";
import RepoList from "../Github/RepoList";
import Tasteapp from "../Projects/Tasteapp";

function Github() {
  return (
    <>
      <RepoList />
      <CommitList />
    </>
  );
}

export default Github;
