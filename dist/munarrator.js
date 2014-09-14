"use strict";
var MuNarrator = (function(){

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
    this.microactions = [];
    this.currmicroactionid = -1;
  };


  MuNarrator.Action.prototype.add = function(microaction){
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
  * basic constructor for all microactions. there are some Microaction.newXXX methods
  * to facilitate specific cases.
  * @param {string} name
  * @param {function} startcb start callback. signature: function()
  * @param {function} updatecb update callback. signature: function(elapsedtime): bool. must return true if finished.
  * @param {function} donecb done callback. signature: function()
  * @constructor
  */
  MuNarrator.Microaction = function(name, startcb, updatecb, donecb){
    this.startcb = startcb;
    this.updatecb = updatecb;
    this.donecb = donecb;
    this.reset();
  };

  /**
  * factory method to create a single step microaction.
  * @param {string} name
  * @param updatecb {function} empty callback to trigger single behaviour
  * @return {object} microaction
  */
  MuNarrator.Microaction.newSingleStep = function(name, updatecb){
    return new MuNarrator.Microaction(name,
                                      null,
                                      updatecb,
                                      null);
  };


  /**
  * factory method to create a fixed time  microaction.
  * the endcb callback will be invoked after passed 'duration' miliseconds
  * @param duration {long} milliseconds
  */
  MuNarrator.Microaction.newFixedTime = function(name, duration, startcb, endcb){
    var _t = null;
    return new MuNarrator.Microaction(name,
                                      function(){
                                        _t = Date.now();
                                        startcb();
                                      },
                                      function(){
                                        return (Date.now() - _t) >= duration;
                                      },
                                      endcb);
  };



  MuNarrator.Microaction.prototype.isDone = function(){
    return this.status === "finished";
  };

  MuNarrator.Microaction.prototype.update = function(){
    if(this.status === "idle"){
      if(this.startcb) this.startcb();
      this.status = "running";
    }else if(this.status === "running"){
      if(this.updatecb()){
        this.status = "finished";
        if(this.donecb) this.donecb();
      }
    }
  };

  MuNarrator.Microaction.prototype.reset = function(){
    this.status = "idle"; //running, finished
  };

})(MuNarrator);

