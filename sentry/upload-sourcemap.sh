#!/bin/bash 

CURRENT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
BUNDLE_DIR="bundles"

mkdir -p $CURRENT_DIR/${BUNDLE_DIR}

SENTRY_PROJECT="litentry-mobile-app"
SENTRY_ORG="litentry-technologies-gmbh"
ANDROID_BUNDLE="index.android.bundle";
IOS_BUNDLE="main.jsbundle"


# -androidVersion=1.0 -androidDist=2 -iosVersion=0.1.0 -iosDist=1 -authToken=12345
while echo $1 | grep ^- > /dev/null; do declare $( echo $1 | sed 's/-//g' | sed 's/=.*//g' | tr -d '\012')=$( echo $1 | sed 's/.*=//g' | tr -d '\012'); shift; done


# Android bundle and upload
npx react-native bundle \
--dev false \
--platform android \
--entry-file ./index.js \
--bundle-output ${CURRENT_DIR}/${BUNDLE_DIR}/${ANDROID_BUNDLE} \
--sourcemap-output ${CURRENT_DIR}/${BUNDLE_DIR}/${ANDROID_BUNDLE}.map

node_modules/@sentry/cli/bin/sentry-cli --auth-token=$authToken releases \
--org ${SENTRY_ORG} \
--project ${SENTRY_PROJECT} \
files com.litentry.governance@${androidVersion}+${androidDist} \
upload-sourcemaps \
--dist ${androidDist} \
--strip-prefix ${CURRENT_DIR} \
--rewrite ${CURRENT_DIR}/${BUNDLE_DIR}/${ANDROID_BUNDLE} ${CURRENT_DIR}/${BUNDLE_DIR}/${ANDROID_BUNDLE}.map


# iOS bundle and upload
npx react-native bundle \
--dev false \
--platform ios \
--entry-file ./index.js \
--bundle-output ${CURRENT_DIR}/${BUNDLE_DIR}/${IOS_BUNDLE} \
--sourcemap-output ${CURRENT_DIR}/${BUNDLE_DIR}/${IOS_BUNDLE}.map

node_modules/@sentry/cli/bin/sentry-cli --auth-token=$authToken releases \
--org ${SENTRY_ORG} \
--project ${SENTRY_PROJECT} \
files com.litentry.governance@${iosVersion}+${iosDist} \
upload-sourcemaps \
--dist ${iosDist} \
--strip-prefix ${CURRENT_DIR} \
--rewrite ${CURRENT_DIR}/${BUNDLE_DIR}/${IOS_BUNDLE} ${CURRENT_DIR}/${BUNDLE_DIR}/${IOS_BUNDLE}.map