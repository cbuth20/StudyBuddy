# Netlify functions

Netlify supports serverless functions that can be utilized as a middleware service for initializing and excuting different API calls.

See more information here - ![Netlify Functions](https://docs.netlify.com/functions/overview/)


## Use Cases

We are currently using these services for the following use cases:

**Algolia DB** - Fetching content sensitive documents. There is automation set in place to parse all markdown files in 'sensitive' docs folder at buildtime. These documents are then stored in our Algolia Database (index - authwall) as JSON objects. 
'''server.js''' file is used as an endpoint to service requests for different documents from this source.

**Athena Query Service** - Issuing queries on S3 bucket storing Docs portal analytics. Currently have log drains sending server logs from Netlify to AWS S3 storage. '''call-query.js''' is used as a query service leveraging AWS Athena. Used to populate cards at following site - https://analytics-athena.netlify.app/. Allow a few seconds for load time

**Slack Scheduler** - Issuing weekly stats dump to slack channel with Web API. Utilizing Slack's WebAPI for weekly updates on site analytics sent to slack channel #docs-analytics-newsletter. Utilizes file '''scheduled-slack-background.js'''.

**JWT Authentication Services** - Used in '''server.js''' file. Recieves a JWT token and uses Public Key (stored in env variables) to verify user.


## Configuration details

* Configuring function path for Netlify build
 Within the configuration settings **Site Name** > **Functions** > **Settings & Usage** you can define the path that netlify functions are stored in. At build time, Netlify will map to this path and create bundle

* Middleware function variables
 Within settings **Site Name** > **Build & Deploy** > **Environment** you will find Environemnt variables. These are used within the function initializes with various different keys etc.

 *Current key list*
 * ALGOLIA_APP_ID
 * ALGOLIA_INDEX 
 * ALGOLIA_WRITE_KEY
 * PUBLIC_JWT
 * ACCESS_KEY_SERVICES --> Aws access key
 * SECRET_KEY_SERVICES --> Aws secret key

 These are all references from .js files as '''process.env.${keyname}'''