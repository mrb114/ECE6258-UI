# ECE6258-UI

## Installation 

This application runs from your browser (Chrome is recommended). The application utilizes a back end as described here: 
https://github.com/mrb114/ECE6258. The application will not function properly without the back end running simultaneously. Prior to attempting to use this application please follow the instructions to install and run the back end. 

Once the back end is running, you are ready to use this applicaton. 

## Usage

To run this application, simply open the index.html file from this repository in your browser. Chrome is the suggested browser to run this application. 

## Instructions 

### Uploading Images
1. Begin by selecting "Upload" from the upper right hand corner of the page. This button will open a prompt to allow you to select an image from your file system. Please see the back end specifications on what makes an "ideal" input. Sample inputs may be found in the backend repository under the Images/ folder.
2. Once you select an image, it will be uploaded and processed by the back end. You will see the loading screen during this phase. Processing may take some time if you uploaded a large image. If you are unsure if the time it's taking to process your image, you may see if any errors have come up in the back end terminal, however it is likely that it is just normal processing time. 
3. After the inital upload, you may upload up to 3 more images to be candidates for face swapping. Once you have uploaded your desired images, you may move on to the processing phase 

### Processing Images

1. Select a background image by clicking the "Select Background" button under any of your uploaded images. Selecting an image will move that image to the main photo space at the top of the page. You can always start the processing phase over by selecting a different background image so it is not an issue to select different background images in search of the "right" one. To demonstrate the functionality of the application, you should select an image that has a "non-ideal" feature such as someone who has their eyes closed or who isn't smiling. This image will serve as your base moving forward; Any faces that you replace will be placed in this background image.
2. After selecting the background image, the faces available to be replaced will be outlined in yellow boxes. To see candidates for face replacement from other images you have uploaded, select one of these faces by clicking the yellow box. 
3. Replacement options will display in the grid below the main image. Any of these photos may be selected to replace the one in the main image. Simply click "Select Face" below the face you would like to choose, the face will be swapped out, and the resulting image will replace the image shown in the main photo space. 
4. This process may be repeated as many times as you like. You may click on a different face in the image for replacement of additional faces or you may restart processing by selecting a different background image. If at any point you would like to restart the Upload phase, just refresh the page. When you are satisfied with your modified image, move on to the Export phase

### Exporting Images

1. Export your face swapped image by clicking on the "Export" button in the upper right hand corner of the page. 
2. Your resulting image will be downloaded and you may open it on your computer in the image viewing application of your choice
3. As described in the image processing step 4, if at any point you would like to start over with a new set of images, just refresh the page or if you would like to restart with a "clean" background image, just select a new background as described in image processing step 1.

## Reproducing Results 

The results demonstrated in the project paper were created using Images that can be found in the Back-end/Images folder. Each image set is in an individual folder. Within each folder there are 2 or more photos that can be uploaded in sequence in the application to reproduce results. Additional images used for testing the application are also provided to allow for additional experimentation with the application. 
