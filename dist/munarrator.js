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


  /**
  * factory method to create a sequencial execution of microactions.
  * this microaction will begin processing the array of microactions in order, and will
  * finish only when the last one in the array is finished.
  */
  MuNarrator.Microaction.newSequential = function(name, microactions){
    var current = 0;
    return new MuNarrator.Microaction(name,
      function(){
        microactions[current].update();
      },
      function(){
        microactions[current].update();
        if(microactions[current].isDone()){
          current++;
          if(current >= microactions.length){
            this.status = "finished";
            return true; //signal for termination
          }else{
            return false;
          }
        }
      },
      null
    );
  };


  /**
  * factory method to create a concurrent microaction
  * @param micros array of microactions to execute in parallel. it will finish once all of them are finished.
  */
  MuNarrator.Microaction.newConcurrent = function(name, micros){

  };


 /**
  * factory method to create a secuential microaction
  * @param micros array of microactions to execute secuentially. it will finish once the last of the are finished.
  */
  MuNarrator.Microaction.newConcurrent = function(name, micros){
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

