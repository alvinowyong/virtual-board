# Virtualboard - A real-time digital whiteboard

![](https://s10.gifyu.com/images/demo-vb.md.gif)

Bare minimal implementation of communication between browser clients using socket.io.

## How to run the code

```powershell
# Install node dependencies for server
npm install

# Run the server
node server
```

Start using Docker

```powershell
# Building the image
docker build --tag virtualboard .

# Run the image in a container
docker run -d -p 3000:3000 virtualboard
```
