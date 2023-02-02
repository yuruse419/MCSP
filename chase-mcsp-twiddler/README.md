# Twiddler

## What's Already Here

data-generator.js - creates some data that represents twitter users and their tweets. It's the data you would expect to see if you had created a twitter account and followed a few people. (More tweets appear over time.) You don't need to understand the code therein, but here's what it does:

1. Creates two global variables, `users` and `streams`:

> `users` is an array of strings — the usernames of all the users you're following.
> `streams` is an object with two properties, `users` and `home`:
> &nbsp;&nbsp;`streams.home` is an array of all tweets from all the users you're following.
> &nbsp;&nbsp;`streams.users` is an object with properties for each user. Ex: `streams.users.shawndrost` has all of shawndrost's tweets.

2. Creates 10 random tweets and adds them to the `streams` global variable.
3. Kicks off a periodic process to create more random tweets and adds them to the `streams` global variable.

Note: The generated tweets will be displayed in reverse chronological order.

app.js - The file where you'll be working. It contains some starter code which displays the initial 10 randomly-generated tweets.

jquery.js - A downloaded copy of the jQuery library. You can access it through the global variable `$` or `jQuery`.

## Bare Minimum Requirements

1. Show the user new tweets somehow. (You can show them automatically as they're created, or create a button that displays new tweets.)
1. Display the timestamps of when the tweets were created. This timestamp should reflect the actual time the tweets were created, and should not just be hardcoded.
1. Allow the user to click on a username to see that user's timeline.
1. Design your interface so that you want to look at and use the product you're making.

## Advanced

1. Show when the tweets were created in a human-friendly way (eg "10 minutes ago"). You'll want to find and use a library for this.
1. Allow the user to tweet. (This is going to require you to understand a little more about data-generator.js, but you shouldn't need to modify anything.)

## References

- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
