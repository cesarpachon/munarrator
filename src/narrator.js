"use strict";
var MuNarrator = (function(){

  var MuNarrator = {};

  //----------- PRIVATE MODULE VARIABLES ---------------

  //a map to store reusable microactions
  var _actions = {};

  //a map to store stages
  var _stages = {};

  //the active stage
  var _currstage = null;


  //------------ PUBLIC MODULE METHODS -------------------

  /**
  *
  */
  MuNarrator.update = function(){
  };

  /**
  *
  */
  MuNarrator.addAction = function(name, microaction){
    _actions[name] = microaction;
  };

  /**
  *
  */
  MuNarrator.getAction = function(name){
    return _actions[name];
  };

  /**
  * @param name {string} name of the stage
  * @param stage {function} method that receives msg calls: signature: msg_type, params
  */
  MuNarrator.addStage = function(name, stage){
    _stages[name] = stage;
  };

  MuNarrator.sendMsg = function(msg){
    if(_currstage){
      _currstage(msg);
    }
  };

  /**
  * set the active stage.
  * it also generates a flow of events as follows:
  * 1. send a 'exit' message to the old active stage, if any.
  * 2. send a 'enter' message to the new stage.
  */
  MuNarrator.setActiveStage = function(name){
    var nextstage = _stages[name];
    if(!nextstage){
      throw 'unexisting_stage';
    }
    if(_currstage){
      _currstage('exit');
    }
    _currstage = nextstage;
    _currstage('enter');
  };


  return MuNarrator;

})();


