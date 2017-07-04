{
  let a, b, c;
  [a, b] = [1, 2];
  console.log(a, b);
}

{
  let a, b, rest;
  [a, b, ...rest] = [1, 2, 3, 4, 5];
  console.log(a, b, rest);
}

{
  let a, b;
  ({
    a,
    b
  } = {
    a: 1,
    b: 2
  });
  console.log(a, b);
}

{
  function fun() {
    return [1, 2, 3, 4, 5];
  }
  let a, b, c;
  [a, , ...b] = fun();
  console.log(a, b, c);
}

{
  let obj = {
    title: 'aaa',
    test: [{
      a: 1,
      b: 2
    }]
  };
  let {
    title: tt1,
    test: [{
      a: tt2
    }]
  } = obj;
  console.log(tt1, tt2);
}