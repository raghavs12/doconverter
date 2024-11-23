#!/bin/bash
docker build -t doconverter .
docker run -d -p 5000:5000 --name doconverter-container doconverter


# check readme.md if the public url not working