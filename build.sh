#!/bin/bash

set -e

mkdir -p out

rm -f composer.lock

composer install

rm -rf out/assets
cp -r assets out/assets
./bin/genry generate

cp manifest.json out/manifest.json
