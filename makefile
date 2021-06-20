
ifeq ($(origin projectPath),undefined)
export projectPath := $(CURDIR)
endif

.PHONY: refresh upgrade clean run test pre-release release build build-all build-folder copy-folder ignore-folder debug debug-all pre-debug-all debug-folder pre-debug-folder

ifeq ($(origin mablungMakefileEnvironmentPath),undefined)
export mablungMakefileEnvironmentPath := $(patsubst %/,%,$(dir $(lastword $(realpath $(MAKEFILE_LIST)))))
endif

include $(mablungMakefileEnvironmentPath)/include/common
include $(mablungMakefileEnvironmentPath)/include/build/common
include $(mablungMakefileEnvironmentPath)/include/build/build
include $(mablungMakefileEnvironmentPath)/include/build/debug

.DEFAULT_GOAL := build
