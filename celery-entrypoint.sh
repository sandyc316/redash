#!/bin/bash
set -e

WORKERS_COUNT=${WORKERS_COUNT:-1}
QUEUES=${QUEUES:-celery}

echo "Starting scheduler and $WORKERS_COUNT workers for queues: $QUEUES..."

exec /usr/local/bin/celery worker --app=redash.worker --beat -c$WORKERS_COUNT -Q$QUEUES -linfo --maxtasksperchild=10 -Ofair