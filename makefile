
ifndef --mablung-makefile-environment-path
export --mablung-makefile-environment-path := $(patsubst %/,%,$(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
endif

ifndef mablung-makefile-path
export mablung-makefile-path := $(patsubst %/,%,$(dir node_modules/@virtualpatterns/mablung-makefile/makefile))
endif

include $(--mablung-makefile-environment-path)/include/common
include $(--mablung-makefile-environment-path)/include/build
include $(mablung-makefile-path)/include/clean

ifeq ($(project-name),mablung-makefile-environment)

ifneq ($(is-building),true)
ifneq ($(is-cleaning),true)

pre-build::
	$(info - pre-build ----------------------------)
	@npx shx cp -u node_modules/@virtualpatterns/mablung-makefile/source/test/library/create-random-id.js source/esmodule/test/library
	@npx shx cp -u node_modules/@virtualpatterns/mablung-makefile/source/test/library/path-compare.js source/esmodule/test/library

endif
endif

endif
