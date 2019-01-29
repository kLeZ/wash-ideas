<!---
 Copyright (C) 2018 Alessandro Accardo a.k.a. kLeZ & Fabio Scotto di Santolo a.k.a. Plague

 This file is part of Wash Ideas.

 Wash Ideas is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Wash Ideas is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Wash Ideas.  If not, see <http://www.gnu.org/licenses/>.

-->

# Wash Ideas

This project aims to be the eagle-eye of a single graph of projects and ideas, categorized and ordered by some useful weights and enriched with some details.

This repository acts as the project repository AND the fully working instance of this piece of software (data comprised).

![GitHub package version](https://img.shields.io/github/package-json/v/kLeZ/wash-ideas.svg)
[![GitHub license](https://img.shields.io/github/license/kLeZ/wash-ideas.svg)](https://github.com/kLeZ/wash-ideas/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/kLeZ/wash-ideas/graphs/commit-activity)
[![GitHub contributors](https://img.shields.io/github/contributors/kLeZ/wash-ideas.svg)](https://github.com/kLeZ/wash-ideas/graphs/contributors/)
[![GitHub issues](https://img.shields.io/github/issues/kLeZ/wash-ideas.svg)](https://GitHub.com/kLeZ/wash-ideas/issues/)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/kLeZ/wash-ideas.svg)](https://GitHub.com/kLeZ/wash-ideas/issues?q=is%3Aissue+is%3Aclosed)
[![Build Status](https://travis-ci.org/kLeZ/wash-ideas.svg?branch=master)](https://travis-ci.org/kLeZ/wash-ideas)
[![Coverage Status](https://coveralls.io/repos/github/kLeZ/wash-ideas/badge.svg?branch=master)](https://coveralls.io/github/kLeZ/wash-ideas?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## See it in action

To see the main instance working you can simply follow this link: [Stable Instance](https://klez.github.io/wash-ideas).
Enjoy!

## Repository structure

This repository is organized in at least 3 branches:

| Branch          | Purpose                                                                                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **master**      | this branch is the main branch of the repository. It not only contains the sources, but it is in fact the _host_ of the Stable Instance. Keep this branch tidy and fully functional or the site will no longer work! |
| **development** | this is the dev branch, where things happen, and where all the codez and bugz are pushed with disorder and chaos. It will never be directly released and should be the default branch for the project developers!    |

Other branches could occasionally be used to sync partial work and to work on single features, as Git Flow teaches us.

## Special files

The `dist/` folder is a special folder which contains _de facto_ the entire software (except the index.html :-P), so it should be treated as a special case in the repository structure.<br />
Mainly we want to preserve the _upstream_ version as-is until a new version can be published to the repository (either in **development** or **master** branches): to accomplish this, Git helps us with the [**_Skip Worktree_ bit**](https://www.git-scm.com/docs/git-update-index#_skip_worktree_bit). This bit can be set to prevent git from checking _pairness_ (read: checking the equality) between the working directory and the repository index.<br />
This is useful because it will not hurt us with "changed files" in the _dist_ folder when we develop, it is set even upstream that gives us the ability to "commit" the behaviour of the repository for all the developers, and it is switchable between _skip_ and _non-skip_ behaviours giving us the ability to control exactly _**when to commit the new release**_.<br />
For the command itself, please read the [manual page](https://www.git-scm.com/docs/git-update-index#git-update-index---no-skip-worktree).

### Common operations to skip/unskip dist files

To check which files are skipped you can simply fire this command:<br />
`$ git ls-files -v . | grep ^S`<br />
This is useful to list all the skipped files.<br />

Specifically for the `dist/` folder, these are the commands that can inequivocably skip and unskip all the directory structure. Unfortunately the update-index command doesn't support recursive paths and thus we need to issue more than one command in order to exclude all the files (for simplicity we can think of skipping only rapidly changing files such as *.js and *.css, leaving fonts as they are because they rarely will change).<br />
To skip all the files with extension in dist/: `$ git update-index --skip-worktree dist/*.*`<br />
To revert the previous command: `$ git update-index --no-skip-worktree dist/*.*`<br />
These commands support something like glob notation, so for the same command to exclude the subfolders (such as the dist/fonts/) we need only to specify the path `dist/**/*`.<br />
For simplicity, we have hardcoded simple aliases in `package.json` so all is needed to track/untrack `dist/` directory is: `npm run dist-skip` or `npm run dist-track`.<br />

## Development Guide

If you are a developer and you want to contribute to the code, you need to know some small things that are prerequisites to knowing what you are doing during the development.

### Getting started

Since this is a nodejs project, getting started is very similar as in other projects:

1. `git clone <this repo>`
2. `npm i`
3. DONE

### Versions of critical platform software

1. `node --version`: v8.x
2. `npm --version`: 5.x+

The rest of the software is in the `package.json` and is downloaded automatically by `npm` with the correct version.<br />
Ensure to have these two software with exactly these versions to avoid random errors with which I problably can't help too much.

### Toolchain

The chosen toolchain is based on the npm executable, so you'll likely be using that command whenever you need to do "dev" things.<br />
Supported commands are (executed through `npm run <cmd>`):<br />

| Command   | Description                                                                                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **clean** | this is done by the node library rimraf, a nodejs implementation of the rm -rf unix command (we know that this is only for windows lovers, that we are not)                                                           |
| **lint**  | linting is brought to us by the standard tool tslint                                                                                                                                                                  |
| **test**  | we love tests. Having them as unit tests or interface tests or whatever, tests and coverage are the most important part for us to have in our project                                                                 |
| **build** | building is done by the de facto standard tool webpack, that keeps track of all the typescript and sass magic transpiling them all in single js and css files in the _dist_ folder (as all serious project should do) |
| **start** | this command brings to us a simple http web server for rapid development, something useful that already comes with the nodejs package, without the need to install other obscure pieces of software                   |
| **watch** | this command watches for changes in the `src/` folder, triggering a rebuild (only the `build` part without tests and linting) on the entire sources                                                                   |

We'll never ever try to tell webpack or other tools in our toolchain to do something they're not supposed to do by the upstream developers: if we find ourselves lacking some tool (like watch or live reload), we will search the right piece for the job, instead of forcing a tool we already have to do something it cannot easily do.

A typical development cycle would be (make sure to start from the development branch):

1. `npm run clean`
2. `git checkout development`
3. `git checkout -b features/my-wonderful-feature`
4. Start typing things on your keyboard since something sane drops off of your codez.
5. `npm start`
6. Test your work
7. `git add -A && git commit -m 'my simple work just works!'`
8. `git checkout development`
9. `git merge features/my-wonderful-feature`
10. `git push origin development`

### Testing

Testing is done automagically thanks to Jest. The automatic testing command is started whenever you trigger a build for any reason.
Manual testing is done in the usual way (trial and error on the Local Instance).

### Used libraries and components

Even if the used libraries can be read from the package.json, we believe in clarity and simplicity.

Wash Ideas is being built with &hearts; through the powerful [React](https://reactjs.org/) and [Material UI](https://material-ui.com/) libraries.

### VSCode extensions (suggested)

* [TypeScript Extension Pack](https://marketplace.visualstudio.com/items?itemName=loiane.ts-extension-pack)
* [Sass](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented)
* [Node.js Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack)
* [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
* [markdownlint](https://marketplace.visualstudio.com/items?itemName=davidanson.vscode-markdownlint)
* [Markdown Shortcuts](https://marketplace.visualstudio.com/items?itemName=mdickin.markdown-shortcuts)
* [Git Extension Pack](https://marketplace.visualstudio.com/items?itemName=donjayamanne.git-extension-pack)
* [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
* [Beautify](https://marketplace.visualstudio.com/items?itemName=hookyqr.beautify)
* [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug)
* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig)
* [Licenser](https://marketplace.visualstudio.com/items?itemName=ymotongpoo.licenser)
* [Jest](https://marketplace.visualstudio.com/items?itemName=orta.vscode-jest)
* [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
* [Kanban](https://marketplace.visualstudio.com/items?itemName=mkloubert.vscode-kanban)
