// import * as fs from "fs";
// const openSource = {
//   githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
//   githubUserName: "jordyy",
//   githubRepo: "jortfolio",
// };

// const fetch = require("node-fetch");

// //gets all PRs by a user
// const query_pr = {
//   query: `
//   query {
//     user(login: ${openSource.githubUserName}){
//       pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
//     totalCount
//     nodes{
//       id
//       title
//       url
//       state
//         mergedBy {
//             avatarUrl
//             url
//             login
//         }
//         createdAt
//         number
//       changedFiles
//         additions
//         deletions

//     }
//   }
//   }
// }
//       `,
// };

// // gets all repos contributed to by a specified user
// const getContributedRepos = {
//   query: `{
//     user(login: ${openSource.githubUserName}) {
//       id
//       repositoriesContributedTo(
//         first: 5
//         contributionTypes: [COMMIT]
//         includeUserRepositories: true
//       ) {
//         nodes {
//           name
//           owner {
//             login
//           }
//         }
//         pageInfo {
//           endCursor
//           hasNextPage
//         }
//         totalCount
//       }
//     }
//   }`,
// };

// // gets all commits to a specified repo
// const getCommits = {
//   query: `query{
//         user(login: ${openSource.githubUserName}) {
//             repository{
//                 name
//                 owner{
//                   login
//                   url
//                 }
//               } {
//       defaultBranchRef {
//         target {
//           ... on Commit {
//             history(first: 100, author: name) {
//               nodes {
//                 commitUrl
//                 deletions
//                 additions
//                 author {
//                   user {
//                     login
//                   }
//                   email
//                   name
//                 }
//                 message
//                 messageBody
//                 changedFiles
//                 committedDate
//                 oid
//                 committedViaWeb
//                 pushedDate
//               }
//               pageInfo {
//                 hasNextPage
//                 hasPreviousPage
//                 endCursor
//               }
//               totalCount
//             }
//           }
//         }
//       }
//     }
//   }}`,
// };

// // queries for all issues assigned to a specified user
// const query_issue = {
//   query: `query{
//           user(login: "${openSource.githubUserName}") {
//       issues(last: 100, orderBy: {field:CREATED_AT, direction: DESC}){
//         totalCount
//         nodes{
//             id
//           closed
//           title
//           createdAt
//           url
//           number
//           assignees(first:100){
//             nodes{
//               avatarUrl
//               name
//               url
//             }
//           }
//           repository{
//             name
//             url
//             owner{
//               login
//               avatarUrl
//               url
//             }
//           }
//         }
//       }
//     }
//       }`,
// };

// //queries for all organizations a specified user has contributed to
// const query_org = {
//   query: `query{
//       user(login: "${openSource.githubUserName}") {
//           repositoriesContributedTo(last: 100){
//             totalCount
//             nodes{
//               owner{
//                 login
//                 avatarUrl
//                 __typename
//               }
//             }
//           }
//         }
//       }`,
// };

// const query_pinned_projects = {
//   query: `
//       query {
//         user(login: "${openSource.githubUserName}") {
//           pinnedItems(first: 6, types: REPOSITORY) {
//             totalCount
//             nodes{
//               ... on Repository{
//                 id
//                     name
//                     createdAt,
//                     url,
//                     description,
//                     isFork,
//                     languages(first:10){
//                       nodes{
//                         name
//                       }
//                     }
//               }
//             }
//             }
//         }
//       }
//       `,
// };

// const baseUrl = "https://api.github.com/graphql";

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: "bearer " + openSource.githubConvertedToken,
// };

// fetch(baseUrl, {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(query_pr),
// })
//   .then((response) => response.text())
//   .then((txt) => {
//     const data = JSON.parse(txt);
//     let cropped = { data: [] };
//     cropped["data"] = data["data"]["user"]["pullRequests"]["nodes"];

//     let open = 0;
//     let closed = 0;
//     let merged = 0;
//     for (let i = 0; i < cropped["data"].length; i++) {
//       if (cropped["data"][i]["state"] === "OPEN") open++;
//       else if (cropped["data"][i]["state"] === "MERGED") merged++;
//       else closed++;
//     }

//     cropped["open"] = open;
//     cropped["closed"] = closed;
//     cropped["merged"] = merged;
//     cropped["totalCount"] = cropped["data"].length;

//     console.log("Fetching the Pull Request Data.\n");
//     fs.writeFile(
//       "./src/shared/opensource/pull_requests.json",
//       JSON.stringify(cropped),
//       function (err) {
//         if (err) {
//           console.log(err);
//         }
//       }
//     );
//   })
//   .catch((error) => console.log(JSON.stringify(error)));

// fetch(baseUrl, {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(query_issue),
// })
//   .then((response) => response.text())
//   .then((txt) => {
//     const data = JSON.parse(txt);
//     let cropped = { data: [] };
//     cropped["data"] = data["data"]["user"]["issues"]["nodes"];

//     let open = 0;
//     let closed = 0;
//     for (let i = 0; i < cropped["data"].length; i++) {
//       if (cropped["data"][i]["closed"] === false) open++;
//       else closed++;
//     }

//     cropped["open"] = open;
//     cropped["closed"] = closed;
//     cropped["totalCount"] = cropped["data"].length;

//     console.log("Fetching the Issues Data.\n");
//     fs.writeFile(
//       "./src/shared/opensource/issues.json",
//       JSON.stringify(cropped),
//       function (err) {
//         if (err) {
//           console.log(err);
//         }
//       }
//     );
//   })
//   .catch((error) => console.log(JSON.stringify(error)));

// fetch(baseUrl, {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(query_org),
// })
//   .then((response) => response.text())
//   .then((txt) => {
//     const data = JSON.parse(txt);
//     const orgs = data["data"]["user"]["repositoriesContributedTo"]["nodes"];
//     let newOrgs = { data: [] };
//     for (let i = 0; i < orgs.length; i++) {
//       let obj = orgs[i]["owner"];
//       if (obj["__typename"] === "Organization") {
//         let flag = 0;
//         for (let j = 0; j < newOrgs["data"].length; j++) {
//           if (JSON.stringify(obj) === JSON.stringify(newOrgs["data"][j])) {
//             flag = 1;
//             break;
//           }
//         }
//         if (flag === 0) {
//           newOrgs["data"].push(obj);
//         }
//       }
//     }

//     console.log("Fetching the Contributed Organization Data.\n");
//     fs.writeFile(
//       "./src/shared/opensource/organizations.json",
//       JSON.stringify(newOrgs),
//       function (err) {
//         if (err) {
//           console.log(err);
//         }
//       }
//     );
//   })
//   .catch((error) => console.log(JSON.stringify(error)));

// const languages_icons = {
//   Python: "logos-python",
//   "Jupyter Notebook": "logos-jupyter",
//   HTML: "logos-html-5",
//   CSS: "logos-css-3",
//   JavaScript: "logos-javascript",
//   "C#": "logos-c-sharp",
//   Java: "logos-java",
// };

// fetch(baseUrl, {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(query_pinned_projects),
// })
//   .then((response) => response.text())
//   .then((txt) => {
//     const data = JSON.parse(txt);
//     const projects = data["data"]["user"]["pinnedItems"]["nodes"];
//     let newProjects = { data: [] };
//     for (let i = 0; i < projects.length; i++) {
//       let obj = projects[i];
//       let langobjs = obj["languages"]["nodes"];
//       let newLangobjs = [];
//       for (let j = 0; j < langobjs.length; j++) {
//         if (langobjs[j]["name"] in languages_icons) {
//           newLangobjs.push({
//             name: langobjs[j]["name"],
//             iconifyClass: languages_icons[langobjs[j]["name"]],
//           });
//         }
//       }
//       obj["languages"] = newLangobjs;
//       newProjects["data"].push(obj);
//     }

//     console.log("Fetching the Pinned Projects Data.\n");
//     fs.writeFile(
//       "./src/shared/opensource/projects.json",
//       JSON.stringify(newProjects),
//       function (err) {
//         if (err) {
//           console.log(
//             "Error occured in pinned projects 1",
//             JSON.stringify(err)
//           );
//         }
//       }
//     );
//   })
//   .catch((error) =>
//     console.log("Error occured in pinned projects 2", JSON.stringify(error))
//   );

// fetch(baseUrl, {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(getCommits),
// })
//   .then((response) => response.text())
//   .then((txt) => {
//     const data = JSON.parse(txt);
//     let cropped = { data: [] };
//     cropped["data"] =
//       data["data"]["user"]["defaultBranchRef"]["target"]["on Commit"]["nodes"];
//     let newCommit = { data: [] };

//     for (let i = 0; i < cropped["data"].length; i++) {
//       if (cropped["data"]["user"]["defaultBranchRef"]["target"]["on Commit"])
//         open++;
//       else closed++;
//     }

//     cropped["open"] = open;
//     cropped["closed"] = closed;
//     cropped["totalCount"] = cropped["data"].length;

//     console.log("Fetching the Issues Data.\n");
//     fs.writeFile(
//       "./src/shared/opensource/issues.json",
//       JSON.stringify(cropped),
//       function (err) {
//         if (err) {
//           console.log(err);
//         }
//       }
//     );
//   })
//   .catch((error) => console.log(JSON.stringify(error)));

// fetch(baseUrl, {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(getContributedRepos),
// })
//   .then((response) => response.text())
//   .then((txt) => {
//     const data = JSON.parse(txt);
//     const repos =
//       data["data"]["user"]["repositoriesContributedTo"]["nodes"]["pageInfo"][
//         "totalCount"
//       ];
//     let newRepos = { data: [] };
//     for (let i = 0; i < repos.length; i++) {
//       let obj = repos[i]["owner"];
//       if (obj["__typename"] === "Repository") {
//         let flag = 0;
//         for (let j = 0; j < newRepos["data"].length; j++) {
//           if (JSON.stringify(obj) === JSON.stringify(newRepos["data"][j])) {
//             flag = 1;
//             break;
//           }
//         }
//         if (flag === 0) {
//           newRepos["data"].push(obj);
//         }
//       }
//     }

//     console.log("Fetching the Contributed Repos Data.\n");
//     fs.writeFile(
//       "./src/shared/opensource/repositories.json",
//       JSON.stringify(newRepos),
//       function (err) {
//         if (err) {
//           console.log(err);
//         }
//       }
//     );
//   })
//   .catch((error) => console.log(JSON.stringify(error)));
