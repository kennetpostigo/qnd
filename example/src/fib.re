type list 'a =
  | Nil
  | Cons 'a (list 'a);

let rec map f =>
  fun
  | Nil => Nil
  | Cons x xs [@implicit_arity] => Cons (f x [@bs]) (map f xs) [@implicit_arity];

let rec fib =
  fun
  | 1
  | 2 => 1
  | n => fib (n - 1) + fib (n - 2);

Js.log (fib 10);
