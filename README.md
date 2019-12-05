# Email handler
This email handler application sends an email using the SendGrid system using the MailGun system as a failover. The RESTful API endpoint `/email` requires a body to be sent with the following `JSON` structure. The `cc` and `bcc` fields are optional. All other fields are required

```
{
	"to": [<string>, <string>, ...],
	"cc": [<string>, <string>, ...],
	"bcc": [<string>, <string>, ...],
	"subject": <string>,
	"text": <string>,
	"from": <string>
}
```

## Validation

* Todo: Replace with `validate.js` https://validatejs.org/
* The API will return a 400 status code if any of the required parameters of `to`, `subject`, `text` and `from` are missing.
* The API will return a 400 status code if the `to`, `cc` or `bcc` paramaters are not valid arrays of email addresses.
* The API uses the [validator](https://www.npmjs.com/package/validator) npm package to confirm valid email structure

## Error handling

The application checks for an invalid JSON body using a custom express.js middleware function that checks for a 400 error status on every request.

## Install and Setup

### Mail configuration
It is necessary to have an `.env` file containing various API keys for the SendGrid and Mailgun packages, as shown below. This file is not added to source control and is required to be manually created in a test environment and in production


```
PORT = 8080
MAILGUN_DOMAIN = <mailgun-domain>
MAILGUN_API_KEY = <mailgun-api-key>
SENDGRID_API_KEY = <send-grid-api-key>
```

### Server startup
Perform a `git clone` and `npm install` in a remote server and enter the following command to execute the node.js listener so that it can respond to API requests

`npm run start`

## Endpoint
A `cURL` request can be performed to test the `/email` endpoint as follows 

```
curl -X POST \
  http://138.68.247.201:8080/email \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 175' \
  -H 'Content-Type: application/json' \
  -H 'Host: 138.68.247.201:8080' \
  -H 'Postman-Token: c772241a-7fc9-488b-9ac4-b23c02e1deac,02baf092-1cf0-4522-bcca-1f56aabe1cf2' \
  -H 'User-Agent: PostmanRuntime/7.18.0' \
  -H 'cache-control: no-cache' \
  -d '{
	"to": ["james.ioppolo@gmail.com"],
	"cc": ["james.ioppolo@gmail.com"],
	"bcc": [],
	"subject": "subject line",
	"text": "text message",
	"from": "james.ioppolo@gmail.com"
}'
```

## Tests

Execute the following command to run the unit tests in the project:

`npm run test`
