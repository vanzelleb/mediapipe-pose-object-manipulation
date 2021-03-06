## Moving objects in 3D space through body pose tracking

The objective of this experiment was to verify if I could move objects in 3D space by tracking my body pose through a webcam and run the whole thing in a browser. Maybe it serves as a starting point for more ambitious projects.

![Juggling balls](public/balls2.jpg)

This example is based on MediaPipe's pose (Blazepose) model published in this [article](https://google.github.io/mediapipe/solutions/pose.html). I only added a node/express server and some AFrame 3D objects.

It tracks the position of your wrists in 2D and 3D space.
While the 2D positions match the location of your wrists in the video input, the 3D positions are relative to the position of your body's center. This means you can stand anywhere in the room and have the same control over the objects. This allows for more freedom of movement.

The pose tracking works best if at least your upper body is fully visible in the video.

**You can try it out [here](https://sjvd9.sse.codesandbox.io/)**
