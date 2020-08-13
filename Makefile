# =====================================================================================================================
# Cluster creation and Flux deployment.
# =====================================================================================================================
cluster:
	k3d cluster create --agents 2 gitops

destroy:
	k3d cluster delete gitops

install-flux:
	./scripts/flux-init.sh

# =====================================================================================================================
# Docker specific tasks
# =====================================================================================================================

APP_NAME=livestream-gitops-demo
IMG_REGISTRY=docker.io/eddiejaoude
VERSION=1.1.1
IMG_NAME=$(IMG_REGISTRY)/$(APP_NAME):$(VERSION)

build:
	docker build -t $(IMG_NAME) .

run:
	docker run -d -p 3000:3000 $(IMG_NAME)

push:
	docker push $(IMG_NAME)
	docker rmi $(IMG_NAME)

buildpush: build push

# =====================================================================================================================
# Kubernetes / Kustomize specific tasks.
# =====================================================================================================================

test-%:
	mkdir -p _test
	kustomize build kustomize/$* > _test/$*.yaml
	@echo
	@echo The output can be found at _test/$*.yaml
