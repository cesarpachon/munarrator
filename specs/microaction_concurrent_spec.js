"use strict";
describe("microaction_concurrent", function(){

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


    var micro = MuNarrator.Microaction.newConcurrent("action",
    [
    new MuNarrator.Microaction("test1", callback_start, callback_update, callback_finished),
    new MuNarrator.Microaction("test2", callback_start, callback_update, callback_finished),
    new MuNarrator.Microaction("test3", callback_start, callback_update, callback_finished)
    ]);

    expect(micro.status).toBe("idle");

    //initializes all the tests
    micro.update();
    expect(counter_start).toBe(3);
    expect(counter_update).toBe(0);
    expect(counter_finished).toBe(0);
    expect(micro.status).toBe("running");

    //finishes all the tests
    micro.update();
    expect(counter_start).toBe(3);
    expect(counter_update).toBe(3);
    expect(counter_finished).toBe(3);
    expect(micro.status).toBe("finished");

  });



});
