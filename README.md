munarrator
==========

a javascript library to assemble actions with time and event responsiveness.


A Narrator is an Object that may be integrated with the render loop of a game or interactive application.

the narrator is a simple Finite State Machine (FSM), the states are called "stages".


It also has microactions that can be assembled (composed) to achieve different behaviours


Microactions are building blocks for behaviours. examples of microactions:
- wait 10 seconds.
- play a sound
- move character to a given position

some microactions may be executed in a single call or would need many seconds to finish.

Microactions may be composed using Parallel and Sequential microactions.

a top-level action can be assembled for reusing. by example:

ActionWelcome:
0. execute secuential:
  1. wait 1 second
  2. show welcome message
  3. execute concurrent:
    4. play welcome sound
    5. execute animation "salute" on main character
  6. show instructions screen

Only a Stage may be active at any given time.
it is ok to have a single stage.

examples of stages:
WelcomeStage
FirstTrialStage
SuccessStage
FailureStage

Events sent to the Narrator are delegated to the active Stage.
Update calls sent to the Narrator are delegated to the active stage.
The active stage decides in each update call what to do: execute some microaction or send a event to the narrator in order to change the active stage.



