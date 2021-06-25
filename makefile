
mablung-makefile-environment-path := $(patsubst %/,%,$(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
# $(info mablung-makefile-environment-path := $(mablung-makefile-environment-path))

ifeq ($(origin projectPath),undefined)
export projectPath := $(CURDIR)
endif

include $(mablung-makefile-environment-path)/include/common
include $(mablung-makefile-environment-path)/include/build/common
include $(mablung-makefile-environment-path)/include/build/build
include $(mablung-makefile-environment-path)/include/build/debug

.DEFAULT_GOAL := build
