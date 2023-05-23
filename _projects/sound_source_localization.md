---
layout: page
title: Sound Source Localization
description: 
img: assets/img/projects/sound_source_localization/SSL.jpg
importance: 1
category: academic
---

## Overview

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        This project presents a system for locating disaster victims by sound source localization. The system uses a cubical microphone array to detect sound waves and a grid search method to determine the location of the sound source in 3D space. The system is mounted on an omnidirectional drive vehicle, which allows it to navigate to the location of the sound source.
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="/assets/img/projects/sound_source_localization/system.png" title="SSL System" class="img-fluid rounded z-depth-1" %}
        <div class="caption">
        System diagram of the sound source localization system.
        </div>
    </div>
</div>

The system was evaluated in a simulated disaster environment and was able to successfully locate the sound source. The system is a promising new technology that could be used to help rescue victims of disasters.

The system is also capable of using the deep learning based denoise algorithm to remove background noise and improve the accuracy of the sound source localization.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}
```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```
{% endraw %}
