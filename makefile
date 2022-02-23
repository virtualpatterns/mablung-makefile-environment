
ifndef --mablung-makefile-environment-path
export --mablung-makefile-environment-path := $(patsubst %/,%,$(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
endif

ifndef mablung-makefile-path
export mablung-makefile-path := $(patsubst %/,%,$(dir node_modules/@virtualpatterns/mablung-makefile/makefile))
endif

include $(--mablung-makefile-environment-path)/include/common
include $(--mablung-makefile-environment-path)/include/build
include $(mablung-makefile-path)/include/clean

# ifeq ($(project-name),mablung-makefile)

# ifneq ($(is-building),true)
# ifneq ($(is-cleaning),true)

# pre-build::
# 	$(info - pre-build ----------------------------)
# 	$(if $(is-verbose),@echo copy .... )
# 	@npx shx cp -u node_modules/@virtualpatterns/mablung-makefile/release/test/library 
# 	@$(MAKE) --no-print-directory commit message=post-pre-build include-commit-item=".eslintrc.json babel.config.json"

# endif
# endif

# endif
