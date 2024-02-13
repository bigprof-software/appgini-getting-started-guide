# About this repository

This repository contains the HTML and images used for the [AppGini getting started guide](https://bigprof.com/getting-started-with-appgini).

The guide supports efficient versioning so that for example the guide for AppGini 24.11 is a symlink to the guide for AppGini 24.10, and only the changed files are actually stored in the `/24.11` directory.

The guide also supports `/latest` symlink to the latest version of the guide.

# How to deploy

The guide is deployed to the [bigprof.com](https://bigprof.com) website using the following steps:

1. Clone this repository tothe deployment server if it's not already there.
2. Copy the `post-merge` hook inside `.git/hooks` directory to automatically deploy the guide to the website whenever a new version is merged to the repository.
3. Edit the copied `post-merge` hook to set the correct path and owner for the website files.
4. Make sure the `post-merge` hook is executable by running:
   ```bash
   chmod +x .git/hooks/post-merge
   ```

Now whenever a new version is merged to the repository on the deployment server, either via `git pull` or by being pushed, the guide will be automatically deployed to the website.

# Creating a new version of the guide

To create a new version of the guide, follow these steps:

1. Run:
   ```bash
   ./new-version <previous-version> <new-version>
   ```
   where `<previous-version>` is the previous version of the guide and `<new-version>` is the new version of the guide.
   For example, to create a new version 24.11 of the guide, run:
   ```bash
   ./new-version 24.10 24.11
   ```
2. To update a file in the new version:
   ```bash
   cd html/<new-version> # for example, cd html/24.11
   ../../resolve-link <filename> # for example, ../../resolve-link page2.html
   code <filename> # edit the file
   ```
3. After editing all files to be updated, commit and push the changes.

If you're pushing the changes to the repository on the deployment server, the guide will be automatically deployed to the website.
Otheriwse, you'll need to log in to the deployment server and cd to the repository directory and run `git pull` to deploy the guide to the website
(assuming you've set up the `post-merge` hook as described in the "How to deploy" section above).