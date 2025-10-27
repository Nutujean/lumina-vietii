#!/bin/bash
echo "⚙️  Custom pre-install hook: replacing npm ci with npm install"
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

