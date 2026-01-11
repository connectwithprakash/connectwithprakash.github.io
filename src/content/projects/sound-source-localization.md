---
id: sound-source-localization
title: Sound Source Localization
shortDescription: A 3D sound source localization system using an 8-microphone cubical mesh for locating disaster victims. Achieved 95% accuracy within 1.5m range using GCC-PHAT algorithm and CNN-based denoising.
category: robotics
importance: 1
featured: false
tags: [Python, C, Keras, Robotics, Signal Processing]
gradient: var(--gradient-tertiary)
thumbnail: /assets/img/projects/sound_source_localization/SSL.jpg
github: https://github.com/subash-timilsina/Sound-Source-Localization
demo: https://www.youtube.com/embed/Y1u37uJwSeI
relatedLinks:
  - title: Denoise Algorithm
    url: https://github.com/connectwithprakash/Speech-Denoising-using-CED
images:
  - path: /assets/img/projects/sound_source_localization/system.png
    caption: System diagram of the sound source localization system
  - path: /assets/img/projects/sound_source_localization/algorithm.png
    caption: Process flow diagram of the algorithm
  - path: /assets/img/projects/sound_source_localization/microphone_cube.png
    caption: Cubical microphone array
  - path: /assets/img/projects/sound_source_localization/grid_search.png
    caption: Grid search method for sound source localization
---

## Overview

We developed a 3D sound source localization system using an 8-microphone cubical mesh. The primary goal of this system was to accurately determine the azimuth (horizontal angle) and elevation (vertical angle) of an incoming sound source. The system uses a cubical microphone array to detect sound waves and a grid search method to determine the location of the sound source in 3D space. The system is mounted on an omnidirectional drive vehicle, which allows it to navigate to the location of the sound source.

The system was evaluated in a simulated disaster environment and was able to successfully locate the sound source. The system is a promising new technology that could be used to help rescue victims of disasters.

The system is also capable of using the deep learning based denoise algorithm to remove background noise and improve the accuracy of the sound source localization.

## Methodology

**1. Hardware Setup**: We created a cubical mesh configuration with eight microphones, ensuring that the microphones were evenly distributed for optimal coverage.

**2. Sound Localization Algorithm**: We implemented the GCC-PHAT (Generalized Cross-Correlation with Phase Transform) algorithm. This algorithm is widely used for sound source localization and is known for its accuracy in determining the time delay of arrival (TDOA) between microphone pairs.

**3. Data Acquisition**: The system recorded sound data from the eight microphones. By analyzing the TDOAs between microphone pairs, we calculated the azimuth and elevation angles of the sound source.

**4. Signal Denoising**: To improve the accuracy of the localization system, we integrated a Convolutional Neural Network (CNN) for speech denoising. This CNN was trained to remove noise from the recorded audio signals.

**5. Result**: After extensive testing and training, the system reached an impressive 95% accuracy in 3D localization within a range of 1.5 meters. This level of accuracy was achieved through the combination of the precise GCC-PHAT algorithm and the denoising capabilities of the CNN.

**6. Conclusion**: This project is a significant achievement as it demonstrates the successful integration of signal processing techniques, machine learning, and hardware design to create a 3D sound source localization system with high accuracy. It has various potential applications in fields such as robotics, audio surveillance, and augmented reality.

## Key Features

- Sound source localization in 3D space
- Deep learning based denoise algorithm
- Omnidirectional drive vehicle integration
- 95% accuracy within 1.5m range
- GCC-PHAT algorithm implementation
- Real-time audio processing

## Technologies

**Hardware:** Raspberry Pi, AVR, Microphone Array, Omnidirectional Drive Vehicle

**Languages:** Python, C

**Frameworks:** Keras

**Algorithms:** GCC-PHAT, CNN for Denoising

## Challenges & Solutions

The denoising algorithm was computationally expensive for the Raspberry Pi. So, we needed to optimize the algorithm to run on the Raspberry Pi in real-time. Optimization process would involve using a smaller neural network, and using lower precision floating point numbers.
