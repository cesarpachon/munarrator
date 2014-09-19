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
    if(_currstage && _currstage.action)
        if(_currstage.action.update()){
          _currstage.action = null;
        }
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
    if(_currstage && _currstage['exit']){
      _currstage['exit']();
    }
    _currstage = nextstage;
    if(_currstage && _currstage['enter']){
      _currstage['enter']();
    }
  };


  /**
  * execute the action identified by action_name in the context of the current stage.
  * if force is false, the action is executed only if there are not other action being executed in the current stage.
  * if force is true, the action will force the termination of the existing action.
  */
  MuNarrator.execute = function(action_name, force){
    if(_currstage){
      if(!_currstage.action || force){
        if(_actions[action_name]){
          _currstage.action = _actions[action_name];
          _currstage.action.reset();
        }
      }
    }
  };

  /**
  * delete all registered stages and microactions
  */
  MuNarrator.clear = function(){
     _actions = {};
     _stages = {};
     _currstage = null;
  };

  /**
  * send a message to the current stage.
  * a stage is known to accept a message if has a method named "on_XXX" where XXX is the value of the param "msg".
  * @params msg {String} name of the message.
  */
  MuNarrator.send = function(msg, args){
    if(_currstage && _currstage["on_"+msg]){
      _currstage["on_"+msg](args);
    }
  };


  return MuNarrator;

})();


