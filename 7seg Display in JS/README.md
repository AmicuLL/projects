# 7-Segment Display Emulator

This is a simple web application that displays a clock using a 7-segment display. The application is implemented in HTML, CSS, and JavaScript.

## Features

- Display a clock using a 7-segment display.
- Customize the number of 7-segment displays.
- Adjust the width, height, and spacing of the segments.
- Toggle between clock mode and manual input mode.

## How it Works

The application uses HTML for the structure, CSS for styling, and JavaScript for the functionality. The main features include:

- **Clock Display:** When in clock mode, the application updates the time every second and displays it on the 7-segment display. At this mode, there is only pairs of segments, at least 2 and at most 6. As it's implemented now, you can play with dimensions, but you cannot exceed 6 mark. If odd number was inserted, code return 6 for drawing the segments,

- **Manual Input:** In manual input mode, you can customize the segments' values, providing a versatile display for numbers and letters. There are only 5 letters that can be shown because I tried to stick to the standard, but this list could easily go on. <sub><sup>If the middle light is on, there are seven possibilities for both sides of the middle light. There are 23 possibilities in total, but only turning the lowest or the highest light on breaks the connected requirement. So there are seven possibilities for either side, so 7×7=49 in total. If the middle light is not on, there is a connected string of lights on. If we choose one of the six lights, we can turn on lights clockwise. We'll exclude the possibility that all lights but the middle one is turned on, so there are between 1 and 5 lights turned on and we can choose 6 lights where we begin. So this gives a total of 6×5=30 lights. The final possibility is that all lights but the middle one is turned on, i.e. the zero shape. This gives a total of 49+30+1=80 possibilities.| [Reference](https://puzzling.stackexchange.com/a/38267) |</sup></sub>

## Implementation Details

- The `sevenSeg` class represents a 7-segment display and includes methods to draw segments, light up specific segments, and display a colon between two points for the clock.

- The application uses HTML input elements for customization, such as the number of segments, segment element width, segment element height, and spacing between two elements.

- JavaScript handles the logic for updating the clock and managing manual input.

<sub><sup> The implementation is maybe not the best, it took me 2-3 hours to do everything, more or less... So it goes without saying that the app is minimalist and you don't really get any features with it. However, lack of creativity, but some applications could be made with this application. Just for fun.</sup></sub>

## How to Use

1. Open [`index.html`](https://github.com/AmicuLL/projects/blob/main/7seg%20Display%20in%20JS/index.html) in a web browser.

2. By default, the application is in clock mode, displaying the current time. You can switch to manual input mode using the checkbox to `uncheck` it and is situated in top left corner near the label `Clock?:`.

3. In manual input mode, customize the segment values using the provided inputs. You can select individual `Segments` that can be populated by the second menu list named `Value` and it sets the corresponding number to its position in the "`Displayer`". You may wonder `Why in quotes?`. Well, that displayer accepts values between 0 and 9, and as for letters, it doesn't matter if they are uppercase or lowercase as long as they are in the range from a to f [a,b,c,d,e,f]. `Display' needs n characters, where n equals the number of 7-segment components to properly configure the display. If 6 numbers are requested, and the last two were omitted, the displayer automatically completes with 0. If the wrong letter was entered, the displayer will not render anything in that possition, unless you put a valid entry. There are validated many variables, just this one i omitted.

4. Adjust the number of segments(or increment it by pressing the arrow pointing upwards), segment width, height, and spacing to your taste to see real-time updates.

## Examples

Here are a few examples of the application in action:

![Clock Display](https://raw.githubusercontent.com/AmicuLL/projects/main/7seg%20Display%20in%20JS/images/clock_display.png)

![Manual Input](https://github.com/AmicuLL/projects/blob/main/7seg%20Display%20in%20JS/images/manual_input.png?raw=true)

## Credits

The idea was given to me by my university professor to emulate a 7seg with bit-wise in a programming language of your choice. I chose JavaScript because I don't think there is anything easier than that.

This application was created by [AmicuLL](https://github.com/AmicuLL).

Feel free to contribute and improve this project!
