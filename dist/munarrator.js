var MuNarrator = (function(){
  "using strict";

  var MuNarrator = {};


  /**
  * Narrator: top level class
  * @class
  */
  MuNarrator.Narrator = function(){
  };

  MuNarrator.Narrator.prototype.start = function(){
  };

  MuNarrator.Narrator.prototype.update = function(dt){
  };

  return MuNarrator;

})();


(function(MuNarrator){
"use strict";
  /**
  * @param {string} name
  * @constructor
  */
  MuNarrator.Action = function(name){
    this.running = false;
    this.startcb = startcb;
    this.updatecb = updatecb;
    this.donecb = donecb;
    this.microactions = [];
    this.currmicroactionid = -1;
  };


  MuNarrator.Action.prototype.addMicroaction = function(microaction){
    this.microactions.push(microaction);
  };


  MuNarrator.Action.prototype.start = function(){
    this.running = true;
    this.currmicroactionid = 0;

  };


  MuNarrator.Action.prototype.update = function(){
    if(!this.running) return;
    var micro = this.microactions[this.currmicroactionid];
    micro.update();
    if(micro.isDone()){
      this.currmicroactionid++;
      if(this.currmicroactionid >= this.microactions.length){
        this.running = false;
        //reset all the microactions so we are ready to execute the action again.
        this.microactions.forEach(function(microaction){
          microaction.reset();
        });
      }
    }
  };

})(MuNarrator);
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
    if(this.status === "idle"){
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
    this.status = "idle"; //running, finished
  };

})(MuNarrator);

