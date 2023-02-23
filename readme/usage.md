# How to use webchat plugin

Insert this snippet before the ```</body>``` tag.

```html
<div
    id="spinoco-webchat-plugin"
    data-client-id=""
    data-customer-name=""
    data-customer-email=""
    data-bot-avatar-url=""
    data-user-avatar-url="">
</div>
<script type="module" src="https://spinoco.github.io/webchat-plugin/assets/spinoco-webchat-plugin.js"></script>
```

- ```data-client-id``` client identification, required
- ```data-customer-name``` name of customer, optional 
- ```data-customer-email``` email of customer, optional
- ```data-bot-avatar-url``` bot avatar image url, optional
- ```data-user-avatar-url``` user avatar image url, optional
- ```data-bot-avatar-base64``` bot avatar image in base64, optional
- ```data-user-avatar-base64``` user avatar image in base64, optional
