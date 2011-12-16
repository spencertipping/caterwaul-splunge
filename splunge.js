// Splunge graphing library | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Splunge is a realtime graphing library that uses Raphael.js and jQuery. It provides one function, caterwaul.splunge(), that takes data of some sort and returns a graph for that data. You can
// pass in hints to indicate how the data should be displayed. Splunge ties into the Caterwaul invariant framework by providing two nodes per graph. One node determines the graph's data and the
// other determines the view state. Each can be updated at any point. The graph's value node will never emit values, but its view state will as the user interacts with the graph.

// The goal of Splunge is to be able to graph more or less anything without much hinting about how that should be done. However, this is obviously something of a pipe dream. Splunge compromises a
// bit by giving the user ways to change the way data is displayed after the fact.

caterwaul('js_all jquery')(function ($) {
  $.splunge(data) = chart_for(data),
  where [

// Presentation and inference heuristics.
// Splunge will choose a graph based on the kind of data you're working with. There are several data types that it can display directly, listed below. It also has rules for converting one kind of
// graph into another. For example, every pie chart can be rendered as a simple bar chart. Every simple bar chart can be rendered as a simple line chart. Clustered bar charts can be rendered as
// multiple-series line charts. Splunge generally starts off with the most specific chart type and lets the user generalize.

// There are several things that happen before Splunge tries to display your data. The very first thing it does is sort your data into multiple homogeneous collections. Different collections may
// be displayed differently. Then, for each collection, it tries to identify features of your data that may constrain how it should be displayed. Features are things like whether the data has
// multiple series, whether one aspect of it is scalar and evenly spaced, whether a time-series can be formed, whether a field can be ordered, etc.

// Splunge makes some assumptions about how data is generally laid out. If a collection is large, Splunge first tries to find an orderable dependent variable. For example, if your dataset
// consists of objects of the form {cost: Number, time: Date}, Splunge will use 'time' as the dependent variable and 'cost' as the independent variable. If the dates are evenly spaced and there
// are fewer than 20 data points, it may render a bar graph; otherwise it will render a line graph. If there are multiple (but fewer than seven) independent variables, Splunge will render either
// a clustered bar graph or a multiple-series line graph.

// Identifying independent variables.
// An independent variable generally has one or more of these characteristics:

// | 1. It is a date.
//   2. It is qualitative, not quantitative.
//   3. Its values are evenly spaced and contain no duplicates.
//   4. At the very least, its values have no duplicates.

// The list above is ordered by priority; a date takes priority over everything else, qualitative is more important than even spacing, and evenly-spaced values are the weakest indicator.

    chart_generalization   = 'pie bar line'.qw,

    homogeneous_shape(xs)  = most_general(+xs *shape -seq)
                     -where [shape(x)         = x == null ? 'null' : x.constructor === Number || '#{+x}' === x ? 'number' : x.constructor === String ? 'string' :
                                   x.constructor === Date ? 'date' : x.constructor === Array ? array_shape(x) : x.constructor === Object ? object_shape(x) : 'null',

                             object_shape(o)  = o %v*shape -seq,
                             array_shape(xs)  = xs *shape -seq,

                             most_general(ss) = ss /more_general -seq
                                        -where [
                                                atom(s)               = s.constructor === String,
                                                generalize_atom(a, b) = 
                                                more_general(s, t) = 


    independence_score(xs) = is_a_date(xs) ? 4 : is_quantitative(xs) ? 3 : xs /!no_duplicates && (xs /!evenly_spaced ? 2 : 1),
                     -where [is_a_date(xs)       = xs[0].constructor === Date,
                             is_quantitative(xs) = xs[0].constructor === Date || xs[0].constructor === Number,
                             derivative(xs)      = xs *[xi > 0 ? +x - +xs[xi - 1] : 0] -seq,
                             no_duplicates(xs)   = xs |![table['@#{x}'] -se [table['@#{x}'] = true]] |seq,
                             evenly_spaced(xs)   = derivative(derivative(sorted)) |![x] |seq]],

// Substructure flattening.
// Suppose you've got a series of objects like [{x: {y: z, t: [...]}, ...}, ...]. Dealing with sub-objects isn't difficult provided that their shape is consistent across samples. The same is true
// of an array whose size is consistent. Things get interesting when it runs into an array whose size isn't constant. These arrays need to be reduced into objects.

// Arrays of numbers are reduced according to the algorithm specified in the view state's 'reductions' field. By default, 'total' is used. This just causes numbers to be summed. Others are:

// | 1. n: the number of elements
//   2. minimum
//   3. maximum
//   4. average
//   5. variance
//   6. quartiles: produces an object of the form {low_quartile, median, high_quartile}

// You can change the reduction to an arbitrary expression to have Caterwaul compile a custom reduction function. The expression will comprise the body and init-block of a left-fold; for example,
// to implement averaging:

// | '[0][x0 + x / xl]'

// I originally intended to have Splunge do some kind of monotone ascension detection and guess that the data was cumulative rather than absolute. However, Caterwaul's futures give you ways of
// doing things like this, so I'm migrating this concern for the moment.

// The reduction behavior for an array of strings depends on characteristics of their distribution. If 50% of the strings have fewer than 20 unique values, then the strings are assumed to
// represent categories the 50 most frequent are folded into an object of the form {string1: frequency1, string2: frequency2, ..., '': remaining_frequency}. Otherwise, the strings are discarded
// and the collection reduces to undefined.

// Objects are reduced by performing a combination of these two transformations. First, all of the objects are reduced to the minimal set of fields that are universally present. For example, [{x,
// y, z}, {x, y}] is reduced to [{x, y}, {x, y}]. The objects are then bucketed according to their string properties. Numeric properties are reduced within each bucket. The result is something
// that looks like [{x: 'foo', y: n1}, {x: 'bar', y: n2}, ...]. The user can choose to collapse any field; this emits a propagation event on the view state node.

// View state values.
// When you first pass data into Splunge, it constructs an initial view state that shows you what it did with your data. For example, suppose you do this:

// | s = caterwaul.splunge([1, 2, 3, 4, 5])
//   s.val()                       // returns the data
//   s.view_state().val()          // returns the view state

// Splunge hasn't inferred anything about your data beyond that it's a numeric series and implicitly ordered by index. It doesn't know whether the data represents a cumulative series or is
// independent; it will assume independence until you tell it otherwise. The view state will be something like this:

// | {dependents: ['x'], independent: 'xi', mode: 'bar', subset: null, reductions: {}, labels: {x: '', y: ''}}

// Here are some more interesting examples:

// | data: [{x: 100, y: 10}, {x: 110, y: 18}, {x: 120, y: 14}, {x: 130, y: 29}]
//   view: {dependents: ['x.y'], independent: 'x.x', mode: 'bar', subset: null, reductions: {}, labels: {x: '', y: ''}}

// | data: [{x: 100, y: 10, z: 50}, {x: 110, y: 50, z: 19}, {x: 120, y: 40, z: 70}]
//   view: {dependents: ['x.y', 'x.z'], independent: 'x.x', mode: 'bar', subset: null, reductions: {}, labels: {x: '', y: ''}}

// | data: [[1, 2, 3, 10], [1, 4], [5, 2], [10, 20, 30]]  ->  [16, 5, 7, 60]
//   view: {dependents: ['x'], independent: 'xi', mode: 'bar', subset: null, reductions: {'x': 'total'}, labels: {x: '', y: 'Total'}}

// | data: [{category: 'bif', value: 10}, {category: 'baz', value: 20}, {category: 'bok', value: 16}, {category: 'fizzle', value: 11}]
//   view: {dependents: ['x.value'], independent: 'x.category', mode: 'bar', subset: null, reductions: {}, labels: {x: 'Category', y: 'Value'}}

// | data: [{category: 'bif', values: [10, 20]}, {category: 'baz', values: [4, 5, 7]}, {category: 'bok', values: []}, {category: 'fizzle', values: [10, 20]}]
//     ->  [{category: 'bif', values: 30}, {category: 'baz', values: 16}, {category: 'bok', values: 0}, {category: 'fizzle', values: 30}]
//   view: {dependents: ['x.values'], independent: 'x.category', mode: 'bar', subset: null, reductions: {'x.values': 'total'}, labels: {x: 'Category', y: 'Total values'}}

// | data: [{xs: [{x: 1, k: 'A'}, {x: 8, k: 'B'}, {x: 4, k: 'A'}]}, {foo: 'bar', xs: [{x: 3, k: 'A'}, {x: 6, k: 'A'}]}]
//     ->  [{xs: [{x: 5, k: 'A'}, {x: 8, k: 'B'}]}, {xs: [{x: 9, k: 'A'}]}]
//   view: {dependents: ['x.xs.x'], independent: 'x.xs.k', mode: 'bar', subset: null, reductions: {'x.xs.x': 'total', 'x.xs.k': 'partition'}, labels: {x: 'xs k', y: 'xs x'}}

})(caterwaul);

// Generated by SDoc 
