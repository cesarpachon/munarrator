describe("stage", function(){

  it("should send exit and enter events when changing stages", function(){
    var numexit = 0;
    var numenter = 0;


    var stage = function(msg, params){
      if(msg === "enter"){
        numenter++;
      }
      else if(msg === "exit"){
        numexit++;
      }
    };

    MuNarrator.addStage("stage1", stage);
    MuNarrator.addStage("stage2", stage);

    MuNarrator.setActiveStage("stage1");
    expect(numenter).toBe(1);
    expect(numexit).toBe(0);

    MuNarrator.setActiveStage("stage2");
    expect(numenter).toBe(2);
    expect(numexit).toBe(1);

  });

});
