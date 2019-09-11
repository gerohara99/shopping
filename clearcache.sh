watchman watch-del-all
rm -rf node_modules && mpm install
npm start -- -- reset-cache
rm -rf /tmp/haste-map-react-native-packager-*
