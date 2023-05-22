```
# install dependencies
$ npm install

# generate a certificate
$ ./generate_cert.sh

# start the server
$ node index.js

# start the client
$ node client.js

# open Chrome
$ ./open_chrome.sh
```

You need to create an alias in your `/etc/hosts` file:

```
$ cat /etc/hosts
127.0.0.1   localhost
127.0.0.1   example.com
```
