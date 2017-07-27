<!--
# Copyright (C) 2017 Resin.io.
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Public License v1.0
# which accompanies this distribution, and is available at
# http://www.eclipse.org/legal/epl-v10.html
# 
# Contributors:
#     Resin.io - initial API and implementation
-->

agile-example
=========

> A example of how to structure an agile service

[![Build Status](https://travis-ci.org/Agile-IoT/agile-example.svg?branch=master)](https://travis-ci.org/Agile-IoT/agile-example)

This is a simple node.js service that uses [agile-sdk](https://github.com/Agile-IoT/agile-sdk) to poll for new devices and updates a realtime firebase db with the results.

The main purpose is to show the current workflow for agile developers. Which is to create a independent micro service and that has both a stable versioned release and a "nightly build" system for each PR.

What this means is that each time a new PR is created on your services repository. It will trigger two builds one for `arm` and another for `x86` architecture. For example if I created PR on the branch `my-new-feature`, after a successful build you'll see `my-new-feature` tag for both https://hub.docker.com/r/agileiot/agile-example-armv7l/ && https://hub.docker.com/r/agileiot/agile-example-x86_64/. Once that PR is merged to master we will automatically version bump it to the next appropriate version (calculated by versionist) and push another two builds this time by the tagged by the semantic version. eg `1.0.0`. It'll also tag and push the commit back to github so you have a record under [github releases](https://github.com/Agile-IoT/agile-example/releases). And a full [changle-log](https://github.com/Agile-IoT/agile-example/blob/master/CHANGELOG.md) in your repository source.

To set up that release system we use [versionist](https://github.com/resin-io/versionist) and [Travis CI](https://travis-ci.org).

* Versionist is a simple module that calculates the new version based new commits since the last known version. The commits must be written with according particular convention. In our case we require the commit to have a footer with a `Change-type` key and with a value that follows the [Semantic versioning increments](http://semver.org/) of `major`, `minor`, `patch`.

An example looks like this:
```
My new feature

Change-Type: minor
```

* Travis is a continuous integration tool to automate the building of new containers and bumping versions.

### Up and running

Once you have a `Dockerfile` that you can build and run locally and it works with `agile-stack` you should set up it's deployment. For this we need 2 files.

* A `CHANGELOG.md` - Where versionist write new versions. (Just copy the first 5 lines)
* A `.travis.yml` - tells travis how and what to build.
* A `versionist.conf.js` - tells versionist about our configuration.

In *most* cases you'll just need to copy the two files over from this repo into your own services repo. And replace the `COMPONENT` global environment variable with your own. Then add 3 secrets to your travis build.

* `GH_TOKEN` - A github [auth token](https://github.com/settings/tokens) with read/write access to the repo.
* `DOCKER_USERNAME` - dockerhub username
* `DOCKER_PASSWORD` - dockerhub password

For instructions on add environment variables consult the [travis docs](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings).

Now follow your normal git workflow and you should automatically get versioned docker builds :)

If you have any issues questions please [open an issue](https://github.com/agile-iot/agile-example/issues)

blah blah
