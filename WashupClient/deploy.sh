#!/bin/sh
server=washup@103.147.186.58

rsync -auvr  --exclude="index.html"  ./dist/ $server:/var/www/wash-up.com/html

