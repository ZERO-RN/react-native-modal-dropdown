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
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Modal,
    TouchableWithoutFeedback, Dimensions
} from 'react-native';

// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from './Drop';

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

        // this._button = null;
        // this._buttonFrame = null;
        this._nextValue = null;
        this._nextIndex = null;

        this.frameStyle = null

        this.state = {
            isShow: false,
            _buttonFrame: null

        };
    }

    componentDidMount() {

    }

    _updatePosition(callback) {
        this._button.measure((fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
        });
        if (this._button && this._button.measure) {

            this._button.measure((fx, fy, width, height, px, py) => {
                this._buttonFrame = {x: px, y: py, w: width, h: height};
                callback();
            });
        }
    }

    show() {
        this._updatePosition(() => {
            this.setState({
                isShow: true
            });
        });
    }

    // show() {
    //
    //     // console.log(this.refs._button.measure());
    //     this._button.measure((fx, fy, width, height, px, py) => {
    //         console.log('Component width is: ' + width)
    //         console.log('Component height is: ' + height)
    //         console.log('X offset to frame: ' + fx)
    //         console.log('Y offset to frame: ' + fy)
    //         console.log('X offset to page: ' + px)
    //         console.log('Y offset to page: ' + py)
    //     });
    //     this._button.measure((fx, fy, width, height, px, py) => {
    //         this._buttonFrame = {x: px, y: py, w: width, h: height};
    //         // callback && callback();
    //     });
    //     // this.frameStyle = this._calcPosition();
    //     this.setState({
    //         isShow: true
    //     });
    //
    // }

    hide() {
        this.setState({
            isShow: false
        });
    }


    _calcPosition() {
        //
        // this.refs._button.measure((fx, fy, width, height, px, py) => {
        //     this._buttonFrame = {x: px, y: py, w: width, h: height};
        // });


        const {dropdownStyle} = styles.dropdownStyle
        const {style} = styles.style
        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;

        const dropdownHeight = 300;


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
            const dropdownWidth = 300;
            if (dropdownWidth !== -1) {
                positionStyle.width = dropdownWidth;
            }
            positionStyle.right = rightSpace - this._buttonFrame.w;
        }
            positionStyle.width = 300;

        return positionStyle;
    }

    render() {

        return (<View style={{flex: 1}}>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={{
                            marginLeft: 60,
                            marginTop: 400,
                            width: 200,
                            height: 60,
                            backgroundColor: 'blue'
                        }}

                        ref={button => this._button = button}
                        disabled={false}
                        accessible={false}
                        onPress={() => {
                            this.show();

                            // this.setState({
                            //     isShow: true
                            // })
                        }}
                    >

                        <View style={{justifyContent: 'center'}}>
                            <Text style={{
                                marginVertical: 18,
                                marginHorizontal: 16,
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'center',
                                textAlignVertical: 'center'
                            }}
                            >
                                556231
                            </Text>
                        </View>

                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.5}
                                      style={{width: 300, height: 80, backgroundColor: 'red'}}
                                      onPress={() => {
                                          this._button.measure((fx, fy, width, height, px, py) => {
                                              console.log('Component width is: ' + width)
                                              console.log('Component height is: ' + height)
                                              console.log('X offset to frame: ' + fx)
                                              console.log('Y offset to frame: ' + fy)
                                              console.log('X offset to page: ' + px)
                                              console.log('Y offset to page: ' + py)
                                          });
                                      }}>

                    </TouchableOpacity>*/}

                    {this._renderModal()}

                </View>

            </View>
        );
    }

    _onRequestClose = () => {
        const {onDropdownWillHide} = this.props;
        if (!onDropdownWillHide ||
            onDropdownWillHide() !== false) {
            this.hide();
        }
    };

    _renderModal() {
        // const  dropdownStyle = styles.dropdown_2_dropdown
        if (this._buttonFrame) {
            const frameStyle = this._calcPosition();
            // const animationType = animated ? 'fade' : 'none';
            console.log(frameStyle);

            return (
                <View style={[frameStyle, {
                    width: 200,
                    backgroundColor: 'red',
                    position: 'absolute'
                }]}/>

            );
            {/*<Modal*/
            }
            {/*visible={true}*/
            }
            {/*transparent={true}*/
            }
            {/*onRequestClose={this._onRequestClose}*/
            }
            {/*supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}*/
            }
            {/*>*/
            }
            {/*<TouchableWithoutFeedback accessible={false}*/
            }
            {/*disabled={!this.state.isShow}*/
            }
            {/*onPress={this._onModalPress}*/
            }
            {/*>*/
            }
            {/*<View style={styles.modal}>*/
            }
            {/*<View style={[styles.dropdown, styles.dropdownStyle, frameStyle]}>*/
            }
            {/*/!*{this._renderDropdown()}*!/*/
            }
            {/*</View>*/
            }
            {/*</View>*/
            }
            {/*</TouchableWithoutFeedback>*/
            }
            {/*</Modal>*/
            }
        }
    }
}


/*
<View ref="mycomponent"
      style={{width:200,height:300,marginTop:100,marginLeft:50,backgroundColor:'blue'}}>
    <Text style={{fontSize:20,color:'white',width:80,height:60,backgroundColor:'yellow'}}>nihao</Text>
</View>

<TouchableOpacity activeOpacity={0.5}
style={{width:300,height:80,backgroundColor:'red'}}
onPress={()=>{
    this.refs.mycomponent.measure( (fx, fy, width, height, px, py) => {
        console.log('Component width is: ' + width)
        console.log('Component height is: ' + height)
        console.log('X offset to frame: ' + fx)
        console.log('Y offset to frame: ' + fy)
        console.log('X offset to page: ' + px)
        console.log('Y offset to page: ' + py)
    })
}}>

</TouchableOpacity>*/
const styles = StyleSheet.create({

    dropdown: {
        position: 'absolute',
        height: (33 + StyleSheet.hairlineWidth) * 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgray',
        borderRadius: 2,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        width: 300,
        height: 600

    },
    row: {
        flex: 1,
        flexDirection: 'row',
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
    style: {
        alignSelf: 'flex-end',
        width: 150,
        marginTop: 32,
        right: 8,
        borderWidth: 0,
        borderRadius: 18,
        backgroundColor: 'cornflowerblue',
    },
    dropdown_2_text: {
        marginVertical: 18,
        marginHorizontal: 16,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    dropdownStyle: {
        width: 150,
        height: 500,
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

});

AppRegistry.registerComponent('Demo', () => Demo);

