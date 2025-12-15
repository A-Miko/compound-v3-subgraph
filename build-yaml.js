const fs = require('fs');
const mustache = require('mustache');

// Get the network argument from the command line
const network = process.argv[2];

if (!network) {
  console.error("Error: Please provide a network name (e.g., node build-yaml.js base-sepolia)");
  process.exit(1);
}

// Read the configuration files
try {
  const networksJson = fs.readFileSync('networks.json', 'utf8');
  const networks = JSON.parse(networksJson);

  const template = fs.readFileSync('subgraph.template.yaml', 'utf8');

  // Check if the requested network exists in networks.json
  if (!networks[network]) {
    console.error(`Error: Network '${network}' not found in networks.json`);
    process.exit(1);
  }

  // Prepare the view object for Mustache
  const view = networks[network];
  
  // Inject the 'network' key so {{ network }} works in the template
  view.network = network;

  // Render the template
  const output = mustache.render(template, view);

  // Write the result to subgraph.yaml
  fs.writeFileSync('subgraph.yaml', output);
  
  console.log(`Success: Generated subgraph.yaml for network '${network}'`);

} catch (err) {
  console.error("An error occurred:", err.message);
  process.exit(1);
}
