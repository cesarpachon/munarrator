(function(MuNarrator){
"use strict";
  /**
  base class for all microactions
  */
  MuNarrator.Microaction = function(){
    this.status = "started"; //running, finished

  };


  MuNarrator.Microaction.isDone = function{
    return this.status === "finished";
  };

})(MuNarrator);

