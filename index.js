const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const inputs = {
      token: core.getInput('repo-token', {required: true}),
    }
    const GIPHY_API_KEY = process.env.GIPHY_API_KEY
    if (!GIPHY_API_KEY) {
      core.setFailed("Missing GIPHY_API_KEY");
      return;
    }
    core.info("Got Token");
    core.info(`${process.env.TEST_ENV}`);
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=lgtm`);
    const giphies = await(response.json());
    core.info(JSON.stringify(giphies['data']));
    core.info(`Length: ${giphies.length}`);
    const randomIndex = parseInt(Math.random() * giphies.length);
    core.info(`Index: ${randomIndex}`);
    const gif = giphies[randomIndex];
    core.info(JSON.stringify(gif));
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
