all: backend frontend	

frontend: SHELL:=/bin/bash
frontend: 
	yarn --cwd frontend start

backend: SHELL:=/bin/bash
backend: 
	yarn --cwd backend start; 

.PHONY: all
.PHONY: frontend
.PHONY: backend
