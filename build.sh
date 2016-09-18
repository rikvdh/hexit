#!/bin/bash

set -e

mkdir -p out
composer update
./bin/genry generate

cp index.html out/index.html
cp -r assets out/assets
cp manifest.json out/manifest.json
