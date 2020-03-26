# ReactNativeAlgoliaPlaces

ReactNativeAlgoliaPlaces is a module for React Native that helps you to create an address autocompletion based on Algolia Places. This is an enhanced version of the enhanced version of the original react-native-algolia-places repo

## Installation
```
yarn add https://github.com/maxgfr/react-native-algolia-places.git
```

## Usage
### Basic
```js
import ReactNativeAlgoliaPlaces from 'react-native-algolia-places-extended'

render() {
    <ReactNativeAlgoliaPlaces appId={"appId"} appKey={"appKey"} />
}
```
### Render Object
```js
import ReactNativeAlgoliaPlaces from 'react-native-algolia-places-extended'

render() {
    <ReactNativeAlgoliaPlaces appId={"appId"} appKey={"appKey"}
      itemList={(item, i, textSearch) =>
           <Text key={i + "item"}>{item.locale_names[0]}</Text>
      }/>
}
```

## Properties
- **appId** The Places application ID to use
- **appKey** The Places search API key to use
- **onSearchError** When api request return an error
- **itemList(item, i, textSearch)** Custom render object for items in list (recommended)
  - **item** = Item retrieved based on text searched
  - **i** = Counter of items
  - **textSearch** = Text searched
- **options** (For detail see [Algolia Places Documentation](https://community.algolia.com/places/api-clients.html#search-parameters))
  - **language**
  - **countries**
  - **hitsPerPage**
  - **type**
  - **aroundLatLng**
  - **aroundLatLngViaIP**
  - **aroundRadius**
  - **insideBoundingBox**
  - **insidePolygon**
  - **getRankingInfo**
- **viewStyle** Container Style
- All react-native-search-box parameters, just append search before the prop name(eg. searchBeforeFocus), for more info visit [React Native Search Box](https://www.npmjs.com/package/react-native-search-box)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
