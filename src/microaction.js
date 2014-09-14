(function(MuNarrator){
"use strict";
  /**
  * base class for all microactions
  * @param {string} name
  * @param {function} startcb start callback. signature: function()
  * @param {function} updatecb update callback. signature: function(elapsedtime): bool
  * @param {function} donecb done callback. signature: function()
  * @constructor
  */
  MuNarrator.Microaction = function(name, startcb, updatecb, donecb){
    this.startcb = startcb;
    this.updatecb = updatecb;
    this.donecb = donecb;
    this.reset();
  };


  MuNarrator.Microaction.prototype.isDone = function(){
    return this.status === "finished";
  };

  MuNarrator.Microaction.prototype.update = function(){
    if(this.status === "started"){
      this.startcb();
      this.status = "running";
    }else if(this.status === "running"){
      if(this.updatecb()){
        this.status = "finished";
        this.donecb();
      }
    }
  };

  MuNarrator.Microaction.prototype.reset = function(){
    this.status = "started"; //running, finished
  };

})(MuNarrator);

