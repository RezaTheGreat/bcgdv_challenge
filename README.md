# BCG DV Code Challenge
this is the Coding Challenge made for BCG DV interview<br>
## Running the App
prerequisite `Node 14 LTS`<br>
to run the project run the following commands.
1. clone the repo
2. `npm i`
3. run the tests: `npm test`
4. change the server port in `src/config.ts` if necessary
5. `npm start`

this will make the server running and accepting the requests.

the project can be ran using *VSCode Node Debugger* as well to put the breakpoints and stuff.
## Approach and structure
this project is designed using TDD approach and is structured by components. each layer (logic, server, datastore) has its own concerns and is isolated from the others and can be tested alone.<br>
since the data is a simple and little it's saved in a map and is accessible through it.
## Tests
this project has 3 sets of tests.<br>
the first two test suits are there to assure the functions' expected behavior in isolation from other components and the final test of the server acts as an integration test as well since it needs all of the functions to be acting correctly.
The 

## Suggested Improvements
- more edge case exceptions can be thought and covered and included in tests. 
- validation in the server input can cover more edge cases and provide more narrowed down errors for each case.
- all error is the server can be logged to `std.err` as well.
- Datastore can be done in JSON for flexibility during runs.