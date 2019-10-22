# Email
Email application sends an email from the 

|   |   |   |   |   |
|---|---|---|---|---|
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

## Endpoint
A cURL request can be performed to test the /email endpoint as follows 

`curl -X POST \
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
