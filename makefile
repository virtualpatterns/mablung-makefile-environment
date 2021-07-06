
--mablung-makefile-environment-path := $(patsubst %/,%,$(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
# $(info --mablung-makefile-environment-path := $(--mablung-makefile-environment-path))

ifeq ($(origin project-path),undefined)
export project-path := $(CURDIR)
endif

include $(--mablung-makefile-environment-path)/include/common
include $(--mablung-makefile-environment-path)/include/update
include $(--mablung-makefile-environment-path)/include/commit
include $(--mablung-makefile-environment-path)/include/build
include $(--mablung-makefile-environment-path)/include/debug

.DEFAULT_GOAL := build
