---
layout: page
title: Sound Source Localization
description: A system for locating disaster victims by sound source.
img: assets/img/projects/sound_source_localization/SSL.jpg
importance: 1
category: academic
---

## Overview

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        We developed a 3D sound source localization system using an 8-microphone cubical mesh. The primary goal of this system was to accurately determine the azimuth (horizontal angle) and elevation (vertical angle) of an incoming sound source. The system uses a cubical microphone array to detect sound waves and a grid search method to determine the location of the sound source in 3D space. The system is mounted on an omnidirectional drive vehicle, which allows it to navigate to the location of the sound source.
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

## Methodology
Here's a breakdown of the project:

**1. Hardware Setup**: We created a cubical mesh configuration with eight microphones, ensuring that the microphones were evenly distributed for optimal coverage.  
**2. Sound Localization Algorithm**: We implemented the GCC-PHAT (Generalized Cross-Correlation with Phase Transform) algorithm. This algorithm is widely used for sound source localization and is known for its accuracy in determining the time delay of arrival (TDOA) between microphone pairs.  
**3. Data Acquisition**: The system recorded sound data from the eight microphones. By analyzing the TDOAs between microphone pairs, we calculated the azimuth and elevation angles of the sound source.  
**4. Signal Denoising**: To improve the accuracy of the localization system, we integrated a Convolutional Neural Network (CNN) for speech denoising. This CNN was trained to remove noise from the recorded audio signals.  
**5. Result**t: After extensive testing and training, the system reached an impressive 95% accuracy in 3D localization within a range of 1.5 meters. This level of accuracy was achieved through the combination of the precise GCC-PHAT algorithm and the denoising capabilities of the CNN.  
**6. Conclusion**: This project is a significant achievement as it demonstrates the successful integration of signal processing techniques, machine learning, and hardware design to create a 3D sound source localization system with high accuracy. It has various potential applications in fields such as robotics, audio surveillance, and augmented reality.  

## Algorithm
<!-- Add an image -->
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="/assets/img/projects/sound_source_localization/algorithm.png" title="Algorithm image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Process flow diagram of the algorithm.
</div>

## Demo
<!-- embed a youtube video -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/Y1u37uJwSeI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<br>


## Key Features
- Sound source localization
- Deep learning based denoise algorithm
- Omnidirectional drive vehicle

## Technologies

**Hardware:** Raspberry Pi, AVR, Microphone Array, Omnidirectional Drive Vehicle  
**Software:** Python, C, Keras

## Source Code:
- [Sound Source Localization](https://github.com/subash-timilsina/Sound-Source-Localization)
- [Denoise Algorithm](https://github.com/connectwithprakash/Speech-Denoising-using-CED)

## Screenshots
<!-- Add multiple images -->
<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="/assets/img/projects/sound_source_localization/microphone_cube.png" title="Cubical Microphone Array" class="img-fluid rounded z-depth-1" %}
        <div class="caption">
            Cubical microphone array.
        </div>
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="/assets/img/projects/sound_source_localization/grid_search.png" title="Grid Search" class="img-fluid rounded z-depth-1" %}
        <div class="caption">
            Grid search method for sound source localization.
        </div>
    </div>
</div>

## Challenges & Solutions
The denoising algorithm was computationally expensive for the Raspberry Pi. So, we needed to optimize the algorithm to run on the Raspberry Pi in real-time. Optimization process would involve using a smaller neural network, and using lower precision floating point numbers.
