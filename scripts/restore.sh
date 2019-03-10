#!/bin/bash
BASE_PATH=$(dirname $0)/..
SETTINGS_PATH=$BASE_PATH/settings-preprod.json
MONGO_URL=$(grep -Eo '"MONGO_URL": *".*?[^\\]",?' $SETTINGS_PATH | sed "s/.*: *\"\(.*\)\".*/\1/")
BACKUP_FOLDER=$1
DB_NAME=$(echo $MONGO_URL | sed "s|.*\/\(.*\)?.*|\1|")
echo "mongorestore --drop --ssl -v --uri $MONGO_URL -d $DB_NAME $BACKUP_FOLDER"
mongorestore --drop --ssl -v --uri $MONGO_URL -d $DB_NAME $BACKUP_FOLDER
