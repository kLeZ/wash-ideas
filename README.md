# Wash Ideas

This repository acts as the project repository AND the fully working instance of this piece of software (data comprised).

## See it in action

To see the main instance working you can simply follow this link: [Stable Instance](https://klez.github.io/wash-ideas).  
Enjoy!

## Repository structure

This repository is organized in at least 3 branches:

| Branch          | Purpose                                                                                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **master**      | this branch is the main branch of the repository. It not only contains the sources, but it is in fact the _host_ of the Stable Instance. Keep this branch tidy and fully functional or the site will no longer work! |
| **beta**        | this branch is the testing preview of the _next_ version of the Instance. When the beta phase ends, this code can be promoted to the master branch.                                                                  |
| **development** | this is the dev branch, where things happen, and where all the codez and bugz are pushed with disorder and chaos. It will never be directly released and should be the default branch for the project developers!    |

Other branches could occasionally be used to sync partial work and to work on single features, as Git Flow teaches us.

## Development Guide

If you are a developer and you want to contribute to the code, you need to know some small things that are prerequisites to knowing what you are doing during the development.

### Toolchain

The chosen toolchain is based on the npm executable, so you'll likely be using that command whenever you need to do "dev" things.  
Supported commands are (executed through `npm run <cmd>`):


| Command   | Description                                                                                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **clean** | this is done by the node library rimraf, a nodejs implementation of the rm -rf unix command (we know that this is only for windows lovers, that we are not)                                                           |
| **lint**  | linting is brought to us by the standard tool tslint                                                                                                                                                                  |
| **test**  | we love tests. Having them as unit tests or interface tests or whatever, tests and coverage are the most important part for us to have in our project                                                                 |
| **build** | building is done by the de facto standard tool webpack, that keeps track of all the typescript and sass magic transpiling them all in single js and css files in the _dist_ folder (as all serious project should do) |
| **start** | this command brings to us a simple http web server for rapid development, something useful that already comes with the nodejs package, without the need to install other obscure pieces of software                   |

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
