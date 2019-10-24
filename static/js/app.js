function buildMetadata(sample) {
  var selector = d3.select("#sample-metadata");
     // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    selector.html("");

  // Use the list of sample names to populate the select options
  d3.json("/metadata/"+sample).then((metadata_sample) => {
 
// console.log(metadata_sample)
for (var key in metadata_sample){
  selector
        .append("li")
        .text(`${key}: ${metadata_sample[key]}`)
}
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  })
}

// function buildCharts(sample) {

      // @TODO: Use `d3.json` to fetch the sample data for the plots
      function buildCharts(sample) {
        d3.json(`/samples/${sample}`).then((data) => {
          const otu_ids = data.otu_ids;
          const otu_labels = data.otu_labels;
          const sample_values = data.sample_values;

          // @TODO: Build a Bubble Chart using the sample data
          var trace1 = {
            x: data.otu_ids,
            y: data.sample_values,
            mode: 'markers',
            type: 'scatter',
            marker: {
              size: data.sample_values,
              color: data.otu_ids,
      colorscale: "Earth"
            },
    text_values: data.otu_lables
          };
          // var bcLayout={
          //   margin:{},
          //   hovermode:"closest"
          //   xaxis:{}
          // };
          var bubbleChart = [trace1];
          Plotly.newPlot("bubble", bubbleChart);
                   // @TODO: Build a Pie Chart
          // HINT: You will need to use slice() to grab the top 10 sample_values,
          // otu_ids, and labels (10 each).
          var pData = [{
            values: sample_values.slice(0, 10),
            labels: otu_ids.slice(0, 10),
            hoverinfo: 'hovertext',
            type: 'pie'
          }];

          var pLayout = {
            height: 400,
            width: 500,
            hovermode: 'closest'
                      };
          Plotly.newPlot("pie", pData, pLayout);
        })}

function init() {

            // Grab a reference to the dropdown select element
            var selector = d3.select("#selDataset");

            // Use the list of sample names to populate the select options
            d3.json("/names").then((sampleNames) => {
              sampleNames.forEach((sample) => {
                selector
                  .append("option")
                  .text(sample)
                  .property("value", sample);
              });

              // Use the first sample from the list to build the initial plots
              const firstSample = sampleNames[0];
              buildCharts(firstSample);
              buildMetadata(firstSample);
            });
          }

function optionChanged(newSample) {
            // Fetch new data each time a new sample is selected
            buildCharts(newSample);
            buildMetadata(newSample);
          }

// Initialize the dashboard
init();
  