Autocomplete using Redis
======

This is a sample app for a Mobtalk given at Mobiquity Gainesville on 25th February, 2015. This app demos how to use redis to do something interesting -- implement autocomplete.


**Prerequisites**:

* Redis installed on your machine.

**Installation steps**:

1. Clone this repo
<pre>
$> git clone git@github.com:nraomobiquityinc/redis-autocomplete.git
$> cd redis-autocomplete
</pre>

2. Set it up:
<pre>
$> npm install
</pre>

3. Add your own configuration file to the project root. Use the `sample-config.json` in the project root as a reference.

4. Start redis:
<pre>
$> redis-server
</pre>

5. Run the app:
<pre>
$> npm start
</pre>

6. Browse to the app on your browser: `http://localhost:<port>/` where `port` is whatever you defined in your `config.json`. By default, port `8421` is used.
