// import React from "react";
// import { useQuery, gql } from "@apollo/client";
// import { Doughnut, Pie } from "react-chartjs-2";
// import { Chart, ArcElement } from "chart.js";
// Chart.register(ArcElement);

// const TASTE_APP_QUERY = gql`
//   query {
//     user(login: "jordyy") {
//       repository(name: "taste-app") {
//         languages(first: 10) {
//           edges {
//             node {
//               name
//               color
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const options = {
//   legend: {
//     display: false,
//     position: "right",
//   },
//   elements: {
//     arc: {
//       borderWidth: 0,
//     },
//   },
// };

// const pieOptions = {
//   legend: {
//     display: false,
//     position: "right",
//   },
//   elements: {
//     arc: {
//       borderWidth: 0,
//     },
//   },
// };

// const chartData = {
//   maintainAspectRatio: false,
//   responsive: false,
//   labels: [],
//   datasets: [
//     {
//       data: [300, 50, 100, 50],
//       backgroundColor: "#99CCFF",
//       hoverBackgroundColor: "#999933",
//     },
//   ],
// };

// const pieData = {
//   maintainAspectRatio: false,
//   responsive: false,
//   labels: [{data.user.repository.languages.edges.map((language) => {language.node.name})}],
//   datasets: [
//     {
//       data: [{data.user.repository.languages.edges.map((language) => {language.node.name})}],
//       backgroundColor: [{data.user.repository.languages.edges.map((language) => {language.node.backgroundColor})}],
//       hoverBackgroundColor: "#CCCC66",
//     },
//   ],
// }

// function TasteappChart() {
//   let chartInstance = null;
//   const { data, loading, error } = useQuery(TASTE_APP_QUERY);
//   if (loading) return "Loading...";
//   if (error) return <pre>{error.message}</pre>;

//   return (
//     <div className="taste-chart">
//       <div style={styles.relative}>
//         <Doughnut data={chartData} options={options} />
//         <div style={styles.pieContainer}>
//           <Pie
//             data={chartData}
//             options={pieOptions}
//             ref={(input) => {
//               chartInstance = input;
//             }}
//           />
//         </div>
//         <div id="legend" />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   pieContainer: {
//     width: "40%",
//     height: "40%",
//     top: "50%",
//     left: "50%",
//     position: "absolute",
//     transform: "translate(-50%, -50%)",
//   },
//   relative: {
//     position: "relative",
//   },
// };

// export default TasteappChart;
