
ifndef --mablung-makefile-environment-path
export --mablung-makefile-environment-path := $(patsubst %/,%,$(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
endif

ifndef mablung-makefile-path
export mablung-makefile-path := $(patsubst %/,%,$(dir $(shell npx mablung-makefile get-path)))
endif

include $(mablung-makefile-path)/include/common
include $(mablung-makefile-path)/include/update
include $(mablung-makefile-path)/include/commit
include $(--mablung-makefile-environment-path)/include/build
include $(mablung-makefile-path)/include/debug

.DEFAULT_GOAL := build
