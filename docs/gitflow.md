# GitFlow

## Introduction

In order to keep our code fairly neat and tidy we should have some sort of a *gitFlow*. For any more information besides the basis that I'll detail here, have a look at these: 
 - [git flow quick and simple](https://medium.com/@muneebsajjad/git-flow-explained-quick-and-simple-7a753313572f)
 - [git flow for beginners](https://medium.com/@thibault60000/git-flow-for-beginners-d7a152b2c1f9)
 - [git flow for a successful branching model](https://medium.com/@thibault60000/git-flow-for-beginners-d7a152b2c1f9)

## Our flow model

### Naming

We're going to follow a few simple branching rules, don't worry I'll explain what I mean by branches in a minute.

Each branch name should look something like this:

`<frontend or backend>-<Issue\/ticket number>-<brief description of the ticket>`

For example: `frontend-1-setup-react`

This way, at a glace we can tell that the code committed in that branch is on the frontend, is tied to issue one and more or less should only have to do with setting up the react app and nothing more. 

### Flow steps

- Create a ticket based on the issue thats being worked on
- Create a new branch off of dev named using the format above
- Work on that feature in that branch, committing the code to it
- When you're finished (or think you're finished) merge dev into your branch
- Resolve any merge conflicts
- Create a pull request into dev
- Success! 🔥


## Commands we need to know

There's a few commands that are important to know when doing any kind of branching or flow model. Don't worry too much if they don't make a lot of sense yet, practice will make them second nature.

Once you're in the right directory, the following commands are more or less what you need:

### List the current branches

`git branch -a`

This will list all the branches in the current repo, making it easy to see which one you might want to switch to.

### Changing the your current branch

`git checkout <branch Name>`

This command will switch your branch to a new branch that you name. Its probably a good idea to do `git pull` after switching branches to make sure you have the most up to date version of the code on that branch. 

### Making a new branch

**IMPORTANT** Only ever run this command from the `dev` branch. So make sure that before you make a new branch, that you're in the `dev` branch (e.g have run `git checkout dev`)

`git branch <branch name>`

This command will make a new branch on your local machine. When you make some changes on this branch and commit them, you may find that on a push you'll get an error. The error you get will also include a suggested command, something along the lines of `git push --remote origin ...` or something like that. Just run that command and you should be okay. 

### Merging a branch

`git merge <branch name>`

This will *merge* together the code between two branches. You should only ever really have to run `git merge dev` to merge the dev branch into whatever branch you're working on at the moment.

## Pull requests

When you finish working on a feature, the last thing to do is to make a pull request. This is basically a way of saying "I'm done, here's my code, please put it into production". These we create on github itself. The following steps should cover the basics.

- On the repository on github, click the "New pull request" button at the top, under the line that tells us the number of commits on the repo.
- On the "compare" dropdown, change it to the branch you want to pull in (Most likely the branch you were working on)
- On the "base" dropdown, change it to dev
- Type a brief description of what was done and what will be added.
- Assign Either Matthew, Milu or Johnny as the reviewer and yourself as the Assignee.
- Wait until it gets reviewed and merged! 🐱‍🏍

## Jargon and keywords

- branch: 
    - A separate copy of the main code that helps keep new changes separate until they're ready for prime time.
- merge: 
    - Basically copy and pasting code from one branch to another so that they can begin to work together.
- merge-conflict: 
    - What happens when you try to merge two pieces of code that clash with each other i.e are trying to occupy the same line in a file.
- repo:
    - The repository that stores all the code. Basically like google drive but with more handy features for keeping track of everything code related.