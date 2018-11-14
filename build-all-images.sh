#!/bin/bash

cwd=$(pwd)

echo "----------- Building Redash image ------------------"
cd $cwd
docker build -t redash-base -f Dockerfile .
