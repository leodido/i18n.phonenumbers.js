.PHONY: minor major patch release all

release:
	npm run release
	npm run release-eu-extended

all: release
	npm run release-eurozone19
	npm run release-schengen26
	npm run release-eu28
	npm run release-efta
	npm run release-eea
	npm run release-nordiccouncil
	npm run release-bsec12
	npm run release-visegradgroup
	npm run release-cefta
	npm run release-balticassembly
	npm run release-guam
	npm run release-benelux
	npm run release-eucouncil

major:
	gulp bump --level=major

minor:
	gulp bump --level=minor

patch:
	gulp bump --level=patch
