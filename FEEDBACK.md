# Issue: jest ignores /node_modules/ by default
- when I run $ npm i @console/assessment-js
- my project installs as such:
/Users/julianscharf/Development/console_bht/node_modules/@console/assessment-js/__tests__

- jest will not run correctly.
- jest will ignore any path with /node_modules/ in it by default
- see: https://facebook.github.io/jest/docs/en/configuration.html#coveragepathignorepatterns-array-string

- My workaround: copy '/assesment-js/..' to a different parent directory, re-run npm install.

# Question 6 & 7 other way round
- The tests and the code show the 'set defaults' as question 6,
but the README suggests that it is question 7. Very minor point.
