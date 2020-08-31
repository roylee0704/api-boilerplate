IMAGE=gobike/api-time-table
VERSION=latest
AWS_DEFAULT_REGION 	:= ap-southeast-1
AWS_ACCOUNT_ID 		:= 439299810195
AWS_ECR_REPO 		:= $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_DEFAULT_REGION).amazonaws.com/$(IMAGE)

ifndef AWS_PROFILE
	AWS_PROFILE=gobike
endif

new-module:
	@[ "${name}" ] || ( echo "name is not set, eg: make new-module name=module"; exit 1 )
	nest g mo $(name)
	nest g co $(name)
	nest g s $(name)

start_db:
	docker-compose -f .dev/docker-compose.db.yaml up -d

stop_db:
	docker-compose -f .dev/docker-compose.db.yaml down

clean:
	rm -rf dist

clean_db:
	rm -rf .dev/db-data

dotenv:
	cp .env.example .env

up:
	npm run start:dev

down: stop_db

bootstrap: dotenv start_db
	npm i
	npm run start:dev

docker-build: Dockerfile
	@echo $(AWS_ACCOUNT_ID)
	@echo $(AWS_ECR_REPO)
	@echo "+\n++ Performing build of Docker image $(IMAGE)...\n+"
	@docker build -t $(IMAGE) --force-rm --rm .

docker-push:
	@echo "+\n++ Logging in to Amazon ECR $(AWS_ACCOUNT_ID) ...\n+"
	@aws ecr get-login-password --region $(AWS_DEFAULT_REGION) --profile $(AWS_PROFILE) | docker login --username AWS --password-stdin $(AWS_ECR_REPO)
	@echo "+\n++ Pushing image $(IMAGE):$(VERSION) to AWS ECR...\n+"
	@docker tag $(IMAGE):$(VERSION) $(AWS_ECR_REPO):$(VERSION)
	@docker push $(AWS_ECR_REPO):$(VERSION)

docker: docker-build docker-push

pbcopy-env:
	@tr "\n" "," < .env | pbcopy

deploy-stg:
	helm secrets upgrade -i -f deploy/values.stg.yaml -f deploy/secrets.stg.yaml --namespace stg --force api-core-stg deploy/ --set "global.env=stg" --set "image.tag=latest"

restart-stg:
	kubectl rollout restart deployment/api-core-stg -n stg

build-prod: AWS_ACCOUNT_ID=439299810195
build-prod: AWS_ECR_REPO=439299810195.dkr.ecr.$(AWS_DEFAULT_REGION).amazonaws.com/$(IMAGE)
build-prod: docker

deploy-prod:
	helm secrets upgrade -i -f deploy/values.prod.yaml -f deploy/secrets.prod.yaml --namespace prod --force api-core-prod deploy/ --set "global.env=prod" --set "image.tag=latest";

restart-prod:
	kubectl rollout restart deployment/api-core-prod -n prod

migrate:
	npm run migration:generate your-migration-name

start:
	npm run start:dev
