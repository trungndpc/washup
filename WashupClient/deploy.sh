#!/bin/sh
server=washup@103.147.186.58

rsync -auvr   ./dist/ $server:/var/www/wash-up.com/html

