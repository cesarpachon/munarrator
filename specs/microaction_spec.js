"use strict";
describe("microaction", function(){

  it("should call all the callbacks", function(){

    var counter = 0;

    var callback = function(){
      counter++;
      return true;
    };

    var micro = new MuNarrator.Microaction("test", callback, callback, callback);

    expect(micro.status).toBe("idle");

    micro.update();
    expect(counter).toBe(1);
    expect(micro.status).toBe("running");

    micro.update();
    expect(counter).toBe(3);
    expect(micro.status).toBe("finished");

    micro.reset();
    expect(micro.status).toBe("idle")

  });

});
