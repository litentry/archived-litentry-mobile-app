#!/bin/bash

if [[ -z "$1" ]]; then
    echo "Error: This scripts requires file path of the image"
    exit 1
fi

npx react-native-image-formats $1
