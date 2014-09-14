munarrator
==========

a javascript library to assemble actions with time and event responsiveness.


A Narrator is an Object that may be integrated with the render loop of a game or interactive application. 

It has microactions assembled into different high-level actions, and stages that are similar to states. 


Microactions are building blocks for behaviours. examples of microactions: 
- wait 10 seconds.
- play a sound
- move character to a given position

some microactions may block or not block. 

Actions are lists of microactions assembled for reusing. by example: 

ActionWelcome:
  1. wait 1 second
  2. show welcome message
  3. play welcome sound
  4. execute animation "salute" on main character
  

It has a set of Stages, and only a Stage may be active at any given time. 
it is ok to have a single stage. 

examples of stages:
WelcomeStage
FirstTrialStage
SuccessStage
FailureStage

Events sent to the Narrator are delegated to the active Stage. 


