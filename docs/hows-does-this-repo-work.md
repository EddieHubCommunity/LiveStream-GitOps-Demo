# How does this repo work?

In order to apply a GitOps pipeline model to Kubernetes you need three things:

* A Git repository with your workloads definitions in YAML format, Helm charts and any other Kubernetes custom resource that defines your cluster desired state (I will refer to this as the *config* repository).

* A container registry where your CI system pushes immutable images (no *latest* tags, use *semantic versioning* or git *commit sha*).

* An operator that runs in your cluster and does a two-way synchronization:
    * watches the registry for new image releases and based on deployment policies updates the workload definitions with the new image tag and commits the changes to the config repository
    * watches for changes in the config repository and applies them to your cluster

We are using GitHub to host the config repo, Docker Hub as our container registry and Weave Flux OSS as the GitOps Kubernetes Operator.

The Flux Helm operator provides an extension to Weave Flux that automates Helm Chart releases for it. A Chart release is described through a Kubernetes custom resource named HelmRelease. The Flux daemon synchronizes these resources from git to the cluster, and the Flux Helm operator makes sure Helm charts are released as specified in the resources.

The way this works can be seen below:

![Flux GitOps Example](../img/flux-helm-gitops.png?raw=true "Flux GitOps Example")