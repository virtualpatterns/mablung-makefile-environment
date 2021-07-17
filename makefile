
ifeq ($(origin project-path),undefined)
export project-path := $(CURDIR)
export project-name := $(notdir $(project-path))
endif

ifeq ($(origin --mablung-makefile-environment-path),undefined)
export --mablung-makefile-environment-path := $(patsubst %/,%,$(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
# $(info --mablung-makefile-environment-path := $(--mablung-makefile-environment-path))
export --mablung-makefile-environment-name := $(shell node -p "require('$(--mablung-makefile-environment-path)/package.json').name")
# $(info --mablung-makefile-environment-name := $(--mablung-makefile-environment-name))
export --mablung-makefile-environment-version := $(shell node -p "require('$(--mablung-makefile-environment-path)/package.json').version")
# $(info --mablung-makefile-environment-version := $(--mablung-makefile-environment-version))
endif

ifeq ($(origin mablung-makefile-path),undefined)
export mablung-makefile-path := $(patsubst %/,%,$(dir $(shell npx mablung-makefile get-path)))
endif

include $(mablung-makefile-path)/include/common
include $(mablung-makefile-path)/include/update
include $(mablung-makefile-path)/include/commit

ifeq ($(CURDIR),$(project-path))
include $(mablung-makefile-path)/include/build
else
include $(--mablung-makefile-environment-path)/include/build
endif

include $(mablung-makefile-path)/include/debug

.PHONY: version

version::
	@npx shx echo $(--mablung-makefile-environment-name) $(--mablung-makefile-environment-version)

.DEFAULT_GOAL := version
