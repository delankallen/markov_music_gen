# Generate music with Markov Chains

Use the supplied midi music or supply your own and generate new music using markov chains.

The easiest way to view the app would be my website, https://oarfish.dev.
The instructions for the tool are in the app.

You can run the program yourself by following these instructions.

You will need nodejs and npm to run the project.
Node js can be downloaded at https://nodejs.org/en/

Once installed you will need a command line to run `npm`.
Powershell if windows, terminal if linux or Mac.

Navigate to the project directory from the command line. From here you should run:

`npm install`

This will install all the packages.

Next run:

`npm run build`

This builds the app for production to the `build` folder.

Then run:

`npm install -g serve`
`serve -s build`

This will serve the app on http://localhost:5000
Open a browser and navigate to http://localhost:5000
