Spawned by [this slide](https://docs.google.com/presentation/d/1S7btcTnZ7yrx4JgVVOdj4weYS3EPq6nbdPiFxdBvPnU/edit#slide=id.gdaf1d311_015) of the Testacular / Karma presentation from a few weeks back - where we make some ‘sanity’ tests for our Javascript code - I figured that we should be able to automate the creation of those tests, so I’ve created this mini project to try and do just that.

The idea is that it automates the retroactive creation of Jasmine unit tests for existing Javascript code.  You load up your current HTML page, set the script loose on it and it will return a set of stub unit tests for you to use to test the Javascript on that page.  It works by (recursively) iterating though the properties of a Javascript object and inspecting it a little to write some basic tests.  You paste the source code into the developer console, and save the results out of the console into your tests folder.

It’s designed for the way I’m currently coding Javascript – an imitation class structure using modules and Objects – but hopefully it works fairly well on other formats.  To kick things off, you need to call the `freeze_ray` function with two parameters – a reference to the base object you’re testing and a string-based representation of that object eg. `freeze_ray(AT, 'AT');` after that point, it goes recursively through sub objects and properties to generate Jasmine format tests.
