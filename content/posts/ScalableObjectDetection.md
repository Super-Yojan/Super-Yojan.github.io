+++
title = "Scalable Object Detection"
author = ["DTR"]
publishDate = 2024-07-16
tags = ["Embedded", "Vision"]
draft = false
+++

As the world increasingly relies on machine learning, IoT devices must
adapt to keep up with this trend. IoT devices are typically small and
lack substantial computing power. A popular approach for IoT devices
leveraging machine learning is to send data for off-board processing.

Let's explore how to build a simple object detection microservice to
run object detection tasks on a base station using an ESP32-CAM as our
IoT device. The inspiration for this project came from the desire to
create a small, autonomous blimp. When working with a blimp, weight is
a critical constraint, as payload capacity is usually under 200g. My
goal was to keep the weight of the components around 70 to 80 grams,
which ruled out heavy and powerful processors. Therefore, the compact
and affordable ESP32-CAM was the ideal choice.

The functionalities I aimed to achieve were:

1.  Receiving camera frames via TCP, detecting objects in the given
    frame, and returning the coordinates.
2.  Handling multiple concurrent requests.
3.  Ensuring the system is as fast and lightweight as possible.


## Making the base server {#making-the-base-server}

The object detection code was fairly simple as I was using YOLOv8

```python

HOST = "0.0.0.0"
PORT = 4000

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen()

frameSize = 0
model = YOLO('model/best.pt')
```

Starting with simple socket initialization and importing the model. If
you want to learn more about how to train your own custom model, refer
to [this guide](https://blog.roboflow.com/how-to-train-yolov8-on-a-custom-dataset/).

```python
def on_new_client(conn, addr):
    while True:
        header = conn.recv(4)
        print("len", header)
        try:
            bytes_to_read = int(header.decode())
        except:
            bytes_to_read = 0
        img = bytes()
        det_mode = conn.recv(1)
        while len(img) < bytes_to_read:
            img += conn.recv(min(bytes_to_read - len(img), 4096))

        if len(img) >4:
            img = np.frombuffer(img, np.uint8)
            img = cv.imdecode(img, cv.IMREAD_COLOR)
            results = model(img, conf=0.8)
            if det_mode == 1:
                largets = filter_detection(results, [2,3])
            elif det_mode == 2:
                largets = filter_detection(results, [5,7,9])
            elif det_mode == 3:
                largets = filter_detection(results, [6,8,10])
            else:
                largets = get_largest(results)

            if largets:
                sendstr = str(largets)[1:len(str(largets))-1]
                conn.send(sendstr.encode('utf-8'))
            else:
                conn.send("0,0,0,0,0,0#".encode('utf-8'))
```

Here is the code that receives the image frame from the ESP32-CAM and
processes the object detections. The server can also filter out a
specific object based on a requested ID, returning the largest
matching object in the frame.

```python
"""
Returns the largets detection from the detection list
"""
def get_largest(detections):
    largets = None
    print(len(detections))
    for det in detections:
        bounding = torch.tensor(det.boxes.xywh).tolist()
        cl = torch.tensor(det.boxes.cls).tolist()
        if len(cl) > 0:
            bounding.append(cl[0])
        if largets:
            if bounding[2] * bounding[3] > largets[2] * largets[3]:
                largets= bounding
        else:
            largets= bounding

    return largets

"""
Filters out the detection based on the provided classes

class_list = {3,4} // Balls
class_list = {5,6,7,8,9,10} // Goals
"""
def filter_detection(class_list,detections):
    largets = None
    for det in detections:
        bounding = torch.tensor(det.boxes.xywh).tolist()
        cls = torch.tensor(det.boxes.cls).tolist()
        if cls in class_list:
            if len(cls) > 0:
                bounding.append(cls)
            if largets:
                if bounding[2] * bounding[3] > largets[2] * largets[3]:
                    targets = bounding
            else:
                largets = bounding

    return largets
```


## Containarizing it {#containarizing-it}

Now that we have our base server let's take a look at how we can use docker to containarize it.

```docker
FROM python


RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /home/

COPY . .
EXPOSE 8000
CMD [ "python3", "src/main.py" ]
```

Now we can run this script with docker compose

```yaml
version: "3.9"
services:
  vision:
    build: .
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    expose:
      - "8000"
  nginx:
    image: nginx:latest
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - vision
    ports:
      - "4000:4000"
```

Running the shell script will run scalable server.

```shell
sudo docker compose up --scale vision=5 -d
```


## Architecture at a glance {#architecture-at-a-glance}

Here is what the architecture looks like.

{{< figure src="/scalableobj/ServerArchitecture.png" caption="<span class=\"figure-number\">Figure 1: </span>Server Architecture" >}}
