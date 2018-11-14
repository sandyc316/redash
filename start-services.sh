#!/bin/bash

docker-compose -f docker-compose.yml up -d postgres redis

# Wait 10 seconds to allow postgres and rabbit to start
# sleep 5

# docker-compose -f docker-compose.yml run --entrypoint= '/app/create-all-tables.sh' --rm server

docker-compose -f docker-compose.yml up server #worker

