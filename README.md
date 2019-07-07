# RNPlayground

An app to test out various things in react-native

## Installation

Install all the things

```bash
npm install
```

Install Pods
```bash
cd ios
pod install
```

## Run

```bash
react-native run-ios
react-native run-android
```

## Usage

###### Email Verification

Enter an email address then hit verify. It runs through a regular expression
to check if the email address is in a correct format.

###### File Stream

Built using [react-native-fs](https://github.com/itinance/react-native-fs)

Enter the text you want to save
Enter the name of the file to save the text to
(saved as a .txt file)

Hit write to create a new file or overwrite existing

Hit Delete to delete entered file

###### Camera

 Built using [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker)

 Simple image picker. Press Camera to open up promt to select image from camera or camera roll

 Then the image displays.

###### Masonry

Built using [react-native-masonry](https://github.com/brh55/react-native-masonry)
Displays random u=images genereated from Unsplash.

Currently has many duplicates

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)