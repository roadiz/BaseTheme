#
# Base theme
# Development tasks
#
GREEN=\033[0;32m
RED=\033[0;31m
# No Color
NC=\033[0m

# Default task install + build
all : configtest install build

# Install NPM deps and Bower deps
install : configtest static/node_modules

static/node_modules :
	cd ./static && npm install;

.PHONY : clean uninstall update build watch

# Launch Gulp watch task
watch : configtest
	cd ./static && npm run dev;
# Build prod ready assets with Gulp
build : configtest
	cd ./static && npm run build;
# Update NPM deps and Bower deps
update : configtest
	cd ./static && npm update;
	@echo "✅\t${GREEN}Updated NPM dependencies. \tOK.${NC}" >&2;
# Delete generated assets
clean :
	rm -rf ./static/build;
	rm -rf ./static/dist;
	@echo "✅\t${GREEN}Cleaned build and dist folders. \tOK.${NC}" >&2;
# Uninstall NPM and Bower deps and clean generated assets
uninstall : clean
	rm -rf ./static/node_modules;
	@echo "✅\t${GREEN}Removed NPM dependencies. \tOK.${NC}" >&2;
#
# Test if required binaries are available
#
configtest:
	@command -v npm >/dev/null 2>&1 || { echo "❌\t${RED}I require npm but it's not installed. \tAborting.${NC}" >&2; exit 1; }
	@echo "✅\t${GREEN}NPM is available. \tOK.${NC}" >&2;
