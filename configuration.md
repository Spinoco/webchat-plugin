# Configuration

List of all configuration properties.

## Configuration elements

### Base properties

| Property           | Type   | Default         | Description                          |
|--------------------|--------|-----------------|--------------------------------------|
| **primaryColor**   | string |                 |                                      |
| **secondaryColor** | string |                 |                                      |
| primaryColorHover  | string |  primaryColor   |                                      |
| borderColor        | string |  primaryColor   | input                                |
| subtle             | string |  secondaryColor | message timestamp, input placeholder |

### Trigger

| Property     | Type           | Default      | Description                                   |
|--------------|----------------|--------------|-----------------------------------------------|
| height       | number, string | 50px         |                                               |
| width        | number, string | 50px         |                                               |
| zIndex       | number         |              |                                               |
| background   | string         | primaryColor |                                               |
| border       | string         |              |                                               |
| borderRadius | string         | 100%         |                                               |
| icon.base64  | string         |              |                                               |
| icon.color   | string         | #FFFFFF      |                                               |
| icon.height  | string         | 24px         |                                               |
| icon.lottie  | json           |              | [Lottie animations](https://lottiefiles.com/) |

### Header

| Property         | Type    | Default      | Description |
|------------------|---------|--------------|-------------|
| padding          | string  | 8px          |             |
| background       | string  | primaryColor |             |
| logo.height      | string  | 20px         |             |
| logo.base64      | string  |              |             |
| title.hide       | boolean | false        |             |
| title.color      | string  | #FFFFFF      |             |
| closeIcon.hide   | boolean | false        |             |
| closeIcon.height | string  | 20px         |             |
| closeIcon.base64 | string  |              |             |
| closeIcon.color  | string  | #FFFFFF      |             |

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

### Avatar

### Typing indicator

### Suggested actions

### Send box

### Features

## Configuration example

### Minimal

```json
{
  "primaryColor": "red",
  "secondaryColor": "black"
}
```
