/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView, Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

// import ModalDropdown from 'react-native-modal-dropdown';

import ModalDropdown from './ModalDropdown';
import App from "./MyDropdown";

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];
const DEMO_OPTIONS_2 = [
    {"name": "Rex", "age": 30},
    {"name": "Mary", "age": 25},
    {"name": "John", "age": 41},
    {"name": "Jim", "age": 22},
    {"name": "Susan", "age": 52},
    {"name": "Brent", "age": 33},
    {"name": "Alex", "age": 16},
    {"name": "Ian", "age": 20},
    {"name": "Phil", "age": 24},
];

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdown_4_options: null,
            dropdown_4_defaultValue: 'loading...',
            dropdown_6_icon_heart: true,
            isShow:false
        };
    }

    render() {
        const dropdown_6_icon = this.state.dropdown_6_icon_heart ? require('./images/heart.png') : require('./images/flower.png');
        const frameStyle = this._calcPosition();
        return (
            <View style={styles.container}>
                <View style={styles.row}>

                   {/* <View style={styles.cell}>
                        <ModalDropdown ref="dropdown_2"
                                       style={styles.dropdown_2}
                                       defaultIndex={6}
                                       defaultValue={'asd'}
                                       textStyle={styles.dropdown_2_text}
                                       dropdownStyle={styles.dropdown_2_dropdown}
                                       options={DEMO_OPTIONS_2}
                                       renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                                       renderRow={this._dropdown_2_renderRow.bind(this)}
                                       renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                        />
                    </View>*/}

                    <TouchableOpacity style={{width:200,marginTop:60,height:60,backgroundColor:'purple',marginLeft:60,justifyContent:'center'}}
                                      onPress={()=>{
                                          this.setState({
                                              isShow: true
                                          });

                                      }}
                               onChangeText={(text)=>{
                                   console.log(text);
                               }}
                    />

                    {this.state.isShow? <TouchableWithoutFeedback accessible={false}
                                                                  // disabled={!showDropdown}
                                                                  onPress={this._onModalPress}
                    >
                        <View style={{flexGrow: 1}}>
                            <View style={[{ position: 'absolute',
                                height: (33 + StyleSheet.hairlineWidth) * 5,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: 'lightgray',
                                borderRadius: 2,
                                backgroundColor: 'white',
                                justifyContent: 'center'}, { width: 150,
                                height: 300,
                                borderColor: 'cornflowerblue',
                                borderWidth: 2,
                                borderRadius: 3},
                                frameStyle]}>
                                {this._renderDropdown()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>:null}


                </View>


                        {/*<TouchableOpacity onPress={() => {*/}
                            {/*this.refs.dropdown_2.select(0);*/}
                        {/*}}>*/}
                            {/*<Text style={styles.textButton}>*/}
                                {/*select Rex*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
            </View>
        );
    }



    _calcPosition() {
        const {dropdownStyle, style, adjustFrame} = this.props;



        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;

        const dropdownHeight = (dropdownStyle && StyleSheet.flatten(dropdownStyle).height) ||
            StyleSheet.flatten(styles.dropdown).height;

        const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
        const rightSpace = windowWidth - this._buttonFrame.x;
        const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
        const showInLeft = rightSpace >= this._buttonFrame.x;

        const positionStyle = {
            height: dropdownHeight,
            top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
        };

        if (showInLeft) {
            positionStyle.left = this._buttonFrame.x;
        } else {
            const dropdownWidth = (dropdownStyle && StyleSheet.flatten(dropdownStyle).width) ||
                (style && StyleSheet.flatten(style).width) || -1;
            if (dropdownWidth !== -1) {
                positionStyle.width = dropdownWidth;
            }
            positionStyle.right = rightSpace - this._buttonFrame.w;
        }

        return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
    }





    _dropdown_2_renderButtonText(rowData) {
        const {name, age} = rowData;
        return `${name} - ${age}`;
    }

    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        let icon = highlighted ? require('./images/heart.png') : require('./images/flower.png');
        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[styles.dropdown_2_row, {backgroundColor: evenRow ? 'lemonchiffon' : 'white'}]}>
                    <Image style={styles.dropdown_2_image}
                           mode='stretch'
                           source={icon}
                    />
                    <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
                        {`${rowData.name} (${rowData.age})`}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == DEMO_OPTIONS_1.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
                      key={key}
        />);
    }

    _dropdown_3_adjustFrame(style) {
        console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`);
        style.top -= 15;
        style.left += 150;
        return style;
    }

    _dropdown_4_willShow() {
        setTimeout(() => this.setState({
            dropdown_4_options: DEMO_OPTIONS_1,
            dropdown_4_defaultValue: 'loaded',
        }), 2000);
    }

    _dropdown_4_willHide() {
        this.setState({
            dropdown_4_options: null,
            dropdown_4_defaultValue: 'loading',
        });
    }

    _dropdown_4_onSelect(idx, value) {
        // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
        //alert(`idx=${idx}, value='${value}'`);
        console.debug(`idx=${idx}, value='${value}'`);
    }

    _dropdown_5_show() {
        this._dropdown_5 && this._dropdown_5.show();
    }

    _dropdown_5_select(idx) {
        this._dropdown_5 && this._dropdown_5.select(idx);
    }

    _dropdown_5_willShow() {
        return false;
    }

    _dropdown_5_willHide() {
        let idx = this._dropdown_5_idx;
        this._dropdown_5_idx = undefined;
        return idx == 0;
    }

    _dropdown_5_onSelect(idx, value) {
        this._dropdown_5_idx = idx;
        if (this._dropdown_5_idx != 0) {
            return false;
        }
    }

    _dropdown_6_onSelect(idx, value) {
        this.setState({
            dropdown_6_icon_heart: !this.state.dropdown_6_icon_heart,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
    },


    cell: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        height: 500,
        paddingVertical: 100,
        paddingLeft: 20,
    },
    textButton: {
        color: 'deepskyblue',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'deepskyblue',
        margin: 2,
    },

    dropdown_1: {
        flex: 1,
        top: 32,
        left: 8,
    },

    dropdown_2: {
        marginTop:60,
        alignSelf: 'center',
        width: 200,
        height:60,
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'purple',
    },
    dropdown_2_text: {
        marginVertical: 18,
        marginHorizontal: 16,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_2_dropdown: {
        width: 200,
        height: 300,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
    dropdown_2_row: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    dropdown_2_image: {
        marginLeft: 4,
        width: 30,
        height: 30,
    },
    dropdown_2_row_text: {
        marginHorizontal: 4,
        fontSize: 16,
        color: 'navy',
        textAlignVertical: 'center',
    },
    dropdown_2_separator: {
        height: 1,
        backgroundColor: 'cornflowerblue',
    },
    dropdown_3: {
        width: 150,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 1,
    },
    dropdown_3_dropdownTextStyle: {
        backgroundColor: '#000',
        color: '#fff'
    },
    dropdown_3_dropdownTextHighlightStyle: {
        backgroundColor: '#fff',
        color: '#000'
    },
    dropdown_4: {
        margin: 8,
        width: 80,
        alignSelf: 'center',
        height: 40,
        borderColor: 'lightgray',
        borderWidth: 2,
        borderRadius: 10,
    },
    dropdown_4_dropdown: {
        width: 100,
    },
    dropdown_5: {
        margin: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 1,
    },
    dropdown_6: {
        flex: 1,
        left: 8,
    },
    dropdown_6_image: {
        width: 40,
        height: 40,
    },
});

AppRegistry.registerComponent('Demo', ()=>Demo);

