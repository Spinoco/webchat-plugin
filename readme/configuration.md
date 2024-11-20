# Configuration

List of all configuration properties.

## Configuration elements

### DirectLine properties

key: `directLine`


| Property   | Type    | Default   | Description                                   |
|------------|---------|-----------|-----------------------------------------------|
| **secret** | string  | undefined | Spinoco key to pair with Chat in Spinoco instance |
| useMockbot | boolean | undefined | When true, the mockbot is used instead        |
| domain     | string  | undefined | Domain of the direct line (europe/india)      |


### Base properties

These properties are available in root of the configuration document

| Property           | Type   | Default                 | Description                                                                                                                                                                                                |
|--------------------|--------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **primaryColor**   | string |                         | Primary color that is used in the chat plugin. This can be overridden in certain areas of the plugin but serves as the base through the chat window. May be referenced as variable (`--swp-color-primary`) |
| **secondaryColor** | string |                         | Secondary color that complement primary color, May be referenced as variable (`-swp-color-secondary`)                                                                                                       |
| primaryColorHover  | string | `--swp-color-primary`   | Whenever primary color is used and the item has hover functionality, this is used on that hover                                                                                                            |
| borderColor        | string | `--swp-color-primary`   | Color of the border (i.e. in input element)                                                                                                                                                                |
| subtle             | string | `--swp-color-secondary` | Color of the text that shall not be highlighted i.e. Placeholder text, message Timestamp                                                                                                                   |

### Variables

For complex configurations, variables are useful way how to ensure consistent look and feel across the chat window. 
Variables are defined in the `variables` of the configuration document and can be referenced in other parts of the configuration.
Variables are implemented as css variables and can be referenced as `var(--swp-<name>)`.

key `variables`

| Property           | Type   | Default             | Description                                   |
|--------------------|--------|---------------------|-----------------------------------------------|
| <name>       | string |                     | defines a name of the varaible `--swp-<name>` |


### Trigger

Properties of the icon that opens chat window.

key: `trigger`


| Property         | Type           | Default               | Description                                                                               |
|------------------|----------------|-----------------------|-------------------------------------------------------------------------------------------|
| height           | number, string | 50px                  | Height of the trigger                                                                     |
| width            | number, string | 50px                  | Width of the trigger                                                                      |
| zIndex           | number         |                       | Allows to set html zIndex to customize zIndex order                                       |
| background       | string         | `--swp-color-primary` | Background color of the trigger                                                           |
| border           | string         |                       | Border of the trigger                                                                     |
| borderRadius     | string         | 100%                  | Border radius (100% creates a circle)                                                     |
| icon.base64      | string         |                       | Icon graphics encoded in BASE64                                                           |
| icon.url         | string         |                       | Link to Icon graphics if not provided as base64                                           |
| icon.color       | string         | #FFFFFF               | Color of the Icon                                                                         |
| icon.height      | string         | 24px                  | Height of the Icon                                                                        |
| icon.lottie.data | object         |                       | [Lottie animations](https://lottiefiles.com/59839-commnet-animation) Json                 |
| icon.lottie.url  | string         |                       | [Lottie animations](https://lottiefiles.com/59839-commnet-animation) Lottie Animation URL |

### Chat Window : Header

Defines properties of the header of the chat window 

key: `header`

| Property         | Type    | Default        | Description                                                         |
|------------------|---------|----------------|---------------------------------------------------------------------|
| padding          | string  | 8px            | Padding of the window content                                       |
| backgroundColor  | string  | `--swp-color-primary` | Background of the chat window                                       |
| borderBottom     | string  | `--swp-color-primary` | Botom border definition such as `1px solid var(--swp-color-grey-500)`   |                                |
| logo.height      | string  | 20px           | Width of the logo placed in the header                              |
| logo.base64      | string  |                | BASE64 encoded source of the image to be used as logo               |
| logo.url         | string  |                | Url where the image for hte logo may be found                       |
| title.hide       | boolean | false          | Allows to hide title of the header (only logo is shown)             |
| title.color      | string  | #FFFFFF        | Specifies color of the title text                                   |
| title.text       | string  |                | Allows to set the text to show in header                            |
| title.fontSize   | number  | 14             | Size of the font in pixels                                          |
| title.fontWeight | number  | 500            | Weight of the font used in header                                   |
| closeIcon.hide   | boolean | false          | Hides the close button, to the user's won't be able to close window |
| closeIcon.height | string  | 20px           | Height of the close button                                          |
| closeIcon.base64 | string  |                | Specifies the image to be used as close button in BASE64            |
| closeIcon.url    | string  |                | Specifies the URL of the image to be used as close button           |
| closeIcon.color  | string  | #FFFFFF        | Color of the close button                                           |

### Popover

Popover is small window that is inviting customer in the chat 

key: `popover`

| Property                    | Type           | Default | Description                                            |
|-----------------------------|----------------|---------|--------------------------------------------------------|
| borderRadius                | number, string | 16px    | Radius of the border of the popover window             |
| head.logo.base64            | string         |         | Logo in the heading of the popover encoded as BASE64   |
| head.logo.url               | string         |         | Url of the Logo in the heading of the popover          |
| head.borderColor            | string         | #51585D | Color of the heading                                   |
| head.backgroundColor        | string         | #FFFFFF | Background color of the heading                        |
| head.closeBtnColor          | string         | #000000 | Close button of the heading                            |
| body.titleColor             | string         | #000000 | Color of the title text in the Body of the popover     |
| body.button.backgroundColor | string         | #0072BF | Background color for the button that opens chat window |
| body.button.color           | string         | #FFFFFF | Color of the button that opens chat window             |
| body.button.iconColor       | string         | #FFFFFF | Color of the icon shown in the button                  |
| body.backgroundColor        | string         | #FFFFFF | Background color of the Popover                        |

### Window of the Chat 

Basic parameters of the chat window

key: `root`

| Property     | Type           | Default | Description                          |
|--------------|----------------|---------|--------------------------------------|
| height       | number, string | 500px   | Height of the chat window, in pixels |
| width        | number, string | 400px   | Width of the chat window, in pixels  |
| zIndex       | number         | 0       | Z-index of the chat window           |
| background   | string         | #FFFFFF | background color for chat            |
| borderRadius | number         | 0       | border radius for header and chat    |

### Message from the Business to the User

Parameters of message "bubble" when message is sent to user from the business

key: `bubble`

| Property      | Type   | Default | Description                       |
|---------------|--------|---------|-----------------------------------|
| background    | string | #EEEEEE | background color for bot and user |
| border.color  | string | #E6E6E6 | border color for bot and user     |
| border.radius | number | 4       | border radius for bot and user    |
| border.style  | string | solid   | border style for bot and user     |
| border.width  | number | 0       | border width for bot and user     |
| color         | string | #232323 | text color for bot and user       |

### Message from the User to Business 

Parameters of message "bubble" when message is sent from user to the business

key: `bubbleFromUser`

| Property      | Type   | Default | Description               |
|---------------|--------|---------|---------------------------|
| background    | string | #EEEEEE | background color for user |
| border.color  | string | #E6E6E6 | border color for user     |
| border.radius | number | 4       | border radius for user    |
| border.style  | string | solid   | border style for user     |
| border.width  | number | 0       | border width for user     |
| color         | string | #232323 | text color for  user      |

### Avatar

Avatar parameters to be shown for the user 

key `avatar`

| Property     | Type           | Default        | Description               |
|--------------|----------------|----------------|---------------------------|
| size         | number         | 30             | Size of the avatar        |
| borderRadius | number, string | 100%           | Radius of the border      |
| background   | string         | `--swp-color-primary` | Background of the avatar  |
| fontSize     | string         | 12px           | Font to use inside avatar |

### Typing indicator

key: `typingIndicator`

| Property   | Type   | Default | Description                                        |
|------------|--------|---------|----------------------------------------------------|
| background | string | #F0F0F0 | Defines background color of typing (...) indicator |
| color      | string | #999999 | Defines color (dots) of typing indicator           |

### Suggested actions

Format of the suggested action or user to follow on 

key: `suggestedAction`

| Property          | Type                          | Default        | Description                                               |
|-------------------|-------------------------------|----------------|-----------------------------------------------------------|
| layout            | "carousel", "stacked", "flow" | stacked        | Defines how the suggested actions are laid out.           |
| height            | number, string                | 40             | Defines height of the suggested action                    |
| imageHeight       | number, string                | 20             | Defines height of the image in suggested action if shown  |
| textColor         | string                        | `--swp-olor-primary` | Defines text color                                        |
| textColorOnHover  | string                        | `--swp-color-primary` | Defines text color to be used when hovering over          |
| background        | string                        | `--swp-color-primary` | Defines background color of the action                    |
| backgroundOnHover | string                        | #F3F2F1        | Defines background color of the action when hovering over |
| border.color      | string                        | `--swp-color-primary` | Defines border color of the action                        |
| border.radius     | number, string                | 4px            | Defines border radius                                     |
| border.style      | string                        | solid          | Defines style of the border                               |
| border.width      | number                        | 2px            | Defines border width                                      |

### Send box

Controls visauals of the box where user can type and send messages

key: `sendBox`

| Property                 | Type           | Default          | Description                                                                 |
|--------------------------|----------------|------------------|-----------------------------------------------------------------------------|
| background               | string         | transparent      | Background color                                                            |
| color                    | string         | #000000          | Color of the text                                                           |
| textWrap                 | boolean        | false            | Whether user is allowed to write text on multiple lines (text-wrap)         |
| height                   | number, string | 40               | Height of the input box                                                     |
| border.top               | number, string | 1px solid #E6E6E6 | top border of the input box                                                 |
| border.right             | number, string |                  |                                                                             |
| border.bottom            | number, string |                  |                                                                             |
| border.left              | number, string |                  |                                                                             |
| button.color             | string         | `--swp-color-primary`   | Default color for any buttons in the send box                               |
| button.colorOnHover      | string         | `--swp-color-primary`   | Default color for any buttons in the send box when hovoered over            |
| button.shadeInset        | number         | 0                | Default shade (~ background) inset for any buttons in the send box          |
| button.shadeColor        | string         | #F3F2F1          | Default shade (~ background) color for any buttons in the send box          |
| button.shadeColorOnHover | string         | #F3F2F1          | Default shade (~ background) color on hover for any buttons in the send box |

### send

Properties to control send button 

key: `sendBox.send`

| Property             | Type           | Default           | Description                |
|----------------------|----------------|-------------------|----------------------------|
| background           | string         | transparent       |                            |
| hoverBackgroundColor | string         | `--swp-color-primary`        | Color to show the icon with  |
| color                | string         | #000000           |                            |
| hoverColor           | string         | #000000           |                            |
| width                | number, string | 40                | Width of the button in px  |
| height               | number, string | 40                | Height of the button in px |


### upload

key: `sendBox.upload`

Properties to control upload button

| Property          | Type           | Default           | Description                |
|-------------------|----------------|-------------------|----------------------------|
| background        | string         | transparent       |                            |
| color             | string         | #000000           |                            |
| width             | number, string | 40                | Width of the button in px  |
| height            | number, string | 40                | Height of the button in px |
 

### Features

key: `features`

| Property           | Type    | Default | Description                                                                      |
|--------------------|---------|---------|----------------------------------------------------------------------------------|
| bubbleSingleBorder | boolean |         | Set bubble only one border. Bot bubble - left border, user bubble - right border |
| scrollbar          | boolean |         | Minimalistic scrollbar style                                                     |
| sendBoxInputBorder | boolean |         | 1px solid border around input box with `borderColor`                             |
| embedded           | boolean |         | Allows the webchat plugin to be embedded directly into a webview. Embeded plugin does not have header and may not be opened/closed.|

### Rules that allow to customize behaviour of the plugin based on certain criteria.

key `rules`

This is defined as array of the following objects. First rule matching applies others are ignored


| Property   | Type                    | Default | Description                                                                                                                                                                                                                                                                                                                |
|------------|-------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **domain** | string, Array of string |         | Required. Defines url of the domain this rule applies to. It is defined as string. If the string starts with "/" character, it is applied only to url path without hostName, otherwise it applies to hostname and path. Url is tested to start with given string, case ignored. multiple urls can be specified with array. |
| disable    | boolean                 | false   | Disables webchat functionality, webchat will not initialize/render.                                                                                                                                                                                                                                                        |
                                                                                                                                                                                                                                                                                                         |
Example of the rules configuration :

```json
{
  "rules": [
    {
      "domain": "https://www.example.com",
      "disable": true
    }  
  ]
}

```

## Configuration example

### Minimal

```json
{
  "primaryColor": "red",
  "secondaryColor": "black"
}
```

### Lottie animation

```json
{
  "trigger": {
    "background": "transparent",
    "icon": {
      "lottie": {
        "url": "https://assets3.lottiefiles.com/private_files/lf30_z588h1j0.json"
      }
    }
  }
}
```
