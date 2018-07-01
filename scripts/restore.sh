#!/bin/bash
MONGO_URL=$(grep -Eo '"MONGO_URL": ".*?[^\\]",?' settings-preprod.json | sed "s/.*: \"\(.*\)\".*/\1/")
DB_NAME=$(echo $MONGO_URL | sed "s/.*\/\(.*\)/\1/")
BACKUP_NAME=$1
mongorestore --uri $MONGO_URL -d $DB_NAME $BACKUP_NAME
