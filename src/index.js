import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import algoliasearch from 'algoliasearch/reactnative';
import Search from 'react-native-search-box';

export default class ReactNativeAlgoliaPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {textSearch: "", search: null};

        this.searchResults = this.searchResults.bind(this);

        this.places = algoliasearch.initPlaces(this.props.appId, this.props.appKey);

        this.searchResults(this.state.textSearch);
        
    }

    searchResults(text) {
          // Create an empty options object to fill
        var finalOptions = {};

        // If user set options we use them
        if (this.props.options) {
            finalOptions = this.props.options;
        }

        // Add query item to options
        finalOptions.query = text

        this.places
            .search(finalOptions).then(res => {
                this.setState({search: res, textSearch: text});
            }).catch(err => {
                this.onSearchError(err);
            });
    }

    async onSearchError (err) {
        if (this.props.onSearchError) {
            await this.props.onSearchError(err);
        }
    }

    render() {
        return(
            <View style={this.props.viewStyle ? this.props.viewStyle : styles.containerStyle}>
            <Search
            /**
             * onFocus
             * return a Promise
             * beforeFocus, onFocus, afterFocus
             */
            beforeFocus={ this.props.searchBeforeFocus ? this.props.searchBeforeFocus : null }
            onFocus={this.props.searchOnFocus ? this.props.searchOnFocus : null}
            afterFocus={this.props.searchAfterFocus ? this.props.searchAfterFocus : null}
            /**
             * onSearch
             * return a Promise
             * NOTE: As of RN V0.48.3 the blurOnSubmit property must be set to {true} for this to trigger
             */
            beforeSearch={this.props.searchBeforeSearc ? this.props.searchBeforeFocus : null}
            onSearch={this.props.searchOnSearch? this.props.searchOnSearch : null}
            afterSearch={this.props.searchAfterSearch ? this.props.searchAfterSearch : null}
            /**
             * onChangeText
             * return a Promise
             */
            onChangeText={this.props.searchOnChangeText ? this.props.searchOnChangeText : this.searchResults}
            /**
             * onCancel
             * return a Promise
             */
            beforeCancel={this.props.searchBeforeCancel ? this.props.searchBeforeCancel : null}
            onCancel={this.props.searchOnCancel ? this.props.searchOnCancel : null}
            afterCancel={this.props.searchAfterCancel ? this.props.searchAfterCancel : null}
            /**
             * async await
             * return a Promise
             * beforeDelete, onDelete, afterDelete
             */
            beforeDelete={this.props.searchBeforeDelete ? this.props.searchBeforeDelete : null}
            onDelete={this.props.searchOnDelete ? this.props.searchOnDelete : null}
            afterDelete={this.props.searchAfterDelete ? this.props.searchAfterDelete : null}

            /**
             * styles
             */
            backgroundColor={this.props.searchBackgroundColor ? this.props.searchBackgroundColor : null}
            placeholderTextColor={this.props.searchPlaceholderTextColor ? this.props.searchPlaceholderTextColor : null}
            titleCancelColor={this.props.searchTitleCancelColor ? this.props.searchTitleCancelColor : null}
            tintColorSearch={this.props.searchTintColorSearch? this.props.searchTintColorSearch : null}
            tintColorDelete={this.props.searchTintColorDelete ? this.props.searchTintColorDelete : null}
            cancelButtonWidth={this.props.searchCancelButtonWidth ? this.props.searchCancelButtonWidth : null}
            cancelButtonStyle={this.props.searchCancelButtonStyle ? this.props.searchCancelButtonStyle : null}
            cancelButtonTextStyle={this.props.searcCancelButtonTextStyle ? this.props.searchCancelButtonTextStyle : null}
            onLayout={this.props.searchOnLayout ? this.props.searchOnLayout : null}
            inputStyle={this.props.searchInputStyle ? this.props.searchInputStyle : null}
            /**
             * text input
             */
            defaultValue={this.props.searchDefaultValue ? this.props.searchDefaultValue : this.state.textSearch}
            placeholder={this.props.searchPlaceholder ? this.props.searchPlaceholder : null}
            cancelTitle={this.props.searchCancelTitle ? this.props.searchCancelTitle : null}
            iconDelete={this.props.searchIconDelete ? this.props.searchIconDelete : null}
            iconSearch={this.props.searchIconSearch ? this.props.searchIconSearch : null}
            returnKeyType={this.props.searchReturnKeyType ? this.props.searchReturnKeyType : null}
            keyboardType={this.props.searchKeyboardType ? this.props.searchKeyboardType : null}
            autoCapitalize={this.props.searchAutoCapitalize ? this.props.searchAutoCapitalize : null}
            inputHeight={this.props.searchInputHeight ? this.props.searchInputHeight : null}
            inputBorderRadius={this.props.searchInputBorderRadius ? this.props.searchInputBorderRadius : null}
            contentWidth={this.props.searchContentWidth ? this.props.searchContentWidth : null}
            middleWidth={this.props.searchMiddleWidth ? this.props.searchMiddleWidth : null}
            blurOnSubmit={this.props.searchBlurOnSubmit ? this.props.searchBlurOnSubmit : null}
            keyboardDismissOnSubmit={this.props.searchKeyboardDismissOnSubmit ? this.props.searchKeyboardDismissOnSubmit : null}
            /**
             * Positioning
             */
            positionRightDelete={this.props.searchPositionRightDelete ? this.props.searchPositionRightDelete : null}
            searchIconCollapsedMargin={this.props.searchSearchIconCollapsedMargin ? this.props.searchSearchIconCollapsedMargin : null}
            searchIconExpandedMargin={this.props.searchSearchIconExpandedMargin ? this.props.searchSearchIconExpandedMargin : null}
            placeholderCollapsedMargin={this.props.searchPlaceholderCollapsedMargin ? this.props.searchPlaceholderCollapsedMargin : null}
            placeholderExpandedMargin={this.props.searchPlaceholderExpandedMargin ? this.props.searchPlaceholderExpandedMargin : null}
            />
            {
                this.state.search && this.state.search.hits.map((item, i) =>
                    this.props.itemList(item, i, this.state.textSearch)
                )
            }
            </View>
        );
    }
}

ReactNativeAlgoliaPlaces.defaultProps = {
    itemList: (item, i, textSearch) => {
        return (
            <View
                key={i + "search_result"}
                style={styles.rowStyle}>
                    <Text style={styles.locationStyle}>{(item.locale_names instanceof Array) ? item.locale_names[0] : item.locale_names.default[0]}</Text>
                    <Text style={styles.cityStyle}>{ "  -  " + (item.city != undefined ? item.city[0] + ", " : "") + (item.administrative != undefined ? item.administrative[0] + ", " : "") + (typeof item.country === "string" ? item.country : item.country.default) }</Text>
            </View>
        );
    }
}

ReactNativeAlgoliaPlaces.propTypes = {
    appId: PropTypes.string,
    appKey: PropTypes.string,
    options: PropTypes.object,


    onSearchError: PropTypes.func,
    itemList: PropTypes.func
}

const styles = {
    containerStyle: {
        padding: 2
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: 'azure',
        borderBottomWidth: 2
    },
    locationStyle: {
        fontSize: 20
    },
    cityStyle: {
        fontSize: 16
    }
};