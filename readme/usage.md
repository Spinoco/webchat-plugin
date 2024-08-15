# How to use webchat plugin

Insert this snippet before the ```</body>``` tag.

```html
<div
    id="spinoco-webchat-plugin"
    data-config-url=""
    data-customer-name=""
    data-customer-email=""
    data-bot-avatar-url=""
    data-user-avatar-url="">
</div>
<script type="module" src="https://cdn.spinoco.com/webchat/v2/spinoco-webchat-plugin.js"></script>
```

- ```data-config-url``` location of configuration file, required
- ```data-customer-name``` name of customer, optional 
- ```data-customer-email``` email of customer, optional
- ```data-bot-avatar-url``` bot avatar image url, optional
- ```data-user-avatar-url``` user avatar image url, optional
- ```data-bot-avatar-base64``` bot avatar image in base64, optional
- ```data-user-avatar-base64``` user avatar image in base64, optional

# How to work with webchat on your page

## How to open webchat programmatically

If you need to open webchat programmatically, you can use the following code:

```javascript
spinocoWebchatPlugin.openChat();
```

This will open chat window.

## How to open chat with <a> tag

Sometimes, you need to open chat window as a result of customer interaction with your page, 
for example, when customer clicks on a link. You can use the following code:

```html
<a href="#sp-webchat;open">Open Chat</a>
```
Once user clicks on the link, chat window will be opened.


### How to open popover

- Call method bellow from javascript. You can test it from browser console.

```javascript
spinocoWebchatPlugin.showPopover("label", "buttonLabel", 1);
```

- ```label``` popover label
- ```buttonLabel``` button label (button opens chat)
- ```delay``` delay in seconds before popover is opened

