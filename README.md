# EddieBotGitOps

The purpose of this repository is to show how you can take a plain NodeJS application, package it up as a docker container and deploy it to a local Kubernetes cluster using GitOps.

## Prerequisites 

The following software needs to be installed prior to using the repository.

- [docker](https://www.docker.com/)
- [docker hub account](https://hub.docker.com/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [kustomize](https://github.com/kubernetes-sigs/kustomize) (it is important you are using the upstream binary and not the one packaged with kubectl).
- [k3d](https://github.com/rancher/k3d)
- [fluxctl](https://github.com/fluxcd/flux)
- [helm](https://github.com/helm/helm) (its important you are using Helm v3 and not Helm v2)
 
 ## Sample application
 
 The application we will be using for this example is a simple NodeJS application that prints environment variables in a table.
 
 The `src` directory contains the application we will be using for the demo.
 
 ## Workflow
 
 The repository will be used to show the following steps:
 
 1. Building a docker image using a Dockerfile.
 1. Pushing that image to a container image registry.
 1. Setting up a local Kubernetes cluster.
 1. Deploying [flux](https://github.com/fluxcd/flux) onto the kubernetes cluster ready to reconcile our repository.
 1. Constructing the resources required to deploy our NodeJS application to Kubernetes.
 1. Showing the initial sync of workloads into the cluster.
 1. Building and pushing a new image tag to our container image registry.
 1. Re-configuring our Kubernetes resources to force flux to deploy the latest images automatically.
 
 ## Documentation
 
 The following supporting documents have been added:
 
1. [What is GitOps?](docs/what-is-gitops.md)
2. [How does this repo work?]()
 
## Authors

* **Steve Wade** - *Initial work* - [@swade1987](https://github.com/swade1987)
* **Eddie Jaoude** - *Initial work* - [@eddiejaoude](https://github.com/eddiejaoude)
 
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.