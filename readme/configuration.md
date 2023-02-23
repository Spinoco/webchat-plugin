# Configuration

List of all configuration properties.

## Configuration elements

### Base properties

| Property           | Type   | Default          | Description                          |
|--------------------|--------|------------------|--------------------------------------|
| **primaryColor**   | string |                  |                                      |
| **secondaryColor** | string |                  |                                      |
| primaryColorHover  | string | `primaryColor`   |                                      |
| borderColor        | string | `primaryColor`   | input                                |
| subtle             | string | `secondaryColor` | message timestamp, input placeholder |

### Trigger

| Property         | Type           | Default        | Description                                                                               |
|------------------|----------------|----------------|-------------------------------------------------------------------------------------------|
| height           | number, string | 50px           |                                                                                           |
| width            | number, string | 50px           |                                                                                           |
| zIndex           | number         |                |                                                                                           |
| background       | string         | `primaryColor` |                                                                                           |
| border           | string         |                |                                                                                           |
| borderRadius     | string         | 100%           |                                                                                           |
| icon.base64      | string         |                |                                                                                           |
| icon.url         | string         |                |                                                                                           |
| icon.color       | string         | #FFFFFF        |                                                                                           |
| icon.height      | string         | 24px           |                                                                                           |
| icon.lottie.data | object         |                | [Lottie animations](https://lottiefiles.com/59839-commnet-animation) Json                 |
| icon.lottie.url  | string         |                | [Lottie animations](https://lottiefiles.com/59839-commnet-animation) Lottie Animation URL |

### Header

| Property         | Type    | Default        | Description |
|------------------|---------|----------------|-------------|
| padding          | string  | 8px            |             |
| background       | string  | `primaryColor` |             |
| logo.height      | string  | 20px           |             |
| logo.base64      | string  |                |             |
| logo.url         | string  |                |             |
| title.hide       | boolean | false          |             |
| title.color      | string  | #FFFFFF        |             |
| closeIcon.hide   | boolean | false          |             |
| closeIcon.height | string  | 20px           |             |
| closeIcon.base64 | string  |                |             |
| closeIcon.url    | string  |                |             |
| closeIcon.color  | string  | #FFFFFF        |             |

### Root

| Property     | Type           | Default | Description                       |
|--------------|----------------|---------|-----------------------------------|
| height       | number, string | 500px   |                                   |
| width        | number, string | 400px   |                                   |
| zIndex       | number         | 0       |                                   |
| background   | string         | #FFFFFF | background color for chat         |
| borderRadius | number         | 0       | border radius for header and chat |

### Bubble

| Property      | Type   | Default | Description                       |
|---------------|--------|---------|-----------------------------------|
| background    | string | #EEEEEE | background color for bot and user |
| border.color  | string | #E6E6E6 | border color for bot and user     |
| border.radius | number | 4       | border radius for bot and user    |
| border.style  | string | solid   | border style for bot and user     |
| border.width  | number | 0       | border width for bot and user     |
| color         | string | #232323 | text color for bot and user       |

### Bubble from user

| Property      | Type   | Default | Description               |
|---------------|--------|---------|---------------------------|
| background    | string | #EEEEEE | background color for user |
| border.color  | string | #E6E6E6 | border color for user     |
| border.radius | number | 4       | border radius for user    |
| border.style  | string | solid   | border style for user     |
| border.width  | number | 0       | border width for user     |
| color         | string | #232323 | text color for  user      |

### Avatar

| Property     | Type           | Default        | Description |
|--------------|----------------|----------------|-------------|
| size         | number         | 30             |             |
| borderRadius | number, string | 100%           |             |
| background   | string         | `primaryColor` |             |
| fontSize     | string         | 12px           |             |

### Typing indicator

| Property   | Type   | Default | Description |
|------------|--------|---------|-------------|
| background | string | #F0F0F0 |             |
| color      | string | #999999 |             |

### Suggested actions

| Property      | Type                          | Default        | Description |
|---------------|-------------------------------|----------------|-------------|
| layout        | "carousel", "stacked", "flow" | stacked        |             |
| height        | number, string                | 40             |             |
| imageHeight   | number, string                | 20             |             |
| textColor     | string                        | `primaryColor` |             |
| background    | string                        | `primaryColor` |             |
| border.color  | string                        | `primaryColor` |             |
| border.radius | number, string                | 4px            |             |
| border.style  | string                        | solid          |             |
| border.width  | number                        | 2px            |             |

### Send box

| Property          | Type           | Default           | Description |
|-------------------|----------------|-------------------|-------------|
| background        | string         | #FFFFFF           |             |
| color             | string         | #000000           |             |
| height            | number, string | 40                |             |
| button.color      | string         | `primaryColor`    |             |
| button.shadeInset | number         | 0                 |             |
| border.top        | number, string | 1px solid #E6E6E6 |             |
| border.right      | number, string |                   |             |
| border.bottom     | number, string |                   |             |
| border.left       | number, string |                   |             |

### Features

| Property           | Type    | Default | Description                                                                      |
|--------------------|---------|---------|----------------------------------------------------------------------------------|
| bubbleSingleBorder | boolean |         | Set bubble only one border. Bot bubble - left border, user bubble - right border |
| scrollbar          | boolean |         | Minimalistic scrollbar style                                                     |
| sendBoxInputBorder | boolean |         | 1px solid border around input box with `borderColor`                             |

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
