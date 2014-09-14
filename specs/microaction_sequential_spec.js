"use strict";
describe("microaction_sequential", function(){

  it("should process all the microactions", function(){

    var counter_start = 0;
    var counter_finished = 0;
    var counter_update = 0;

    var callback_start = function(){
      counter_start++;
    };

    var callback_update = function(){
      counter_update++;
      return true;
    };

    var callback_finished = function(){
      counter_finished++;
    };


    var micro = MuNarrator.Microaction.newSequential("action",
    [
    new MuNarrator.Microaction("test1", callback_start, callback_update, callback_finished),
    new MuNarrator.Microaction("test2", callback_start, callback_update, callback_finished),
    new MuNarrator.Microaction("test3", callback_start, callback_update, callback_finished)
    ]);

    expect(micro.status).toBe("idle");

    //initializes test1
    micro.update();
    expect(counter_start).toBe(1);
    expect(counter_update).toBe(0);
    expect(counter_finished).toBe(0);
    expect(micro.status).toBe("running");

    //finishes test1
    micro.update();
    expect(counter_start).toBe(1);
    expect(counter_update).toBe(1);
    expect(counter_finished).toBe(1);
    expect(micro.status).toBe("running");

    //starts test 2
    micro.update();
    expect(counter_start).toBe(2);
    expect(counter_update).toBe(1);
    expect(counter_finished).toBe(1);
    expect(micro.status).toBe("running");

    //finishes test 2
    micro.update();
    expect(counter_start).toBe(2);
    expect(counter_update).toBe(2);
    expect(counter_finished).toBe(2);
    expect(micro.status).toBe("running");

    //starts test 3
    micro.update();
    expect(counter_start).toBe(3);
    expect(counter_update).toBe(2);
    expect(counter_finished).toBe(2);
    expect(micro.status).toBe("running");

    //finishes test 3
    micro.update();
    expect(counter_start).toBe(3);
    expect(counter_update).toBe(3);
    expect(counter_finished).toBe(3);
    expect(micro.status).toBe("finished");

  });


  it("should invoke newSingle microaction just once", function(done){

  });


  it("should invoke newFixedTime microaction in the expected time", function(){
  });



});
