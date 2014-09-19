describe("narrator", function(){
'use strict';

  var counter, stage1;

  it("should link action with stage when execute is called", function(){
    MuNarrator.clear();
    counter = 0;
    MuNarrator.addAction("action1",
                         MuNarrator.Microaction.newSingleStep("action1",
                          function(){
                            counter++;
                          }));


    stage1 = {
      enter: function(){
        MuNarrator.execute("action1");
      }
    };

    MuNarrator.addStage("stage1", stage1);

    //before initialization, there is no active action in the stage
    expect(stage1.action).toBeFalsy();

    MuNarrator.setActiveStage("stage1");

    //setting a stage as active, triggers its enter callback.
    //in this case, this triggers the assignation of the action attribute.
    expect(stage1.action).toBeTruthy();

    //the first call to update pass the microaction to running state
    MuNarrator.update();
    expect(counter).toBe(0);
    expect(stage1.action).toBeTruthy();

    //the second call finishes the action. it provokes the action to be removed from the stage
    MuNarrator.update();
    expect(counter).toBe(1);
    expect(stage1.action).toBeFalsy();
  });

  it("should sent messages to the active stage", function(){
    MuNarrator.clear();
    counter = 0;
    stage1 = {
      on_test: function(params){
        counter++;
      }
    };
    MuNarrator.addStage("stage1", stage1);
    MuNarrator.setActiveStage("stage1");
    MuNarrator.send("test");
    expect(counter).toBe(1);
  });

});
