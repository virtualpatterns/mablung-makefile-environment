
ifeq ($(origin projectPath),undefined)
export projectPath := $(CURDIR)
endif

include $(projectPath)/node_modules/@virtualpatterns/mablung-makefile/include/common
include $(projectPath)/node_modules/@virtualpatterns/mablung-makefile/include/build/common
include $(projectPath)/include/build/build
include $(projectPath)/node_modules/@virtualpatterns/mablung-makefile/include/build/debug

.DEFAULT_GOAL := build
