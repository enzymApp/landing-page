#!/bin/bash
BASE_PATH=$(dirname $0)/..
SETTINGS_PATH=$BASE_PATH/settings-production.json
MONGO_URL=$(grep -Eo '"MONGO_URL": *".*[^\\]",?' $SETTINGS_PATH | sed "s/.*: *\"\(.*\)\".*/\1/")
BACKUP_FOLDER=$BASE_PATH/dumps/backup_$(date +%Y%m%d-%H%M%S)
mongodump --uri $MONGO_URL --out $BACKUP_FOLDER
#tar -zcf $BACKUP_FOLDER.tgz $BACKUP_FOLDER
#rm -rf $BACKUP_NAME
