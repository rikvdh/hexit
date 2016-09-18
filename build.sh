#!/bin/bash

set -e

mkdir -p out

composer update
./bin/genry generate

cp -r assets out/assets
cp manifest.json out/manifest.json
