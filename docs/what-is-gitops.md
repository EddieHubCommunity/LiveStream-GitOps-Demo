## GitOps

### Preamble

In order to talk effectively about GitOps, it's necessary to think about Kubernetes cluster state on two levels. There is the _infrastructure state_, as defined in Terraform elsewhere and there is the _application state_ - i.e. the workloads that are running on the cluster and the associated resources needed for them to run. It is the _application state_ we're interested below.

### What

GitOps is a set of practices and tooling concerned with being able to describe the desired state of a Kubernetes cluster in config files stored in a Git repo, and then automatically reconciling the observed state of the cluster with that desired state.

### Why

Over time, applying mutations to the state of the cluster can leave you in an uncertain state overall that can be hard to restore in the case of massive failure. Equally, applying those mutations over time, say from a CI system, can also lead to indeterminate states in the case of the failure of a particular change.

Rolling back to a known-good state can be challenging in these circumstances, since the path to how we get there is often lost.

### How

CI and CD were born as distinct concepts, but at some point people started talking about CICD as if it was a single thing (it isn't!). In the CICD world, your continuous integration system is responsible not only for building, testing, and publishing artefacts, but also for deploying those artefacts utilising a "push" model, where software is rolled out by pushing new versions to different environments at the end of a successful CI run (i.e. mutating the cluster).

GitOps severs CICD back into separate processes. CI returns to being just about building, testing and publishing deployable artefacts. CD moves from "push" to "pull", where an agent running inside the cluster is responsible for polling this repository to read the desired state and then applying the changes necessary for convergence.

The agent ([Weave Flux](https://github.com/weaveworks/flux)) has read and write access, and thus is capable of not only reading the desired state from here, but also writing back changes it makes to the cluster that need to be reflected here. Therefore **this repository is the source of truth for the cluster state at any given point in time**.

### Why again

The processes described above mean a full restore of the cluster state (data excluded) is easy. They also makes things like rollbacks trivial, since it is as easy as reverting an offending commit in the Git history.

It also has other benefits such as being able to run a lighter-weight CI with significantly lower access requirements - no more God Mode credentials to be able to deploy all the things.
