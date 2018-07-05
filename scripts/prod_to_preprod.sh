#!/bin/bash
BASE_PATH=$(dirname $0)
DUMP_FOLDER=./dumps
$BASE_PATH/dump.sh $DUMP_FOLDER
echo $DUMP_FOLDER
DUMP_PATH=$(ls -d -t $DUMP_FOLDER/*/ | head -1)
$BASE_PATH/restore.sh ${DUMP_PATH}*
