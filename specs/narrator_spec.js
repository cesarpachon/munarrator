describe("narrator", function(){
'use strict';

  it("should link action with stage when execute is called", function(){
    MuNarrator.clear();
    var counter = 0;
    MuNarrator.addAction("action1",
                         MuNarrator.Microaction.newSingleStep("action1",
                          function(){
                            counter++;
                          }));


    var stage1 = function(msg_type, params){
      if(msg_type === "enter"){
        MuNarrator.execute("action1");
      }
    };

    MuNarrator.addStage("stage1", stage1);

    MuNarrator.setActiveStage("stage1");

    MuNarrator.update();
    expect(counter).toBe(0);

    MuNarrator.update();
    expect(counter).toBe(1);
  });

});
