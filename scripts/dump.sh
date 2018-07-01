#!/bin/bash
MONGO_URI=$(grep -Eo '"MONGO_URL": ".*?[^\\]",?' settings-production.json | sed "s/.*: \"\(.*\)\".*/\1/")
cd $1
BACKUP_FOLDER=./backup_$(date +%Y%m%d-%H%M%S)
mongodump --uri $MONGO_URI --out $BACKUP_FOLDER
tar -zcf $BACKUP_FOLDER.tgz $BACKUP_FOLDER
#rm -rf $BACKUP_NAME
cd $PWD
