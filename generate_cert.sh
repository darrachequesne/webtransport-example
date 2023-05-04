#!/bin/bash
openssl req -new -x509 -nodes \
    -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 \
    -out cert.pem -keyout key.pem \
    -days 10 \
    -subj '/CN=localhost'
