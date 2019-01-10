echo "deleting node modules"
rm -rf node_modules
echo "re building node modules"
npm install
echo "re linking"
react-native link
echo "clearing npm cache"
npm clear-cache --force
echo "running ios build"
react-native run-ios
