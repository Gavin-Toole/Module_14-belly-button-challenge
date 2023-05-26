// Get the RBelly Button Biodiversity data
const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
let data1 = d3.json(URL).then((data)  => console.log(data);


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

let sorted = data1.sort((a, b) => (b.otu_ids -a_otu_ids))
console.log(sorted);


// // Trace for the Greek Data
// let trace = {
//     x : data1.sort((a, b), b.sample.otu_ids - a.sample.otu_ids).slice(0, 10).reverse().map(row => row.sample.otu_ids),
//     y : data1.sort((a, b), b.sample.otu_ids - a.sample.otu_ids).slice(0, 10).reverse().map(row => row.sample.otu_ids),
//     type : 'bar',
//     orientation : 'h'
// };

// let layout = {
//     title: "Top 10 OTUs Present"
// }

// Plotly.newPlot("bar",[trace], layout)