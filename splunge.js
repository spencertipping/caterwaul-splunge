// Splunge graphing library | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Splunge is a realtime graphing library that uses Raphael.js and jQuery. It provides one function, caterwaul.splunge(), that takes data of some sort and returns a graph for that data. You can
// pass in hints to indicate how the data should be displayed. Splunge ties into the Caterwaul invariant framework by providing two nodes per graph. One node determines the graph's data and the
// other determines the view state. Each can be updated at any point. The graph's value node will never emit values, but its view state will as the user interacts with the graph.

// The goal of Splunge is to be able to graph more or less anything without much hinting about how that should be done. However, this is obviously something of a pipe dream. Splunge compromises a
// bit by giving the user ways to change the way data is displayed after the fact.

caterwaul('js_all jquery')(function ($) {

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

// If the numeric fields in every object sum to within 0.1% of the same quantity, then Splunge renders a stacked bar or line graph. If the variance of any two numeric fields lies within the range
// [0.3, 1) or (-1, -0.3] and there are more than 30 data points, then Splunge sorts by the more continuous variable of the two and shows a line graph.

// Substructure flattening.
// Suppose you've got a series of objects like [{x: {y: z, t: [...]}, ...}, ...]. It isn't necessarily obvious what to do with the sub-objects, so Splunge tries to flatten them out. It does this
// by inlining objects directly; so {x: {y: z}} becomes {'x y': z}. If it finds an array, it attempts to reduce it somehow. How this is done depends on the values that are being reduced.

// If an array is the same size across all samples and contains fewer than five elements, then it is not reduced. Instead, it is treated as an object with fields named 'first', 'second', etc.

// An array of numbers is generally reduced by statistical reduction. This means that the array is transformed into an object containing the fields {n, total, minimum, maximum, low_quartile,
// median, high_quartile, low_10, high_10, average, variance}. If the initial array is monotonically increasing across all samples, then Splunge assumes that it's a cumulative sum and subtracts
// one entry from the next. So, for example, the array [1, 2, 4, 61, 100] would become [1, 1, 2, 57, 39] and would then be statistically reduced.

// The reduction behavior for an array of strings depends on characteristics of their distribution. If 50% of the strings have fewer than 20 unique values, then the strings are assumed to
// represent categories the 50 most frequent are folded into an object of the form {string1: frequency1, string2: frequency2, ..., '': remaining_frequency}. Otherwise, the strings are discarded
// and the collection reduces to undefined.

// Objects are reduced by performing a combination of these two transformations. First, all of the objects are reduced to the minimal set of fields that are universally present. For example, [{x,
// y, z}, {x, y}] is reduced to [{x, y}, {x, y}]. The objects are then bucketed according to their string properties. Numeric properties are reduced within each bucket.

// Identifying independent variables.
// An independent variable generally has one or more of these characteristics:

// | 1. It is a date.
//   2. It is qualitative, not quantitative.
//   3. Its values are evenly spaced.

// The list above is ordered by priority; a date takes priority over everything else, qualitative is more important than even spacing, and evenly-spaced values are the weakest indicator.

  $.splunge(data) = null})(caterwaul);

// Generated by SDoc 
