suite('Array', function(){
  setup(function(){
    // ...
  });

  suite('#indexOf()', function(){
    test('should return -1 when not present', function(){
      [1,2,3].indexOf(5).should.equal(-1);
    });
  });
});
