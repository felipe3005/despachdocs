.PHONY: serve build deploy clean deploy-functions deploy-all

# Serve locally with Firebase emulators (hosting + functions)
serve:
	firebase emulators:start --only hosting,functions

# Build (static site - no build step needed, placeholder for future use)
build:
	@echo "Static site - no build step required"
	@echo "Files ready at hosting/public/"

# Deploy only hosting
deploy:
	firebase deploy --only hosting

# Deploy only functions
deploy-functions:
	firebase deploy --only functions

# Deploy everything (hosting + functions)
deploy-all:
	firebase deploy

# Open local dev server (simple Python HTTP server as alternative)
dev:
	cd hosting/public && python3 -m http.server 8080

# Clean generated files (if any)
clean:
	@echo "Nothing to clean for static site"
