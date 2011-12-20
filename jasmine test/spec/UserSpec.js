describe("User", function() {
  var user;

  beforeEach(function() {
    user = new User();
  });

  it("should be alive", function() {    
    expect(user.isAlive()).toBeTruthy();
    
  });

  it("should not be dead", function() {
    expect(user.isDead()).toBeFalsy();
  });

  it("should not be defined", function() {
    expect(user.noMethod).not.toBeDefined();
  });

  it ("should match", function() {
    expect(/abc/).toMatch("abc");
  });
});