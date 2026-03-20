.PHONY: serve build deploy clean

# Serve locally with Firebase emulator
serve:
	firebase emulators:start --only hosting

# Build (static site - no build step needed, placeholder for future use)
build:
	@echo "Static site - no build step required"
	@echo "Files ready at hosting/public/"

# Deploy to Firebase hosting
deploy:
	firebase deploy --only hosting

# Open local dev server (simple Python HTTP server as alternative)
dev:
	cd hosting/public && python3 -m http.server 8080

# Clean generated files (if any)
clean:
	@echo "Nothing to clean for static site"
