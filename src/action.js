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
