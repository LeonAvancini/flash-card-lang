# Flash Card Lang

Flash Card Lang is a minimal viable product (MVP) created using React Native (Expo). It allows users to practice vocabulary by adding their own source and values.

## Installation

To install dependencies, run the following command:

```
npm install
```

## Usage

To run the app, execute the following command and follow the Expo instructions:

```
npx expo start
```

## Features

- Add your own source and values to practice vocabulary.
- **Bulk Import**: Users can paste a file in JSON format to quickly add multiple values. Note: This action will delete old data saved.
  Example JSON format:
  ```json
  [
      {
        "source": "Der Apfel",
        "value": "The apple"
      },
      {
        "source": "Die Katze",
        "value": "The cat"
      },
      ...
  ]
  ```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

Flash Card Lang is licensed under the MIT License.
