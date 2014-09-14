"use strict";
describe("action", function(){

  it("should process all the microactions", function(){

    var counter = 0;

    var callback = function(){
      counter++;
      return true;
    };

    var action = new MuNarrator.Action("action");

    action.add(new MuNarrator.Microaction("test1", callback, callback, callback));
    action.add(new MuNarrator.Microaction("test2", callback, callback, callback));
    action.add(new MuNarrator.Microaction("test3", callback, callback, callback));

    expect(action.running).toBe(false);

    action.start();

    expect(action.running).toBe(true);
    expect(action.currmicroactionid).toBe(0);

    action.update();
    action.update();

    expect(action.running).toBe(true);
    expect(action.currmicroactionid).toBe(1);

    action.update();
    action.update();

    expect(action.running).toBe(true);
    expect(action.currmicroactionid).toBe(2);

    action.update();
    action.update();

    expect(action.running).toBe(false);

  });


  it("should invoke newSingle microaction just once", function(done){
    var action = new MuNarrator.Action("action");
    action.add(MuNarrator.newSingleStep("test1", done));
    action.update();
    action.update();
  });


  it("should invoke newFixedTime microaction in the expected time", function(){
  });



});
