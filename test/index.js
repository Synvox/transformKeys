import test from 'ava'
import transformKeys from '../src'

test('to camel', t=>t.deepEqual(transformKeys({
  AnItem: 1,
  another_item: 2,
  'some-prop': 3,
  IN_CAPS: 4
}),{
  anItem: 1,
  anotherItem: 2,
  someProp: 3,
  inCaps: 4
}))

test('to snake', t=>t.deepEqual(transformKeys({
  AnItem: 1,
  another_item: 2,
  'some-prop': 3,
  IN_CAPS: 4
}, 'snake'),{
  an_item: 1,
  another_item: 2,
  some_prop: 3,
  in_caps: 4
}))

test('to constant', t=>t.deepEqual(transformKeys({
  AnItem: 1,
  another_item: 2,
  'some-prop': 3,
  IN_CAPS: 4
}, 'constant'),{
  AN_ITEM: 1,
  ANOTHER_ITEM: 2,
  SOME_PROP: 3,
  IN_CAPS: 4
}))

test('to constant', t=>t.deepEqual(transformKeys({
  AnItem: 1,
  another_item: 2,
  'some-prop': 3,
  IN_CAPS: 4
}, 'dash'),{
  'an-item': 1,
  'another-item': 2,
  'some-prop': 3,
  'in-caps': 4
}))

test('to pascal', t=>t.deepEqual(transformKeys({
  AnItem: 1,
  another_item: 2,
  'some-prop': 3,
  IN_CAPS: 4
}, 'pascal'),{
  AnItem: 1,
  AnotherItem: 2,
  SomeProp: 3,
  InCaps: 4
}))

test('with array', t=>t.deepEqual(transformKeys([
  {Ind: 0},
  {Ind: 1},
  {Ind: 2}
]),[
  {ind: 0},
  {ind: 1},
  {ind: 2}
]))

test('with nested array', t=>t.deepEqual(transformKeys({
  Arr: [
    {Ind: 0},
    {Ind: 1},
    {Ind: 2}
  ]
}),{
  arr: [
    {ind: 0},
    {ind: 1},
    {ind: 2}
  ]
}))
