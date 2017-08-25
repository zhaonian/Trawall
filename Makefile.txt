init-db:
	@echo Initializing postgres...
	@ sudo -u postgres psql < db/trawall.sql
run:
	cd Trawall && npm install
	cd Trawall && npm start
