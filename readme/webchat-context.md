# How to start a chat with a structured context

The page may be entered with the ```webchat_context``` query parameter, holding base64url encoded
json:

```javascript
{
    wfId: "2c1f5b9e4a7d8c30"              // workflow to start, verified by the backend, optional
    , question: "Start a new chat about order A-4711?"
    , kind: "YesNo"                       // the only kind so far
    , params: { orderId: "A-4711" }       // handed over to the workflow, optional
    , yesLabel: "Start a new chat"        // optional, defaults to Yes
    , noLabel: "Keep the current one"     // optional, defaults to No
}
```

With no conversation running, the chat opens and starts the conversation of the context right away.
With one running, the question is asked first, as a popover over the whole page - dismissed nothing
happens and the chat is not even opened, confirmed the running conversation is replaced by a new
one. The parameter is then removed from the url, so the user is not asked again on a reload.

The question is presented by the popover of the plugin, so it is styled by the ```popover``` section
of the [configuration](configuration.md).

Mind that ```btoa``` alone breaks on diacritics, the json has to be encoded as utf-8 first.

## How to test it

On the [dev server](development.md). The mockbot stores no conversation id, so seed one to get the
question asked - open the example, run the snippet in the console of the browser, open the example
again with the context:

```
http://localhost:4444/webchat-plugin/examples/mockbot.html
```

```javascript
localStorage.setItem("swp-conversation-id", "test-conversation")
```

```
http://localhost:4444/webchat-plugin/examples/mockbot.html?webchat_context=eyJ3ZklkIjoiMmMxZjViOWU0YTdkOGMzMCIsInF1ZXN0aW9uIjoiU3RhcnQgYSBuZXcgY2hhdCBhYm91dCBvcmRlciBBLTQ3MTE_Iiwia2luZCI6Illlc05vIiwicGFyYW1zIjp7Im9yZGVySWQiOiJBLTQ3MTEifSwieWVzTGFiZWwiOiJTdGFydCBhIG5ldyBjaGF0Iiwibm9MYWJlbCI6IktlZXAgdGhlIGN1cnJlbnQgb25lIn0
```

Confirming the question drops the seeded id and the mockbot stores none of its own, so seed it again
for another round. ```localStorage.clear()``` resets everything.
