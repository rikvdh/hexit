#!/bin/bash

set -e

mkdir -p out

rm -f composer.lock

composer install
./bin/genry generate

cp -r assets out/assets
cp manifest.json out/manifest.json
