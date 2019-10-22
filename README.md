# Email handler
This email handler application sends an email using the SendGrid system using the MailGun system as a failover. The RESTful API endpoint requires a body to be sent with the following key value pairs using `x-www-form-urlencoding`.

| Key | Value |
|---|---|
| from | email address  |
| to   | comma separated list of email addresses   |
| cc  | comma separated list of email addresses |
| bcc  | comma separated list of email addresses |
| subject  | text string  |
| text | text string |

## Install and Setup

### Mail configuration
It is necessary to have an `.env` file containing various API keys for the SendGrid and Mailgun packages, as shown below. This file is not added to source control and is required to be manually created in a test environment and in production


```
MAILGUN_DOMAIN = <mailgun-domain>
MAILGUN_API_KEY = <mailgun-api-key>
SENDGRID_API_KEY = <send-grid-api-key>
```

### Server startup
Perform a git clone in a remote server and enter the following command to execute the node.js listener so that it can respond to API requests

`node index.js`

## Endpoint
A cURL request can be performed to test the /email endpoint as follows 

```
curl -X POST \
  http://138.68.247.201:8080/email \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 115' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Host: 138.68.247.201:8080' \
  -H 'Postman-Token: 63dbe408-9917-4e0c-8d75-62bd5c1e373a,9f6a7649-13b7-44fd-b407-f86f4330578e' \
  -H 'User-Agent: PostmanRuntime/7.18.0' \
  -H 'cache-control: no-cache' \
  -d 'recipients=james.ioppolo%40gmail.com&cc=&bcc=&subject=subject&message=test%20message&from=james.ioppolo%40gmail.com'`
```

## Tests

Execute the following command to run the unit tests in the project

`npm run test`
