include makefile

default::
	@npx shx mkdir -p $(current-release-folder)/folder $(patsubst release/esmodule/%,release/commonjs/%,$(current-release-folder))/folder
	@npx shx touch $(current-release-folder)/folder/file  $(patsubst release/esmodule/%,release/commonjs/%,$(current-release-folder))/folder/file