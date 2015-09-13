#!/bin/sh
cd ~/mytmp/16lao
#docker run --rm -it -v "$PWD:/16lao" summerwu/node:sqlite3 bash
docker run --name 16lao -it -v "$PWD:/16lao" summerwu/node:sqlite3 bash
docker run -it --rm  --name ph0 --entrypoint="/bin/bash" vidiben/phantomjs #运行phantomjs REPL
docker run -it --rm  --name cs0 --entrypoint="/bin/bash" vidiben/casperjs #运行phantomjs REPL
docker run -it --rm  --name lao0 --publish-all=true --entrypoint="/bin/bash" summerwu/yilulao #运行phantomjs REPL

docker run -d --restart="always" --name dockerui0 -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock dockerui/dockerui
#