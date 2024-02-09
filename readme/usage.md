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

### How to open popover

- Call method bellow from javascript. You can test it from browser console.

```shell
spinocoWebchatPlugin.showPopover("label", "buttonLabel", 1);
```

- ```label``` popover label
- ```buttonLabel``` button label (button opens chat)
- ```delay``` delay in seconds before popover is opened

