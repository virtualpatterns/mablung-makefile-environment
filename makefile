
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
	$(if $(is-verbose),@echo copy .... )
	@npx shx cp -R node_modules/@virtualpatterns/mablung-makefile/source/test/index.js source/esmodule/test
	@npx shx cp -R node_modules/@virtualpatterns/mablung-makefile/source/test/library source/esmodule/test
	@$(MAKE) --no-print-directory commit message=post-pre-build include-commit-item="..."

pre-clean::
	$(info - pre-clean ----------------------------)
	$(if $(is-verbose),@echo delete .... )
	@npx shx rm -Rf source/esmodule/test/index.js
	@npx shx rm -Rf source/esmodule/test/library

endif
endif

endif
